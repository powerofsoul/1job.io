import PageCardContainer from "../../../common/PageCardContainer"
import React, { useState } from "react"
import styled from "styled-components";
import { connect } from "react-redux";
import { IAppState } from "../../../redux/configureStore";
import { Employee } from "../../../../models/Employee";
import { Spin, Row, Col, Button } from "antd";
import EditableInput from "./components/EditableInput";
import EditableWorkExperience from "./components/EditableWorkExperience";
import AvatarUpload from "../../../common/AvatarUpload";
import colors from "../../../style/Colors";
import Space from "../../../style/Space";
import moment from "moment";
import EditableEducation from "./components/EditableEducation";
import EditablePersonalProjects from "./components/EditablePersonalProjects";
import EditableStringArray from "./components/EditableStringArray";

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
    margin-top: ${Space.md};
`;

interface Props {
    user: Employee;
    loading: boolean;
}

const WorkExperienceCol = (user: Employee, setUser: (user: Employee) => void) => {
    return <>
        <h2>Work History</h2>
        {user?.workExperience.map((we, i) => <EditableWorkExperience workExperience={we} onChange={(we) => setUser({
            ...user,
            workExperience: [
                ...user.workExperience.slice(0, i),
                we,
                ...user.workExperience.slice(i + 1)
            ]
        })}
            onDelete={() => setUser({
                ...user,
                workExperience: [
                    ...user.workExperience.slice(0, i),
                    ...user.workExperience.slice(i + 1)
                ]
            })} />)}
        <Button type="dashed" onClick={() => {
            setUser({
                ...user,
                workExperience: [
                    ...user.workExperience,
                    {
                        companyName: "",
                        title: "",
                        description: "",
                        location: "",
                        period: [new Date().toISOString(), new Date().toISOString()]
                    }
                ]
            })
        }}>+ Add Work Experience</Button>
    </>
}

const EducationCol = (user, setUser) => {
    return <>
        <h2>Education</h2>
        {user?.education.map((ed, i) => <EditableEducation education={ed} onChange={(ed) => setUser({
            ...user,
            education: [
                ...user.education.slice(0, i),
                ed,
                ...user.education.slice(i + 1)
            ]
        })}
            onDelete={() => setUser({
                ...user,
                education: [
                    ...user.education.slice(0, i),
                    ...user.education.slice(i + 1)
                ]
            })} />)}
        <Button type="dashed" onClick={() => {
            setUser({
                ...user,
                education: [
                    ...user.education,
                    {
                        courses: [],
                        institution: "",
                        study: "",
                        period: [new Date().toISOString(), new Date().toISOString()]
                    }
                ]
            })
        }}>+ Add Education</Button>
    </>
}

const ProjectCol = (user, setUser) => {
    return <>
        <h2>Personal Projects</h2>

        {user?.projects.map((p, i) => <EditablePersonalProjects workProject={p} onChange={(p) => setUser({
            ...user,
            projects: [
                ...user.projects.slice(0, i),
                p,
                ...user.projects.slice(i + 1)
            ]
        })}
            onDelete={() => setUser({
                ...user,
                projects: [
                    ...user.projects.slice(0, i),
                    ...user.projects.slice(i + 1)
                ]
            })} />)}
        <Button type="dashed" onClick={() => {
            setUser({
                ...user,
                projects: [
                    ...user.projects,
                    {
                        description: "",
                        name: "",
                        link: "",
                        period: [new Date().toISOString(), new Date().toISOString()]
                    }
                ]
            })
        }}>+ Add Projects</Button>
    </>
}

const SkillsCol = (user: Employee, setUser) => <EditableStringArray array={user.skills} onChange={(skills)=> {
    setUser({
        ...user, 
        skills
    })  
}}/>

const InterestsCol = (user: Employee, setUser) => <EditableStringArray array={user.interests} onChange={(interests)=> {
    setUser({
        ...user, 
        interests
    })  
}}/>

const Component = (props: Props) => {
    const [user, setUser] = useState<Employee>();

    React.useEffect(() => {
        setUser(props.user);
    }, [props.user]);

    return <PageCardContainer lg={18}>
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
                    <Row gutter={[10, 10]}>
                        <Col xs={16}>
                            {WorkExperienceCol(user, setUser)}
                        </Col>
                        <Col xs={8}>
                            {EducationCol(user, setUser)}
                            {ProjectCol(user, setUser)}
                        </Col>
                    </Row>
                </CvBuilderBody>
            </CvBuilder>
        </Spin>
    </PageCardContainer>
}

export default connect((store: IAppState) => ({
    user: store.currentUserStore.user,
    loading: store.currentUserStore.loading
}))(Component);