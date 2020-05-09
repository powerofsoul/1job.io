import { Button, Form, Input, Spin, Divider } from "antd"
import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { IAppState } from "../../../redux/configureStore"
import CurrentUserStore from "../../../redux/stores/CurrentUserStore"
import { ValidateMessage } from "../../../Utils"
import { ProfileTabProps } from "../profile"
import ArrayFormItem from "./fields/ArrayFormItem"
import WorkExperienceField from "./fields/WorkExperienceField"
import { normalizeEmployee } from "../../../redux/stores/EmployeeUtils"
import { Employee } from "../../../../models/Employee"
import EducationField from "./fields/EducationField"
import ProjectField from "./fields/ProjectField"

// phone: String,
//      
//     education: [],
//     projects: []

const EmployeeProfileTab = (props: ProfileTabProps) => {
    const noLabelWrapperCol = {
        ...props.layout,
        sm: {
            ...props.layout.sm,
            offset: 6
        }
    }

    return <Spin spinning={props.loading}>
        <Form initialValues={normalizeEmployee(props.user as Employee)} {...props.layout} name="nest-messages" onFinish={props.onFinish} validateMessages={ValidateMessage}>
            <Form.Item name={'firstName'} label="First Name" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name={'lastName'} label="Last Name" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name={'phone'} label="Phone">
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
