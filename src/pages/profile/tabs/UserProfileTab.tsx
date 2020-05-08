import React, { useState } from "react"
import { Button, Spin, Form, Input, InputNumber } from "antd"
import { UpdateUserResponse } from "../../../../server/services/UserService"
import { post, ValidateMessage } from "../../../Utils"
import { toast } from "react-toastify"
import { User } from "../../../../models/User"
import { Link } from "react-router-dom";
import AvatarUpload from "../../../common/AvatarUpload"
import { FormInstance } from "antd/lib/form"
import { connect } from "react-redux"
import CurrentUserStore from "../../../redux/stores/CurrentUserStore"
import { bindActionCreators } from "redux"
import { IAppState } from "../../../redux/configureStore"
import FormItem from "antd/lib/form/FormItem"

interface Props {
    loading: boolean;
    form: FormInstance;
    layout: any;
    setLoading: (value: boolean) => void;

    user: User;
    setCurrentUser: (user) => void;
    refreshCurrentUser: () => void;
}

const UserProfileTab = (props: Props) => {
    const [email, setEmail] = useState("");
    
    const changeEmail = async () => {
        props.setLoading(true);
        
        const response: UpdateUserResponse = await post("/user/update", {
            user: {
                email
            }
        });

        if (response.success) {
            toast("Email confirmation send. Please Check!", {
                type: "success"
            });

            props.setCurrentUser(response.user);
        } else {
            toast("Something went wrong. Please try again later!", {
                type: "error"
            })
        }

        props.setLoading(false);
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

const mapStateToProps = (store: IAppState, ownProps): Partial<Props> => ({
    user: store.currentUserStore.user,
    ...ownProps
})

export default connect(
    mapStateToProps,
    (dispatch) => bindActionCreators(CurrentUserStore.actionCreators, dispatch)
)(UserProfileTab);
