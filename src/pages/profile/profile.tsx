import { Col, Row, Tabs, Spin } from "antd";
import { useForm, FormInstance } from "antd/lib/form/util";
import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { bindActionCreators } from "redux";
import styled from "styled-components";
import { Employer } from "../../../models/Employer";
import { User } from "../../../models/User";
import { IAppState } from "../../redux/configureStore";
import CurrentUserStore from "../../redux/stores/CurrentUserStore";
import { SimpleContainer } from "../../style/CommonStyles";
import UserProfileTab from "./tabs/UserProfileTab";
import EmployerProfileTab from "./tabs/EmployerProfileTab";
import { toast } from "react-toastify";
import { UpdateUserResponse } from "../../../server/services/UserService";
import { post } from "../../Utils";
import EmployeeProfileTab from "./tabs/EmployeeProfileTab";

interface Props {
    user: User;
    loading: boolean;
    refreshCurrentUser?: () => void;
    setCurrentUser: (user: User) => void;
}

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

const ProfileContainer = styled.div`
    margin-top: 2rem;

    ${SimpleContainer}
`;

export interface ProfileTabProps {
    loading: boolean;
    layout: any;
    setLoading: (value: boolean) => void;
    onFinish: (values) => void;

    user: Employer;
    setCurrentUser: (user) => void;
    refreshCurrentUser: () => void;
}


const Profile = (props: Props) => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [form] = useForm();

    React.useEffect(() => {
        if (!props.loading && !props.user) {
            history.push("/login");
        }

        if (!loading) {
            form.resetFields();
        }
    });

    const onFinish = async (user) => {
        setLoading(true);

        const response: UpdateUserResponse = await post("/user/update", {
            user
        });

        if (response.success) {
            toast("Profile saved!", {
                type: "success"
            });

            props.setCurrentUser(response.user);
        } else {
            toast("Something went wrong. Please try again later!", {
                type: "error"
            })
        }

        setLoading(false);
    }

    const tabProps = {
        loading: props.loading || loading,
        layout,
        setLoading,
        onFinish
    }

    return <ProfileContainer>
        <Row justify="center">
            <Col xs={24} lg={12}>
                <Tabs size="large" defaultActiveKey="1">
                    <Tabs.TabPane tab="Profile" key="Employer">
                        {!props.user && <Spin spinning/>}
                        {props.user?.__t == "Employer" && <EmployerProfileTab {...tabProps} />}
                        {props.user?.__t == "Employee" && <EmployeeProfileTab {...tabProps} />}
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Account" key="Employee">
                        <UserProfileTab {...tabProps} />
                    </Tabs.TabPane>
                </Tabs>
            </Col>
        </Row>
    </ProfileContainer>
}

const mapStateToProps = (store: IAppState): Partial<Props> => ({
    user: store.currentUserStore.user,
    loading: store.currentUserStore.loading
})

export default connect(
    mapStateToProps,
    (dispatch) => bindActionCreators(CurrentUserStore.actionCreators, dispatch)
)(Profile);
