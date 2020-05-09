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
    const [companyDescription, setCompanyDescription] = useState(props.user?.companyDescription);

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
                <Form.Item name="dragger" valuePropName="fileList" noStyle>
                    <AvatarUpload avatarUrl={props.user?.avatar} afterUpload={props.refreshCurrentUser} />
                </Form.Item>
            </Form.Item>
            <Form.Item label="Company Description">
                <HtmlEditor value={companyDescription} onChange={setCompanyDescription} />
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
