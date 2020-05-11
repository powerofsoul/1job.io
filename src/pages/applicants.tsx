import PageCardContainer, { HeaderItem } from "../common/PageCardContainer"
import React, { useState } from "react"
import { Job } from "../../models/Job";
import { get } from "../Utils";
import { useParams, useHistory } from "react-router";
import { ApiResponse } from "../../models/ApiResponse";
import { Spin, Collapse, Tag } from "antd";
import { Employee } from "../../models/Employee";
import styled from "styled-components";
import { HoverableCard } from "../style/CommonStyles";
import { Tabs } from 'antd';
import Space from "../style/Space";
import moment from "moment";
const { TabPane } = Tabs;
const { Panel } = Collapse;

const Applications = styled(PageCardContainer)`
    .employee {
        ${HoverableCard}
    }

    .tab-element {
        margin-bottom: ${Space.md};
    }
`;

export default () => {
    const [jobRequestMade, setJobRequestMade] = useState(false);
    const [job, setJob] = useState<Job>();
    const { id } = useParams();
    const history = useHistory();

    const getJob = () => {
        get(`/job/${id}/applicants`).then((response: ApiResponse & { job?: Job }) => {
            if (response.success) {
                setJob(response.job)
            } else {
                history.push("/");
            }
        })
    }

    React.useEffect(() => {
        if (!jobRequestMade) {
            setJobRequestMade(true);
            getJob();
        }
    });

    const header: HeaderItem[] = [
        { name: "Profile", to: "/profile" },
        { name: "My Jobs", to: "/profile#MyJobs" },
        { name: job?.title, to: `/job/${job?._id}` },
        { name: "Applicants" }
    ]

    return <Applications header={header}>
        <Spin spinning={!job} tip="Loading...">
            <h2>{job?.title}</h2>
            {job?.applications.length == 0 && "No applicants yet. We will notify you when something happens."}
            <Collapse
                defaultActiveKey={['1']}
            >
                {job?.applications.map((a) => {
                    const employee = a.employee as Employee;
                    return <Panel header={
                        <div>
                            <h3 style={{ display: "inline" }}>
                                {employee.firstName} {employee.lastName}
                            </h3>
                            &nbsp;
                            <small>
                                {employee.title}
                            </small>
                        </div>
                    } key={employee._id}>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="Cover Letter & Questions" key="1">
                                {a.answers.length > 0 && <h3>Questions:</h3>}
                                {a.answers.map((q) => <div className="tab-element" key={q.question}>
                                    <div>
                                        <b>
                                            {q.question}
                                        </b>
                                    </div>
                                    <div>
                                        {q.answer}
                                    </div>
                                </div>)}
                                <div className="tab-element">
                                    <h3>Cover Letter</h3>
                                    <div>
                                        {a.coverLetter}
                                    </div>
                                </div>
                            </TabPane>
                            <TabPane tab="Work Experience & Projects" key="2">
                                {employee.workExperience.map((we, i) => <div key={i} className="tab-element">
                                    <h2>{we.companyName}</h2>
                                    <h3>{we.title}</h3>
                                    <div>{we.location}</div>
                                    <div>
                                        <b>{moment(we.period[0] as string).format("Y-m")}</b>
                                        -
                                        <b>{moment(we.period[1] as string).format("Y-m")}</b></div>
                                    <div>{we.description}</div>
                                </div>)}

                                {employee.projects.map((p, i) => <div key={i} className="tab-element">
                                    <a href={p.link}><h2>{p.name}</h2></a>
                                    <div>
                                        <b>{moment(p.period[0] as string).format("Y-m")}</b>
                                        -
                                        <b>{moment(p.period[1] as string).format("Y-m")}</b></div>
                                    <div>{p.description}</div>
                                </div>)}
                            </TabPane>
                            <TabPane tab="Contact" key="3">
                                <div className="tab-element">
                                    <h3>Email</h3>
                                    {employee.email}
                                    <h3>Phone</h3>
                                    {employee.phone}
                                </div>
                            </TabPane>
                            <TabPane tab="Other Info" key="4">
                                <div className="tab-element">
                                    <h3>Motto</h3>
                                    {employee.motto}
                                </div>
                                <div className="tab-element">
                                    <h3>Languages</h3>
                                    {employee.languages.map(l => <Tag key={l} color="orange">{l}</Tag>)}
                                </div>
                                <div className="tab-element">
                                    <h3>Skills:</h3>
                                    {employee.skills.map(s => <Tag key={s} color="green">{s}</Tag>)}
                                </div>
                                <div className="tab-element">
                                    <h3>Interests</h3>
                                    {employee.interests.map(i => <Tag key={i} color="lime">{i}</Tag>)}
                                </div>
                            </TabPane>
                        </Tabs>
                    </Panel>
                })}
            </Collapse>
        </Spin>
    </Applications>
}