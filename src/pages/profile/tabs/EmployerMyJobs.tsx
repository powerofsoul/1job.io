import React, { useState } from "react"
import { Spin } from "antd"
import { Job } from "../../../../models/Job";
import styled from "styled-components";
import { get } from "../../../Utils";
import { ApiResponse } from "../../../../models/ApiResponse";
import JobCard from '../../../common/JobCard';

const EmployerMyJobs = styled(Spin)`
    text-align: center;
`;

export default () => {
    const [loading, setLoading] = useState(true);
    const [jobs, setJobs] = useState<Job[]>();

    React.useEffect(() => {
        if(loading && !jobs) {
            get("/user/me/jobs").then((response: ApiResponse & {jobs: Job[]}) => {
                if(response.success) {
                    setJobs(response.jobs)
                }  
            }).finally(()=>{
                setLoading(false);
            })
        }
    })

    

    return <EmployerMyJobs tip="Loading" spinning={loading}>
        {!loading && jobs.length == 0 && "No jobs posted yet"}
        {jobs?.map((j, i) => <JobCard to={`/job/${j._id}/applicants`} hideLogo={true} job={j} key={i}/>)}
    </EmployerMyJobs>
}