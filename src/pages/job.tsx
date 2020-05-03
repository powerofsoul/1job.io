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
import Space from '../style/Space';

const JobDetails = styled.div`
    padding-top: 5rem;
    padding-bottom: 5rem;
    
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
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        transition: 0.3s;
        padding: ${Space.md};

        &:hover {
            box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
        }

        .html-content {
            align-items:center;
            margin-top: 2rem;
        }
    }
`;
interface Props {
    currentUser?: User;
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
        <Skeleton active loading={loading}>
            <Row gutter={[24, 24]} justify="center">
                <Col xs={24} lg={5}>
                    <div className="JobDetailsHeader">
                        <div className="CompanyDetails">
                            <CompanyCard user={job?.company} />
                        </div>
                    </div>
                </Col>
                <Col xs={24} lg={12}>
                    <div className="JobDetailsBody">
                        <div>
                            Posted {moment(job?.postedOn).fromNow()}
                        </div>
                        <h1>
                            {job?.title}
                        </h1>
                        {job?.company._id == props.currentUser?._id && <div>
                            <Link to={`/post/${job?._id}`} className="ant-btn ant-btn-primary">
                                Edit
                            </Link>
                        </div>}
                        <div className="html-content">
                            <div className="ql-editor no-padding" dangerouslySetInnerHTML={{ __html: job?.description }} />
                        </div>
                    </div>
                </Col>
            </Row>
        </Skeleton>
    </JobDetails>
}

const mapStateToProps = (store: IAppState): Partial<Props> => ({
    currentUser: store.currentUserStore.user
});

export default connect(
    mapStateToProps
)(JobPage);