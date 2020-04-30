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
import { useHistory } from 'react-router';

const Login = styled.div`
    margin-top: 2rem;
    display: flex;

    .form {
        width: 300px;
        margin-left: auto;
        margin-right: auto;
    }
`;

interface Props {
    setCurrentUser: (user: User) => void;
}

const Component = (props: Props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const submit = () => {
        post("/api/user/login", {
            email, password
        }).then((user: User) => {
            props.setCurrentUser(user);
            toast("Login succesfully.", {
                type: "success"
            });
            history.push("/");
            
        }).catch((r) => {
            toast("Invalid credentials.", {
                type: "error"
            })
        });
    }

    return <Login>
        <Form
            name="normal_login"
            className="form"
            initialValues={{ remember: true }}
            onFinish={submit} >
            <Form.Item
                name="email"
               
                rules={[{ required: true,  type:"email", message: 'Please input your Email!' }]}>
                <Input  value={email}
                        onChange = {(e) => setEmail(e.target.value)} 
                        prefix={<MailOutlined className="site-form-item-icon" />} 
                        placeholder="Email" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}>
                <Input
                    value={password}
                    onChange = {(e) => setPassword(e.target.value)}
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"/>
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
                <br/>
                Or <Link to="/register"><span>register now!</span></Link>
            </Form.Item>
        </Form>
    </Login>
}

export default connect(
    () => ({}),
    (dispatch) => bindActionCreators(CurrentUserStore.actionCreators, dispatch)
)(Component);
