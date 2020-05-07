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
import { useHistory } from 'react-router';

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
    const history = useHistory();

    const submit = (values) => {
        post("/user/register", values).then((response: { success: boolean, message: string }) => {
            if (response.success) {
                toast(response.message, {
                    type: "success"
                });
                history.push("/");
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
                name={["user", "email"]}
                rules={[{ required: true, type: "email", message: 'Please input your email!' }]}>
                <Input />
            </Form.Item>

            <Form.Item
                label="Company Name"
                name={["user", "_employer", "companyName"]}
                rules={[{ required: true, min: 3, message: 'Please input your company name!' }]}>
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name={["user", "password"]}
                rules={[{ required: true, message: 'Please input your password!' }]}>
                <Input.Password />
            </Form.Item>
            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue(['user', 'password']) === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject('The two passwords that you entered do not match!');
                        },
                    }),
                ]}
            >
                <Input.Password />
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
