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
import PageCardContainer from '../../common/PageCardContainer';
const { TabPane } = Tabs;

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};
const tailLayout = {
    wrapperCol: { offset: 12, span: 24 },
};

const Register = styled.div`
    .ant-tabs-nav-scroll{
        text-align:center;
    }
`;


export default () => {
    const history = useHistory();
    const [userType, setUserType] = useState("Employer");

    const submit = (values) => {
        const user = {
            ...values.user,
            __t: userType
        } as User;

        post("/user/register", { user }).then((response: { success: boolean, message: string }) => {
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
        <PageCardContainer lg={8}>
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
        </PageCardContainer>
    </Register>
}


