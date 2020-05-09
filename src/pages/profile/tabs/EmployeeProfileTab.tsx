import { Button, Form, Input, Spin } from "antd"
import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { IAppState } from "../../../redux/configureStore"
import CurrentUserStore from "../../../redux/stores/CurrentUserStore"
import { ValidateMessage } from "../../../Utils"
import { ProfileTabProps } from "../profile"
import ArrayFormItem from "./ArrayFormItem"
import WorkExperienceField from "./fields/WorkExperienceField"
import { normalizeEmployee } from "../../../redux/stores/EmployeeUtils"
import { Employee } from "../../../../models/Employee"
import EducationField from "./fields/EducationField"

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
            <ArrayFormItem name="workExperience"
                addButtonText="Add work experience"
                label="Work Experience"
                emptyFieldError="Please input a skill name or delete this field."
                wrapperCol={{ ...props.layout.wrapperCol }}
                noLabelWrapperCol={noLabelWrapperCol}
                field={WorkExperienceField} />
            <ArrayFormItem name="skills"
                addButtonText="Add skill"
                label="Skills"
                placeholder="I am goot at..."
                emptyFieldError="Please input a skill name or delete this field."
                wrapperCol={{ ...props.layout.wrapperCol }}
                noLabelWrapperCol={noLabelWrapperCol} />
            <ArrayFormItem name="interests"
                addButtonText="Add interest"
                label="Interests"
                placeholder="I love cooking..."
                emptyFieldError="Please input an interest or delete this field."
                wrapperCol={{ ...props.layout.wrapperCol }}
                noLabelWrapperCol={noLabelWrapperCol} />
            <ArrayFormItem name="languages"
                addButtonText="Add language"
                label="Language"
                placeholder="English..."
                emptyFieldError="Please input a language or delete this field."
                wrapperCol={{ ...props.layout.wrapperCol }}
                noLabelWrapperCol={noLabelWrapperCol} />
            <ArrayFormItem name="education"
                addButtonText="Add education"
                label="Education"
                emptyFieldError="Please complete or delete this field."
                wrapperCol={{ ...props.layout.wrapperCol }}
                noLabelWrapperCol={noLabelWrapperCol} 
                field={EducationField} />
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
