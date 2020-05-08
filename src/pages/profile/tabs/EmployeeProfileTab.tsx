import { Button, Form, Input, Spin } from "antd"
import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { IAppState } from "../../../redux/configureStore"
import CurrentUserStore from "../../../redux/stores/CurrentUserStore"
import { ValidateMessage } from "../../../Utils"
import { ProfileTabProps } from "../profile"

const EmployeeProfileTab = (props: ProfileTabProps) => {
    return <Spin spinning={props.loading}>
        <Form initialValues={props.user} {...props.layout} name="nest-messages" onFinish={props.onFinish} validateMessages={ValidateMessage}>
            <Form.Item name={'firstName'} label="First Name" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name={'lastName'} label="Last Name" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ ...props.layout.wrapperCol, offset: 6 }}>
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
