import { useRouter } from 'next/router';
import { IAppState } from '../redux/configureStore';
import { Job } from '../../models/Job';
import { connect } from 'react-redux';
import { Tag, Row, Col, Skeleton } from "antd";
import colors from '../style/Colors';
import styled from 'styled-components';
import { get } from '../Utils';
import { useState, useEffect } from 'react';
import moment from 'moment';

const JobDetails = styled.div`
    .JobDetailsHeader {
        align-items:center;

        .CompanyDetails {
            display: block;
            align-items:center;

            .companyLogo {
                float: left;
                margin-top: 1rem;
                margin-right: 1rem;
                min-height: 5rem;
                max-height: 5rem;
                min-width: 5rem;
                max-width: 5rem;
                border-radius: 50%;
            }
        }
    }
    .JobDetailsBody {
        align-items:center;
        margin-top: 2rem;
    }
`;
  
export default () => {
    const router = useRouter();
    const { id } = router.query;
    const [job, setJob] = useState<Job>()
    const [loading, setLoading] = useState(true)

    const fetch = async () => {
        const job: Job = await get(`/api/job/${id}`);
        setJob(job);
        setLoading(false);
    }

    useEffect(() => {
        if (loading) {
            fetch();
        }
    })

    return <JobDetails>
        <Skeleton active loading={loading}>
            <Row justify="center">
                <Col xs={24} md={7}>
                    <div className="JobDetailsHeader">
                        <div>
                            {moment(job?.postedOn).fromNow()}
                        </div>
                        <h1>
                            {job?.title}
                        </h1>
                        <div className="CompanyDetails">
                            <img className="companyLogo" src={job?.company.companyImage} />
                            <a href={job?.company.companyWebsite} target="_blank">
                                <h3>
                                    {job?.company.companyName}
                                </h3>
                            </a>
                            <div dangerouslySetInnerHTML={{__html: job?.company.companyDescription}} />
                        </div>
                    </div>
                </Col>
            </Row>
            <Row justify="center">
                <Col xs={24} md={7}>
                    <div className="JobDetailsBody">
                        <div className="ql-editor" dangerouslySetInnerHTML={{ __html: job?.description }} />
                    </div>
                </Col>
            </Row>
        </Skeleton>
    </JobDetails>
}
