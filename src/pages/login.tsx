import { Form, Input, Button, Checkbox } from 'antd';
import styled from 'styled-components';
import { useState } from 'react';
import { post } from '../Utils';
import CurrentUserStore from '../redux/stores/CurrentUserStore';
import { IAppState } from '../redux/configureStore';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { User } from '../../models/User';
import React from "react";
import { useHistory, useLocation } from 'react-router';
import PageCardContainer from '../common/PageCardContainer';

interface Props {
    setCurrentUser: (user: User) => void;
}

const Component = (props: Props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const location = useLocation();

    type LoginResponse = {
        success: boolean;
        message?: string;
        user?: User;
    }

    const onLogin = (user: User) => {
        props.setCurrentUser(user);
        toast("Login succesfully.", {
            type: "success"
        });

        if (location.pathname == '/login') {
            history.push('/');
        }
    }

    const submit = () => {
        post("/user/login", {
            email, password
        }).then((response: LoginResponse) => {
            if (response.success) {
                onLogin(response.user);
            } else {
                toast(response.message, {
                    type: "error"
                })
            }
        }).catch((r) => {
            toast("Invalid credentials.", {
                type: "error"
            })
        });
    }

    return <PageCardContainer lg={6}>
        <Form
            name="normal_login"
            className="form"
            initialValues={{ remember: true }}
            onFinish={submit} >
            <Form.Item
                name="email"

                rules={[{ required: true, type: "email", message: 'Please input your Email!' }]}>
                <Input value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    prefix={<MailOutlined className="site-form-item-icon" />}
                    placeholder="Email" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}>
                <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password" />
            </Form.Item>
            <Form.Item>
                <Link className="login-form-forgot" to="/forgotpass">
                    Forgot password
                </Link>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
                <br />
                Or <Link to="/register"><span>register now!</span></Link>
            </Form.Item>
        </Form>
    </PageCardContainer>
}

export default connect(
    () => ({}),
    (dispatch) => bindActionCreators(CurrentUserStore.actionCreators, dispatch)
)(Component);
