import { Form, Input, Button, Checkbox } from 'antd';
import styled from 'styled-components';
import { useState } from 'react';
import { post } from '../Utils';
import CurrentUserStore from '../redux/stores/CurrentUserStore';
import { IAppState } from '../redux/configureStore';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toast } from 'react-toastify';
import { User } from '../../models/User';
import React from "react";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const Login = styled.div`
    margin-top: 2rem;
`;

interface Props {
    setCurrentUser: (user: User) => void;
}

const Component = (props: Props) => {
    //const router = useRouter();

    const submit = (values) => {
       post("/api/user/register", values).then((response: {success: boolean, user: User, message: string}) => {
            if(response.success) {
                toast("Welcome!", {
                    type: "success"
                });

                props.setCurrentUser(response.user);

                setTimeout(() => {
                    //router.push("/");
                }, 1000);
            } else {
                toast(response.message, {
                    type: "error"
                });
            }
       })
    }

    return <Login>
        <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={submit}>
            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, type:"email", message: 'Please input your email!' }]}>
                <Input />
            </Form.Item>

            <Form.Item
                label="Company Name"
                name="companyName"
                rules={[{ required: true, min:3, message: 'Please input your company name!' }]}>
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}>
                <Input.Password  />
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    </Login>
}

export default connect(
    () => ({}),
    (dispatch) => bindActionCreators(CurrentUserStore.actionCreators, dispatch)
)(Component);
