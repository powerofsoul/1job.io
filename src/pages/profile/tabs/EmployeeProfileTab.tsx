import { Button, Form, Input, Spin, Divider, Upload } from "antd"
import React, { useRef, useState } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { IAppState } from "../../../redux/configureStore"
import CurrentUserStore from "../../../redux/stores/CurrentUserStore"
import { ValidateMessage, apiUrl, put, uploadFile } from "../../../Utils"
import { ProfileTabProps } from "../profile"
import ArrayFormItem from "./fields/ArrayFormItem"
import WorkExperienceField from "./fields/WorkExperienceField"
import { normalizeEmployee } from "../../../redux/stores/EmployeeUtils"
import { Employee } from "../../../../models/Employee"
import EducationField from "./fields/EducationField"
import ProjectField from "./fields/ProjectField"
import { useForm } from "antd/lib/form/util"
import { UploadOutlined } from "@ant-design/icons"
import { toast } from "react-toastify"
import { ApiResponse } from "../../../../models/ApiResponse"
import PdfPreview from "../../../common/PdfPreview"
import Space from "../../../style/Space"

const EmployeeProfileTab = (props: ProfileTabProps) => {
    const [form] = useForm();
    const noLabelWrapperCol = {
        ...props.layout,
        sm: {
            ...props.layout.sm,
            offset: 6
        }
    }

    React.useEffect(() => {
        form.resetFields()
    }, [props.user])

    const [resumee, setResumee] = useState((props.user as Employee)?.resumee);
    const fileRef = useRef<HTMLInputElement>();

    const onResumeeUpload = (event) => {
        const file = event.target.files[0] as File;
        if (file.type != "application/pdf") {
            toast("Please upload a pdf file", {
                type: "error"
            });

            return;
        }
        const isLt10M = file.size / 1024 / 1024 < 10;
        if (!isLt10M) {
            toast("Resumee must be smaller than 10MB", {
                type: "error"
            });

            return;
        }

        props.setLoading(true);
        uploadFile("resumee", file, "/user/uploadResumee").then((response: ApiResponse & { url: string }) => {
            if (response.success) {
                props.refreshCurrentUser();
                setResumee(response.url);
            } else {
                toast(response.message || "Something went wrong", {
                    type: "error"
                })
            }
        }).catch(() => {
            toast("Something went wrong.", {
                type: "error"
            })
        }).finally(() => {
            props.setLoading(false);
        })
    }


    return <Spin spinning={props.loading}>
        <Divider>File Resumee</Divider>
        <div style={{textAlign:"center",}}>
            {resumee && <div>
                <PdfPreview url={resumee}/>
            </div>}

            <Button style={{marginTop: Space.sm}} onClick={() => {
                fileRef.current.value = null;
                fileRef.current?.click()
            }}>
                <UploadOutlined /> Click to Upload Resumee
            </Button>
            <input ref={fileRef} type="file" style={{ display: "none" }} onChange={onResumeeUpload} />
        </div>

        <Divider>Resumee</Divider>
        <Form form={form} initialValues={normalizeEmployee(props.user as Employee)} {...props.layout} name="nest-messages" onFinish={props.onFinish} validateMessages={ValidateMessage}>
            <Form.Item name={'firstName'} label="First Name" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name={'lastName'} label="Last Name" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name={'title'} label="Title" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name={'phone'} label="Phone">
                <Input />
            </Form.Item>
            <Form.Item name={'location'} label="Location">
                <Input />
            </Form.Item>
            <Form.Item name={'motto'} label="Motto">
                <Input placeholder="Eg: There’s magic on the other side of fear." />
            </Form.Item>
            <Divider>Work Experience</Divider>
            <ArrayFormItem name="workExperience"
                addButtonText="Add work experience"
                emptyFieldError="Please input a skill name or delete this field."
                wrapperCol={{ ...props.layout.wrapperCol }}
                noLabelWrapperCol={noLabelWrapperCol}
                field={WorkExperienceField} />
            <Divider>Education</Divider>
            <ArrayFormItem name="education"
                addButtonText="Add education"
                emptyFieldError="Please complete or delete this field."
                wrapperCol={{ ...props.layout.wrapperCol }}
                noLabelWrapperCol={noLabelWrapperCol}
                field={EducationField} />
            <Divider>Skills</Divider>
            <ArrayFormItem name="skills"
                addButtonText="Add skill"
                placeholder="I am goot at..."
                emptyFieldError="Please input a skill name or delete this field."
                wrapperCol={{ ...props.layout.wrapperCol }}
                noLabelWrapperCol={noLabelWrapperCol} />
            <Divider>Interests</Divider>
            <ArrayFormItem name="interests"
                addButtonText="Add interest"
                placeholder="I love cooking..."
                emptyFieldError="Please input an interest or delete this field."
                wrapperCol={{ ...props.layout.wrapperCol }}
                noLabelWrapperCol={noLabelWrapperCol} />
            <Divider>Languages</Divider>
            <ArrayFormItem name="languages"
                addButtonText="Add language"
                placeholder="English..."
                emptyFieldError="Please input a language or delete this field."
                wrapperCol={{ ...props.layout.wrapperCol }}
                noLabelWrapperCol={noLabelWrapperCol} />
            <Divider>Projects</Divider>
            <ArrayFormItem name="projects"
                field={ProjectField}
                addButtonText="Add project"
                wrapperCol={{ ...props.layout.wrapperCol }}
                noLabelWrapperCol={noLabelWrapperCol} />
            <Form.Item wrapperCol={noLabelWrapperCol}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    </Spin>
}

const mapStateToProps = (store: IAppState, ownProps): Partial<ProfileTabProps> => ({
    user: store.currentUserStore.user,
    ...ownProps
})

export default connect(
    mapStateToProps,
    (dispatch) => bindActionCreators(CurrentUserStore.actionCreators, dispatch)
)(EmployeeProfileTab);
