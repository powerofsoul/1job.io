import { Form, Input, Button, Checkbox } from 'antd';
import styled from 'styled-components';
import { useState } from 'react';
import { post } from '../Utils';
import CurrentUserStore from '../redux/stores/CurrentUserStore';
import { IAppState } from '../redux/configureStore';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { User } from '../../models/UserModel';
import { toast } from 'react-toastify';

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
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [companyName, setCompanyName] = useState('');

    const submit = () => {
       post("/api/user/register", {
                email, password, companyName
       }).then((response: {success: boolean, error: string}) => {
            if(response.success) {
                toast("Welcome!", {
                    type: "success"
                });

                setTimeout(() => {
                    window.location.href = "/"
                }, 1000);
            } else {
                toast("Make sure you filled all field.", {
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
            onSubmitCapture={submit}>
            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, type:"email", message: 'Please input your email!' }]}>
                <Input onChange={(e) => setEmail(e.target.value)}/>
            </Form.Item>

            <Form.Item
                label="Company Name"
                name="company-name"
                rules={[{ required: true, min:3, message: 'Please input your company name!' }]}>
                <Input onChange={(e) => setCompanyName(e.target.value)}/>
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}>
                <Input.Password onChange={(e) => setPassword(e.target.value)} />
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
