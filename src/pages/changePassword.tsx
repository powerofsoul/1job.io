import React from "react"
import { User } from "../../models/User"
import { IAppState } from "../redux/configureStore"
import { connect } from "react-redux"
import { useParams, useHistory } from "react-router"
import { Row, Form, Input, Col, Button } from "antd"
import { LockOutlined } from "@ant-design/icons"
import Space from "../style/Space"

interface Props {
    user: User;
}

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 17 },
};

const ChangePassword = (props: User) => {
    const { token } = useParams();
    const history = useHistory();

    return <Row style={{ marginTop: Space.md }} justify="center">
        <Col md={5}>
            <Form {...layout}>
                <Form.Item
                    label="Current Password"
                    name="current-password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
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
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('The two passwords that you entered do not match!');
                            },
                        }),
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Col>
    </Row>
}

export default connect((store: IAppState): Partial<Props> => ({
    user: store.currentUserStore.user
}))(ChangePassword)