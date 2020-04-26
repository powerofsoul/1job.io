import styled from "styled-components";
import colors from "../style/Colors";
import { Button, Tag, Statistic, Skeleton } from "antd";
import CompanyImage from "./CompanyImage";
import { useState } from "react";
import React from "react";
import { HeartOutlined, HeartFilled, HeartTwoTone } from "@ant-design/icons";
import { Job } from "../models/Job";

const JobCard = styled.div`
    min-height: 5rem;
    border-bottom: 1px solid ${colors.green};

    padding: 1rem;
    display:flex;

    margin-bottom: 1rem;

    .header {
        display: flex;
        align-items:center;

        .likes {
            margin-left:auto;
            cursor: pointer;
        }
    }

    .footer {
        margin-top: 1rem;
        
        display: flex;
        align-items: center;

        .location {
            margin-left: auto;
        }
    }
`;

const Component = (props?: Partial<Job>) => {
    const [showMoreDescription, setShowMoreDescription] = useState(false);
    const hasBigDescription = props.description?.length > 255;

    return <JobCard>
        <Skeleton avatar active loading={props.loading}>
            <CompanyImage src={props.companyImage} />
            <div>
                <div>
                    <h3>{props.company}</h3>
                </div>
                <div className="header">
                    <div>
                        <h2>{props.title}</h2>
                    </div>
                    <div className="likes">
                        <Statistic value={props.likes} prefix={props.liked ? <HeartTwoTone twoToneColor={colors.red} /> : <HeartOutlined />} />
                    </div>
                </div>
                <div>
                    <h3>{showMoreDescription ? props.description : props.description?.substr(0, 255) + "..."}</h3>
                </div>
                {
                    hasBigDescription && <Button type="default" onClick={() => setShowMoreDescription(!showMoreDescription)}>
                        {!showMoreDescription ? "Show More" : "Show Less"}
                    </Button>
                }

                <div className="footer">
                    <div className="tags">
                        {props.tags?.map((t) => <Tag key={t} color="blue">{t}</Tag>)}
                    </div>
                    <div className="location">
                        {props.location?.trim() != '' && <span>
                            <Tag color="volcano">{props.location}</Tag>
                        </span>}
                    </div>
                </div>
            </div>
        </Skeleton>
    </JobCard>
}

export default Component;