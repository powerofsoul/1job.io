import { Button, Form, Input, InputNumber, Spin } from "antd"
import React, { useState } from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import AvatarUpload from "../../../common/AvatarUpload"
import HtmlEditor from "../../../common/HtmlEditor"
import { IAppState } from "../../../redux/configureStore"
import CurrentUserStore from "../../../redux/stores/CurrentUserStore"
import { ValidateMessage } from "../../../Utils"
import { ProfileTabProps } from "../profile"
import { Employer } from "../../../../models/Employer"

const EmployerProfileTab = (props: ProfileTabProps & {user?: Employer}) => {
    return <Spin spinning={props.loading}>
        <Form initialValues={props.user} {...props.layout} name="nest-messages" onFinish={props.onFinish} validateMessages={ValidateMessage}>
            <Form.Item name={'companyName'} label="Company Name" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name={'companySize'} label="Company Size" rules={[{ type: 'number', min: 1, max: 9999 }]}>
                <InputNumber />
            </Form.Item>
            <Form.Item name={'companyWebsite'} label="Website" rules={[{ type: "url" }]}>
                <Input />
            </Form.Item>
            <Form.Item name={'avatar'} label="Logo">
                <AvatarUpload />
            </Form.Item>
            <Form.Item  name={'companyDescription'} label="Company Description">
                <HtmlEditor />
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
)(EmployerProfileTab);
