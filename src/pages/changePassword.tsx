import React, { useState } from "react"
import { User } from "../../models/User"
import { IAppState } from "../redux/configureStore"
import { connect } from "react-redux"
import { useParams, useHistory } from "react-router"
import { Row, Form, Input, Col, Button, Skeleton, Spin } from "antd"
import { LockOutlined } from "@ant-design/icons"
import Space from "../style/Space"
import { post } from "../Utils"
import { ApiResponse } from "../../models/ApiResponse"
import { toast } from "react-toastify"

interface Props {
    user: User;
}

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
};

const ChangePassword = (props: User) => {
    const { token } = useParams();
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const changePass = (values: {
        currentPassword: string,
        newPassword: string
    }) => {
        setLoading(true);
        post("/user/changePass", {
            ...values,
            token
        }).then((response: ApiResponse)=>{
            if(response.success){
                history.push('/');
                toast("Password change", {
                    type: "success"
                });
            } else {
                toast(response.message, {
                    type: "error"
                });
            }
        }).catch(()=>{
            toast("Something went wrong.", {
                type: "error"
            });
        }).finally(()=>{
            setLoading(false);
        })
    }

    return <Row style={{ marginTop: Space.md }} justify="center">
        <Col md={12}>
            <Spin spinning={loading} tip="Loading...">
                <Form onFinish={changePass} {...layout}>
                    {!token && <Form.Item
                        label="Current Password"
                        name="currentPassword"
                        rules={[{ required: true, message: 'Please input your Password!' }]}>
                        <Input.Password />
                    </Form.Item>}
                    <Form.Item
                        label="Password"
                        name="newPassword"
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
                                    if (!value || getFieldValue('newPassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('The two passwords that you entered do not match!');
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                    </Button>
                    </Form.Item>
                </Form>
            </Spin>
        </Col>
    </Row>
}

export default connect((store: IAppState): Partial<Props> => ({
    user: store.currentUserStore.user
}))(ChangePassword)