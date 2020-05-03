import React, { useState } from "react";
import { Skeleton } from "antd";
import { Job } from "../../models/Job";
import { get } from "../Utils";
import JobCard from "./JobCard";

interface Props {
    companyId: string,
    className?: string
}

export default (props: Props) => {
    const [loading, setLoading] = useState(true);
    const [jobs, setJobs] = useState<Job[]>();

    React.useEffect(()=>{
        if(loading) {
            get(`/job/user/${props.companyId}/`).then((response: {jobs: Job[]}) => {
                setJobs(response.jobs);
                setLoading(false);
            })
        }
    })

    return <Skeleton loading={loading}>
        <div className={props.className}>
            {jobs?.map((j) => <JobCard hideLogo={true} key={j._id} job={j} />)}
        </div>
    </Skeleton>
}