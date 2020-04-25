import styled from "styled-components";
import colors from "../style/Colors";
import { Button, Tag, Statistic, Skeleton } from "antd";
import CompanyImage from "./CompanyImage";
import { useState } from "react";
import React from "react";
import { HeartOutlined } from "@ant-design/icons";

interface Props {
    loading: boolean;
    title: string;
    company: string;
    companyImage: string;
    featured: boolean;
    postedOn: Date;
    description: string;
    tags: string[];
    likes: number;
}

const JobCard = styled.div`
    min-height: 5rem;
    border-bottom: 1px solid ${colors.green};

    padding: 1rem;
    display:flex;

    margin-bottom: 1rem;

    .tags {
        margin-top: 1rem;
    }

    .footer {
        display: flex;
        align-items:center;

        .likes {
            margin-left:auto;
        }
    }
`;

const Component = (props?: Partial<Props>) => {
    const [showMoreDescription, setShowMoreDescription] = useState(false);
    const hasBigDescription = props.description?.length > 255;

    React.useEffect(() => {
        if (!hasBigDescription) {
            setShowMoreDescription(true);
        }
    })

    return <JobCard>
        <Skeleton avatar loading={props.loading}>
            <CompanyImage src={props.companyImage} />
            <div>
                <div>
                    <h3>{props.company}</h3>
                </div>
                <div>
                    <h2>{props.title}</h2>
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
                        {props.tags?.map((t) => <Tag key={t} color="magenta">{t}</Tag>)}
                    </div>
                    <div className="likes">
                        <Statistic value={props.likes} prefix={<HeartOutlined />} />
                    </div>
                </div>
            </div>
        </Skeleton>
    </JobCard>
}

export default Component;