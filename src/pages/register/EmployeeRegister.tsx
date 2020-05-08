import { Button, Form, Input } from 'antd';
import React from "react";

interface Props {
    layout: any;
    tailLayout: any;
    onSubmit: (values) => void;
}

export default (props: Props) => {
    return <Form
        {...props.layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={props.onSubmit}>
        <Form.Item
            label="Email"
            name={["user", "email"]}
            rules={[{ required: true, type: "email", message: 'Please input your email!' }]}>
            <Input />
        </Form.Item>

        <Form.Item
            label="First Name"
            name={["user", "firstName"]}
            rules={[{ required: true, min: 3, message: 'Please input your company name!' }]}>
            <Input />
        </Form.Item>

        <Form.Item
            label="Last Name"
            name={["user", "lastName"]}
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
        <Form.Item {...props.tailLayout}>
            <Button type="primary" htmlType="submit">
                Submit
                </Button>
        </Form.Item>
    </Form>
}