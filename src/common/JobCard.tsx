import styled from "styled-components";
import colors from "../style/Colors";
import { Button, Tag, Statistic, Skeleton } from "antd";
import CompanyImage from "./CompanyImage";
import { useState } from "react";
import React from "react";
import { HeartOutlined, HeartFilled, HeartTwoTone } from "@ant-design/icons";
import { Job } from "../../models/Job";
import { Link } from "react-router-dom";
import moment from "moment";

const JobCard = styled.div`
    min-height: 5rem;
    border-bottom: 1px solid ${colors.light_dark};

    padding: 1rem;
    display: flex;

    margin-bottom: 1rem;

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
    }

    .job-card-data {
        width: 100%;
    }
`;

const Component = (props?: Partial<Job>) => {
    return <JobCard>
        <Skeleton avatar active loading={props.loading}>
            <CompanyImage src={props.company.companyImage} />
            <div className="job-card-data">
                <div className="header">
                    <h3>{props.company.companyName}</h3>
                    <div className="likes">
                        <Statistic value={0} prefix={false ? <HeartTwoTone twoToneColor={colors.red} /> : <HeartOutlined />} />
                    </div>
                </div>
                <div>
                    {moment(props.postedOn).fromNow()}
                </div>
                <div>
                    <Link to={`/job/${props._id}`}>
                        <h2>{props.title}</h2>
                    </Link>
                </div>
                <div className="footer">
                    <div className="tags">
                        {props.category?.map((t) => <Tag key={t} color="blue">{t}</Tag>)}
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