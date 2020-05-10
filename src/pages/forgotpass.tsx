import { MailOutlined } from "@ant-design/icons"
import { Button, Col, Form, Input, Row, Spin } from "antd"
import React, { useState } from "react"
import { useHistory } from "react-router"
import { toast } from "react-toastify"
import { ApiResponse } from "../../models/ApiResponse"
import Space from "../style/Space"
import { post } from "../Utils"
import PageCardContainer from "../common/PageCardContainer"

export default () => {
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const sendPassword = (values: { email: string }) => {
        setLoading(true);

        post("/user/forgotpass", {
            email: values.email
        }).then((response: ApiResponse) => {
            toast(response.message, {
                type: response.success ? "success" : "error"
            });

            setLoading(false);
            if (response.success) {
                history.push('/');
            }
        }).catch(() => {
            toast("Something went wrong", {
                type: "error"
            });

            history.push('/');
        })
    }

    return <PageCardContainer>
        <Spin spinning={loading} tip="Loading...">
            <Form
                name="normal_login"
                className="form"
                initialValues={{ remember: true }}
                onFinish={sendPassword} >

                <Form.Item
                    name="email"
                    rules={[{ required: true, type: "email", message: 'Please input your Email!' }]}>
                    <Input prefix={<MailOutlined className="site-form-item-icon" />}
                        placeholder="Email" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Send
                    </Button>
                </Form.Item>
            </Form>
        </Spin>
    </PageCardContainer>
}