import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Skeleton, Tag } from "antd";
import moment from "moment";
import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { Job } from "../../models/Job";
import Space from "../style/Space";

import { faClock, faCompass, faBuilding, faUser, faFileCode } from '@fortawesome/free-regular-svg-icons'
import { faTag, faLevelUpAlt } from '@fortawesome/free-solid-svg-icons'

const JobCard = styled.div`
    min-height: 5rem;
    padding: 1rem;
    display: flex;
    margin-bottom: 1rem;
    cursor: pointer;

    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;

    &:hover {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }

    .header, .footer {
        align-items:center;
        width: 100%;
    }

    .footer {
        margin-top: 1rem;
        margin-top: auto;
        .tags > div {
            margin-bottom: 0.5rem;
        }

        .category-and-type {
            display: flex;
            align-items: center;

            .type {
                margin-left: auto
            }
        }
    }

    .job-card-data {
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .avatar {
        height: 100%;
        width: 100px;
        margin-right: ${Space.sm};

        img {
            object-fit: contain;
        }
    }

    .icon {
        min-width: 30px;
        font-size: 15px;
    }

    .ant-tag {
        line-height: 15px;
    }
`;

interface Props {
    job: Job,
    className?: string;
    hideLogo?: boolean;
}

const Component = (props: Props) => {
    const { job, className } = props;
    const history = useHistory();
    const goToJobPage = () => {
        history.push(`/job/${job._id}`);
    }

    return <JobCard className={className} onClick={goToJobPage}>
        <Skeleton avatar active loading={!job}>
            {!props.hideLogo && <div>
                <Avatar className="avatar" shape="square" src={job.company.companyImage} />
            </div>}
            <div className="job-card-data">
                <div className="header">
                    <div>
                        <FontAwesomeIcon className="icon" icon={faClock} />
                        <span>
                            {moment(job.postedOn).fromNow()}
                        </span>
                    </div>
                </div>
                <div>
                    <h3>
                        <FontAwesomeIcon className="icon" icon={faUser} />
                        {job.title}
                    </h3>
                    <h4>
                        <FontAwesomeIcon className="icon" icon={faBuilding} />
                        {job.company.companyName}
                    </h4>
                </div>
                <div className="footer">
                    <div className="tags">
                        <div className="category-and-type">
                            <div>
                                <FontAwesomeIcon className="icon" icon={faTag} /> <Tag color="blue">{job.category}</Tag>
                            </div>
                            <div className="type">
                                <Tag>{job?.type}</Tag>
                            </div>
                        </div>
                        <div>
                            <FontAwesomeIcon className="icon" icon={faCompass} /> {job.regions?.map((r) => <Tag key={r} color="red">{r}</Tag>)}
                        </div>
                        <div>
                            <FontAwesomeIcon className="icon" icon={faLevelUpAlt} /> {job.experienceLevel?.map((t) => <Tag key={t} color="green">{t}</Tag>)}
                        </div>
                    </div>
                </div>
            </div>
        </Skeleton>
    </JobCard>
}

Component.defaultProps = {
    hideLogo: false
} as Partial<Props>

export default Component;