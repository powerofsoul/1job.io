import { IAppState } from '../redux/configureStore';
import { Job } from '../../models/Job';
import { connect } from 'react-redux';
import { Tag, Row, Col, Skeleton, Avatar } from "antd";
import colors from '../style/Colors';
import styled from 'styled-components';
import { get } from '../Utils';
import { useState, useEffect } from 'react';
import moment from 'moment';
import React from "react";
import { useParams, Link } from "react-router-dom";
import { useHistory } from 'react-router';
import CompanyCard from '../common/CompanyCard';
import { User } from '../../models/User';
import { HoverableCard } from "../style/CommonStyles";
import Space from '../style/Space';
import { Employee } from '../../models/Employee';
import { CheckCircleTwoTone } from '@ant-design/icons';
import PageCardContainer from '../common/PageCardContainer';

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

    return <JobDetails>
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
                        <div>
                            Posted {moment(job?.postedOn).fromNow()}
                        </div>
                        <h1>
                            {job?.title}
                        </h1>
                        <div className="action-buttons">
                            {job?.company._id == props.currentUser?._id &&
                                <Link to={`/job/${job?._id}/edit`} className="ant-btn ant-btn-primary">
                                    Edit
                            </Link>
                            }
                            {job?.applyOn &&  <a className="ant-btn ant-btn-primary" href={job?.applyOn}>Apply on company page</a>}
                            {applyButton(props.currentUser, job?._id)}
                        </div>
                        <div className="html-content">
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