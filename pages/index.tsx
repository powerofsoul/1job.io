import styled from 'styled-components';
import colors from '../src/style/Colors';
import Typist from 'react-typist';
import TypistLoop from "react-typist-loop";
import { Button } from 'antd';
import { FormOutlined } from "@ant-design/icons";
import Link from '../src/common/Link';
import JobCard from '../src/common/JobCard';
import DeviceSize from '../src/style/DeviceSize';
import { setTimeout } from 'timers';
import { useState } from 'react';

const IndexTop = styled.div`
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;

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

    ${DeviceSize.lg} {
        padding-right: 15rem;
        padding-left: 15rem;
    }
`;

const defaultJob = () => ({
    title: "Senior software engineer",
    company: "Florin SRL",
    featured: true,
    companyImage: "https://assetstorev1-prd-cdn.unity3d.com/key-image/a6a520a3-bb2a-4433-9643-a157d069247c.jpg",
    postedOn: new Date(),
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    tags: [
        "C#",
        "Java",
        "Javascript"
    ],
    likes: Math.floor(Math.random() * 1000),
    loading: false
}) as any;


const index = () => {
    const [jobs, setJobs] = useState([defaultJob()]);

 
    const loadMoreJobs = () =>  {
 
        setJobs([
            ...jobs,
            ...[{loading: true}, {loading: true}]
        ]);
        setTimeout(() => {
            setJobs(
                [...jobs.filter((j) => !j.loading), 
                 ...[defaultJob(), defaultJob()]
                ]);
        }, 3000);
    }
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
                <Link href="/post">
                    <Button type="primary" icon={<FormOutlined />} size='large'>
                        Post a job now!
                    </Button>
                </Link>
            </div>
        </IndexTop>
        <IndexBody>
            {jobs.map((j, i) => <JobCard key={i} {...j} />)}
            <Button onClick={loadMoreJobs}>Load More</Button>
        </IndexBody>
    </div>
}

export default index;