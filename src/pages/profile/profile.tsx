import { Col, Row, Tabs } from "antd";
import { useForm } from "antd/lib/form/util";
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

interface Props {
    user: Employer;
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

    return <ProfileContainer>
        <Row justify="center">
            <Col xs={24} lg={12}>
                <Tabs size="large" defaultActiveKey="1">
                    <Tabs.TabPane tab="Profile" key="Employer">
                        
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Account" key="Employee">
                        <UserProfileTab loading={props.loading || loading} 
                            form={form} 
                            layout={layout} 
                            setLoading={setLoading}
                            />
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
