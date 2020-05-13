import { CheckCircleTwoTone } from '@ant-design/icons';
import { Button, Col, Row, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { Link, useParams } from "react-router-dom";
import styled from 'styled-components';
import { Employee } from '../../models/Employee';
import { Job } from '../../models/Job';
import { User } from '../../models/User';
import CompanyCard from '../common/CompanyCard';
import PageCardContainer, { HeaderItem } from '../common/PageCardContainer';
import { IAppState } from '../redux/configureStore';
import colors from '../style/Colors';
import Space from '../style/Space';
import { get } from '../Utils';
import JobCard from "../common/JobCard";

const JobDetails = styled(PageCardContainer)`
    .JobDetailsHeader {
        align-items:center;

        .CompanyDetails {
            display: block;
            align-items:center;
        }
    }
    

    .no-padding {
        padding: 0;
    }

    .JobDetailsBody {
        .html-content {
            align-items:center;
            margin-top: 2rem;
        }
    }

    .action-buttons {
        .ant-btn {
            margin-right: ${Space.md};
            margin-top: ${Space.sm};
        }
    }
`;
interface Props {
    currentUser?: User;
}

const applyButton = (user: User | Employee, jobId: string) => {
    if(!user) {
        return <Link to="/login" className="ant-btn ant-btn-primary">Log in to apply with 1job</Link>
    };
    if(user.__t != "Employee") {
        return;
    }

    const employee = user as Employee;
    if(employee.applications.some(e=> e.job == jobId)) {
        return <span><CheckCircleTwoTone twoToneColor={colors.green}/> You applied succesfully</span>
    } else {
        return <Link className="ant-btn ant-btn-primary" to={`/job/${jobId}/apply`}>Apply using your 1job Profile</Link>
    }
}

const JobPage = (props: Props) => {
    const { id } = useParams();
    const [job, setJob] = useState<Job>()
    const [loading, setLoading] = useState(true)
    const history = useHistory();

    const fetch = () => {
        get(`/job/${id}`).then((j: Job) => {
            setJob(j);
            setLoading(false);
        }).catch(() => {
            history.push("/");
        });
    }

    useEffect(() => {
        if (loading) {
            fetch();
        }
    })

    const header: HeaderItem[] = [
        {name: job?.company?.companyName, to: `/company/${job?.company?._id}` },
        {name: job?.title}
    ]

    return <JobDetails header={header}>
        <Row gutter={[50, 12]} justify="center">
            <Col lg={6}>
                <Skeleton avatar active loading={loading}>
                    <div className="JobDetailsHeader">
                        <div className="CompanyDetails">
                            <CompanyCard user={job?.company} />
                        </div>
                    </div>
                </Skeleton>
            </Col>
            <Col lg={18}>
                <Skeleton paragraph={true} active loading={loading}>
                    <div className="JobDetailsBody">
                        <JobCard job={job} hideLogo hideCompany style="compact"/>
                        <div className="action-buttons">
                            {job?.company?._id == props.currentUser?._id &&
                                <Link to={`/job/${job?._id}/edit`} className="ant-btn ant-btn-primary">
                                    Edit
                            </Link>
                            }
                            {job?.company?._id == props.currentUser?._id && <Link to={`/job/${job?._id}/applicants`}><Button type="primary">View Applicants</Button></Link>}
                            {job?.applyOn &&  <a className="ant-btn ant-btn-primary" href={job?.applyOn}>Apply on company page</a>}
                            {applyButton(props.currentUser, job?._id)}
                        </div>
                      
                        <div className="html-content">
                            <h3>Job Description:</h3>
                            <div className="ql-editor no-padding" dangerouslySetInnerHTML={{ __html: job?.description }} />
                        </div>
                    </div>
                </Skeleton>
            </Col>
        </Row>
    </JobDetails>
}

const mapStateToProps = (store: IAppState): Partial<Props> => ({
    currentUser: store.currentUserStore.user
});

export default connect(
    mapStateToProps
)(JobPage);