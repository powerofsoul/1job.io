import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CurrentUserStore from "../redux/stores/CurrentUserStore";
import { IAppState } from "../redux/configureStore";
import React, { useState } from "react";
import { Input, Form, InputNumber, Button, Upload, Skeleton } from "antd";
import styled from "styled-components";
import AvatarUpload from "../common/AvatarUpload";
import { post } from "../Utils";
import { toast } from "react-toastify";
import HtmlEditor from "../common/HtmlEditor";
import { User } from "../../models/User";
import { useHistory } from "react-router";

interface Props {
    user: User;
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
    
    const onFinish = async (values) => {
        const response: { success: boolean, user: User } = await post("/user/update", {
            user: {...values,
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
    }

    React.useEffect(() => {
        if (!props.loading && !props.user) {
            history.push("/login");
        }
    }, [props.user]);

    return <Skeleton loading={props.loading}>
        <ProfileContainer>
            <Form initialValues={props.user} {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                <Form.Item name={'email'} label="Email" rules={[{ type: 'email', required: true }]}>
                    <Input />
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
                <Form.Item name={'companyImage'} label="Logo">
                    <Form.Item name="dragger" valuePropName="fileList" noStyle>
                        <AvatarUpload avatarUrl={props.user?.companyImage} afterUpload={props.refreshCurrentUser} />
                    </Form.Item>
                </Form.Item>
                <Form.Item name={'companyDescription'} label="Company Description">
                    <HtmlEditor value={companyDescription} onChange={setCompanyDescription} />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </ProfileContainer>
    </Skeleton>
}

const mapStateToProps = (store: IAppState): Partial<Props> => ({
    user: store.currentUserStore.user,
    loading: store.currentUserStore.loading
})

export default connect(
    mapStateToProps,
    (dispatch) => bindActionCreators(CurrentUserStore.actionCreators, dispatch)
)(Profile);
