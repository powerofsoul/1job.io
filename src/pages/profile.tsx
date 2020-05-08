import { Button, Form, Input, InputNumber, Skeleton, Tag, Spin } from "antd";
import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { bindActionCreators } from "redux";
import styled from "styled-components";
import { User } from "../../models/User";
import AvatarUpload from "../common/AvatarUpload";
import HtmlEditor from "../common/HtmlEditor";
import { IAppState } from "../redux/configureStore";
import CurrentUserStore from "../redux/stores/CurrentUserStore";
import { post } from "../Utils";
import { useForm } from "antd/lib/form/util";
import { ApiResponse } from "../../models/ApiResponse";
import { UpdateUserResponse } from "../../server/services/UserService";
import { Employer } from "../../models/Employer";

interface Props {
    user: Employer;
    loading: boolean;
    refreshCurrentUser?: () => void;
    setCurrentUser: (user: User) => void;
}

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
};

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not valid email!',
        number: '${label} is not a valid number!',
        url: '${label} is not a valid url'
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    }
}

const ProfileContainer = styled.div`
    margin-top: 2rem;

    .html-editor {
        .ql-editor {
            min-height: 200px;
        }
    }
`;

const Profile = (props: Props) => {
    const [companyDescription, setCompanyDescription] = useState(props.user?.companyDescription);
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [form] = useForm();

    const onFinish = async (values) => {
        setLoading(true);
        
        const response: UpdateUserResponse = await post("/user/update", {
            user: {
                ...values,
                companyDescription
            }
        });

        if (response.success) {
            toast("Profile saved!", {
                type: "success"
            });

            props.setCurrentUser(response.user);
        } else {
            toast("Something went wrong. Please try again later!", {
                type: "error"
            })
        }
        setLoading(false);
    }

    const cancelMailChange = async () => {
        setLoading(true);
        const response: UpdateUserResponse = await post("/user/cancelMailChange");

        if(response.success) {
            props.setCurrentUser(response.user);
        } else {
            toast(response.message, {
                type:"error"
            });
        }

        setLoading(false);
    }

    React.useEffect(() => {
        if (!props.loading && !props.user) {
            history.push("/login");
        }

        if(!loading){
            form.resetFields();
        }
    });

    return <Spin spinning={props.loading || loading}>
        <ProfileContainer>
            <Form form={form} initialValues={props.user} {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                <Form.Item name={'email'}
                    label="Email"
                    rules={[{ type: 'email', required: true }]}
                    help={props.user?.newEmail?.trim() != "" &&
                        <div style={{marginTop: "10px"}}>
                            A request has been made to change your email to {props.user?.newEmail}
                            &nbsp;<Button size="small" danger={true} onClick={cancelMailChange}>Cancel</Button>
                        </div>}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="Password">
                    <Link to="/change-password">Change</Link>
                </Form.Item>
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
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </ProfileContainer>
    </Spin>
}

const mapStateToProps = (store: IAppState): Partial<Props> => ({
    user: store.currentUserStore.user,
    loading: store.currentUserStore.loading
})

export default connect(
    mapStateToProps,
    (dispatch) => bindActionCreators(CurrentUserStore.actionCreators, dispatch)
)(Profile);
