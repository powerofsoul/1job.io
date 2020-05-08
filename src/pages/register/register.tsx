import { Tabs, Form, Row, Col } from 'antd';
import React, { useState } from "react";
import styled from 'styled-components';
import EmployerRegister from './EmployerRegister';
import { useHistory } from 'react-router';
import { post } from '../../Utils';
import { toast } from 'react-toastify';
import { SimpleContainer } from '../../style/CommonStyles';
import EmployeeRegister from './EmployeeRegister';
import { User } from '../../../models/User';
const { TabPane } = Tabs;

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const Register = styled.div`
    margin-top: 2rem;

    .ant-tabs-nav-scroll{
        text-align:center;
    }
`;


export default () => {
    const history = useHistory();
    const [userType, setUserType] = useState("employer");

    const submit = (values) => {
        const user = {
            ...values.user,
            __t: userType
        } as User;

        post("/user/register", {user}).then((response: { success: boolean, message: string }) => {
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

    return <Register>
        <Row justify="center">
            <Col xs={24} lg={12}>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={submit}>
                    <Tabs size="large" defaultActiveKey="1" onChange={setUserType}>
                        <TabPane tab="Employer" key="Employer">
                            <EmployerRegister onSubmit={submit} tailLayout={tailLayout} layout={layout} />
                        </TabPane>
                        <TabPane tab="Employee" key="Employee">
                            <EmployeeRegister onSubmit={submit} tailLayout={tailLayout} layout={layout} />
                        </TabPane>
                    </Tabs>
                </Form>
            </Col>
        </Row>
    </Register>
}


