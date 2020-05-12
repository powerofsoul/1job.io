import PageCardContainer from "../../../common/PageCardContainer"
import React, { useState } from "react"
import styled from "styled-components";
import { connect } from "react-redux";
import { IAppState } from "../../../redux/configureStore";
import { Employee } from "../../../../models/Employee";
import { Spin, Row, Col } from "antd";
import EditableInput from "./components/EditableInput";
import AvatarUpload from "../../../common/AvatarUpload";
import colors from "../../../style/Colors";

const CvBuilder = styled.div`
    font-family: 'Raleway', sans-serif;
    padding: 2rem;
`;

const CvBuilderHeader = styled.div`
    padding-bottom: 2rem;
    .avatar-container {
        display: flex;

        .avatar-upload {
            width: auto;
            margin-left: auto;
            margin-right: auto;
        }
    }


    .contact {
        text-align: right;
    }

    border-bottom: 1px solid ${colors.black};
`;

const CvBuilderBody = styled.div`

`;

interface Props {
    user: Employee;
    loading: boolean;
}

const Component = (props: Props) => {
    const [user, setUser] = useState<Employee>();

    React.useEffect(() => {
        setUser(props.user);
    }, [props.user]);

    return <PageCardContainer>
        <Spin spinning={props.loading} tip="Loading...">
            <CvBuilder>
                <CvBuilderHeader>
                    <Row className="full-name">
                        <Col xs={8}>
                            <h1 className="name">
                                <EditableInput value={user?.firstName} placeHolder="Full Name" onChange={(value) => setUser({
                                    ...user,
                                    firstName: value
                                })} />
                            </h1>
                            <h4>
                                <EditableInput value={user?.title} placeHolder="Title" onChange={(value) => setUser({
                                    ...user,
                                    title: value
                                })} />
                            </h4>

                            <EditableInput value={user?.motto} placeHolder="Motto" onChange={(value) => setUser({
                                ...user,
                                motto: value
                            })} />
                        </Col>
                        <Col xs={8} className="avatar-container">
                            <AvatarUpload avatarUrl={props.user?.avatar} className="avatar-upload" afterUpload={() => { }} />
                        </Col>
                        <Col xs={8} className="contact">
                            <div>
                                <EditableInput disabled value={user?.email} placeHolder="Email" onChange={(value) => setUser({
                                    ...user,
                                    email: value
                                })} />
                            </div>
                            <div>
                                <EditableInput value={user?.phone} placeHolder="Phone" onChange={(value) => setUser({
                                    ...user,
                                    phone: value
                                })} />
                            </div>
                            <div>
                                <EditableInput value={user?.lastName} placeHolder="Location" onChange={(value) => setUser({
                                    ...user,
                                    lastName: value
                                })} />
                            </div>
                        </Col>
                    </Row>
                </CvBuilderHeader>
                <CvBuilderBody>
                    
                </CvBuilderBody>
            </CvBuilder>
        </Spin>
    </PageCardContainer>
}

export default connect((store: IAppState) => ({
    user: store.currentUserStore.user,
    loading: store.currentUserStore.loading
}))(Component);