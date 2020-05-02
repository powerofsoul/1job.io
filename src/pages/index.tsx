import { FormOutlined } from "@ant-design/icons";
import { Button, Skeleton } from 'antd';
import React, { useState } from "react";
import Typist from 'react-typist';
import TypistLoop from "react-typist-loop";
import styled from 'styled-components';
import { Job } from "../../models/Job";
import Filter from "../common/Filter";
import JobCard from '../common/JobCard';
import { Link } from "react-router-dom";
import colors from '../style/Colors';
import DeviceSize from '../style/DeviceSize';
import { get, post } from "../Utils";

const IndexTop = styled.div`
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
    box-shadow: -6px 5px 6px 2px rgba(0,0,0,0.5);
    
    @keyframes gradient {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }

    height: 300px;
    background-color: ${colors.green};
    display: flex;
    align-items: center;

    h1, h2 {
        color: ${colors.light};
    }

    .content {
        margin-left: auto;
        margin-right: auto;
        text-align: center;
    }
`;

const IndexBody = styled.div`
    margin-top: 1rem;
    margin-bottom: 1rem;
    ${DeviceSize.xl} {
        padding-right: 15rem;
        padding-left: 15rem;
    }

    .load-more {
       text-align:center;
    }
`;

export default () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);

    const fetch = async () => {
        const jobs: Job[] = await get("/job/all");
        setLoading(false);
        setJobs(jobs);
    }

    const filter = async (query) => {
        const jobs: Job[] = await post("/job/filter", { query });
        setLoading(false);
        setJobs(jobs);
    }

    React.useEffect(() => {
        if (loading) {
            fetch();
        }
    }, [])

    return <div>
        <IndexTop>
            <div className="content">
                <h1>Best place to get your career running.</h1>
                <h2>
                    <TypistLoop interval={3000}>
                        {[
                            'Remote jobs for everyone.',
                            'Updated daily.',
                            'Boost your career now!',
                            'Always fresh!'
                        ].map(text => <Typist key={text} startDelay={1000}>{text}</Typist>)}
                    </TypistLoop>
                </h2>
                <Link to="/post">
                    <Button type="primary" icon={<FormOutlined />} size='large'>
                        Post a job now!
                    </Button>
                </Link>
            </div>
        </IndexTop>
        <IndexBody>
            <Filter onReload={fetch} onSearch={filter} />
            <Skeleton avatar loading={loading} active>
                {jobs.length > 0 ?
                    jobs?.map((j, i) => <JobCard key={i} {...j} />)
                    : <span>No Jobs Found</span>
                }
            </Skeleton>
        </IndexBody>
    </div>
}
