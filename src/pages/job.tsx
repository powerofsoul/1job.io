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
import { useParams } from "react-router-dom";
import { useHistory } from 'react-router';
import CompanyCard from '../common/CompanyCard';

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
    .JobDetailsBody {
        align-items:center;
        margin-top: 2rem;
    }

    .no-padding {
        padding: 0;
    }
`;

export default () => {
    const { id } = useParams();
    const [job, setJob] = useState<Job>()
    const [loading, setLoading] = useState(true)
    const history = useHistory();

    const fetch = () => {
        get(`/api/job/${id}`).then((j: Job) => {
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
            <Row gutter={[32,32]} justify="center">
                <Col xs={12} md={9}>
                    <div>
                        Posted {moment(job?.postedOn).fromNow()}
                    </div>
                    <h1>
                        {job?.title}
                    </h1>
                    <div className="JobDetailsBody">
                        <div className="ql-editor no-padding" dangerouslySetInnerHTML={{ __html: job?.description }} />
                    </div>
                </Col>
                <Col xs={12} md={3}>
                    <div className="JobDetailsHeader">
                        <div className="CompanyDetails">
                            <CompanyCard user={job?.company} />
                            <div dangerouslySetInnerHTML={{ __html: job?.company.companyDescription }} />
                        </div>
                    </div>
                </Col>
            </Row>
        </Skeleton>
    </JobDetails>
}
