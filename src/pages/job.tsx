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
        ${HoverableCard}
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
        <Row gutter={[0, 12]} justify="center">

            <Col xs={24} lg={5}>
                <Skeleton avatar active loading={loading}>
                    <div className="JobDetailsHeader">
                        <div className="CompanyDetails">
                            <CompanyCard user={job?.company} />
                        </div>
                    </div>
                </Skeleton>
            </Col>
            <Col xs={24} lg={12}>
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
                                <Link to={`/post/${job?._id}`} className="ant-btn ant-btn-primary">
                                    Edit
                            </Link>
                            }
                            {job?.applyOn && <a className="ant-btn ant-btn-primary" href={job?.applyOn}>Apply now</a>}
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