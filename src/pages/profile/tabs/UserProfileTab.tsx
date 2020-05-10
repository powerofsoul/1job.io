import { Button, Form, Input, Spin } from "antd"
import React, { useState } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { bindActionCreators } from "redux"
import { UpdateUserResponse } from "../../../../server/services/UserService"
import { IAppState } from "../../../redux/configureStore"
import CurrentUserStore from "../../../redux/stores/CurrentUserStore"
import { post, ValidateMessage } from "../../../Utils"
import { ProfileTabProps } from "../profile"

const UserProfileTab = (props: ProfileTabProps) => {
    const [email, setEmail] = useState("");

    const changeEmail = () => {
        props.onFinish({
            email
        })
    }

    const cancelMailChange = async () => {
        props.setLoading(true);
        const response: UpdateUserResponse = await post("/user/cancelMailChange");

        if (response.success) {
            props.setCurrentUser(response.user);
        } else {
            toast(response.message, {
                type: "error"
            });
        }

        props.setLoading(false);
    }

    return <Spin spinning={props.loading}>
        <Form form={props.form} initialValues={props.user} {...props.layout} name="nest-messages" validateMessages={ValidateMessage}>
            <Form.Item name={'email'}
                label="Email"
                rules={[{ type: 'email', required: true }]}
                help={props.user?.newEmail?.trim() != "" &&
                    <div style={{ marginTop: "10px" }}>
                        A request has been made to change your email to {props.user?.newEmail}
                        &nbsp;<Button size="small" danger={true} onClick={cancelMailChange}>Cancel</Button>
                    </div>}
            >
                <Input onChange={(e) => setEmail(e.target.value)}/>
            </Form.Item>
            <Form.Item wrapperCol={{ ...props.layout.wrapperCol, offset: 6 }}>
                <Button type="primary" onClick={changeEmail}>Change</Button>
            </Form.Item>
            <Form.Item label="Password">
                <Link to="/change-password">Change</Link>
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
)(UserProfileTab);
