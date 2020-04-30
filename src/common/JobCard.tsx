import styled from "styled-components";
import colors from "../style/Colors";
import { Button, Tag, Statistic, Skeleton, Avatar } from "antd";
import { useState } from "react";
import React from "react";
import { HeartOutlined, HeartFilled, HeartTwoTone } from "@ant-design/icons";
import { Job } from "../../models/Job";
import { Link } from "react-router-dom";
import moment from "moment";
import { useHistory } from "react-router";
import Space from "../style/Space";

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
        display: flex;
        align-items:center;
        width: 100%;

        .likes {
            margin-left:auto;
            cursor: pointer;
        }

        .location {
            margin-left: auto;
        }
    }

    .footer {
        margin-top: 1rem;

        .tags > div {
            margin-bottom: 0.5rem;
        }
    }

    .job-card-data {
        width: 100%;
    }

    .avatar {
        height: 100%;
        width: 100px;
        margin-right: ${Space.sm};
    }
`;

const Component = (props?: Partial<Job>) => {
    const history = useHistory();
    const goToJobPage = () => {
        history.push(`/job/${props._id}`);
    }

    return <JobCard onClick={goToJobPage}>
            <Skeleton avatar active loading={props.loading}>
                <Avatar className="avatar" shape="square" src={props.company.companyImage} />
                <div className="job-card-data">
                    <div className="header">
                        <div>
                            {moment(props.postedOn).fromNow()}
                        </div>
                    </div>
                    <div>
                        <h2>{props.title}</h2>
                        <h4>{props.company.companyName}</h4>
                    </div>
                    <div className="footer">
                        <div className="tags">
                            <div>
                                <Tag color="blue">{props.category}</Tag>
                            </div>
                            <div>
                                {props.regions?.map((r) => <Tag key={r} color="red">{r}</Tag>)}
                            </div>
                        </div>
                        <div className="location">
                            {props.experienceLevel?.map((t) => <Tag key={t} color="green">{t}</Tag>)}
                        </div>
                    </div>
                </div>
            </Skeleton>
        </JobCard>
}

export default Component;