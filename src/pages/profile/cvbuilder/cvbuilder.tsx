import { Col, Row, Select, Spin } from "antd";
import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Employee } from "../../../../models/Employee";
import AvatarUpload from "../../../common/AvatarUpload";
import PageCardContainer from "../../../common/PageCardContainer";
import { IAppState } from "../../../redux/configureStore";
import colors from "../../../style/Colors";
import Space from "../../../style/Space";
import EditableInput from "./components/EditableInput";
import { EducationCol, InterestsCol, ProjectCol, SkillsCol, WorkExperienceCol } from "./CvBuilderElements";
import { CvLayout, EmptyRow, Layout } from "./CvBuilderLayouts";

const CvBuilder = styled.div`
    position: relative;
    font-family: 'Raleway', sans-serif;
    padding: 2rem;
    font-size: 20px;
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
    margin-top: ${Space.md};
`;

const CvBuilderSettings = styled.div`
    width: 100%;
    display: flex;

    .settings-item {
        margin-right: ${Space.xs};
    }
`;

interface Props {
    user: Employee;
    loading: boolean;
}

const Component = (props: Props) => {
    const [user, setUser] = useState<Employee>();
    const [layout, setLayout] = useState<Layout>([[<EmptyRow  onAdd={() => setLayout([
        [<span>"ASD"</span>],
        [<span>"ASD"</span>],
        ...layout
    ])} />]]);

    React.useEffect(() => {
        setUser(props.user);
    }, [props.user]);

    return <PageCardContainer lg={18}>
        <Spin spinning={props.loading} tip="Loading...">
            <CvBuilder>
                <CvBuilderSettings>
                    <div className="settings-item">
                        <Select placeholder="Font">
                            <Select.Option value="-">Default</Select.Option>
                        </Select>
                    </div>
                </CvBuilderSettings>
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
                            <AvatarUpload value={props.user?.avatar} className="avatar-upload" />
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
                    <CvLayout layout={layout} />
                </CvBuilderBody>
            </CvBuilder>
        </Spin>
    </PageCardContainer>
}

export default connect((store: IAppState) => ({
    user: store.currentUserStore.user,
    loading: store.currentUserStore.loading
}))(Component);