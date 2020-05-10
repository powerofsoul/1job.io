import { Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";
import { bindActionCreators } from "redux";
import { ApiResponse } from "../../models/ApiResponse";
import { Employee } from "../../models/Employee";
import { Job } from "../../models/Job";
import PageCardContainer from "../common/PageCardContainer";
import { IAppState } from "../redux/configureStore";
import CurrentUserStore from "../redux/stores/CurrentUserStore";
import Space from "../style/Space";
import { get, post } from "../Utils";

interface Props {
    loading: boolean;
    user?: Employee;
    refreshCurrentUser: () => void;
}

const layout = {
    labelCol: { span: 6 },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
    },
};

const JobApplyPage = (props: Props) => {
    const [fetchingJob, setFetchingJob] = useState(false);
    const history = useHistory();
    const [job, setJob] = useState<Job>();
    const { id } = useParams();

    const tabProps = {
        loading: props.loading,
        layout,
        setLoading: (value) => { },
        onFinish: (values) => {
            console.log(values)
        }
    }

    const fetch = () => {
        setFetchingJob(true);
        get(`/job/${id}`).then((j: Job) => {
            setJob(j);
        }).catch(() => {
            history.push("/");
        });
    }

    useEffect(() => {
        if (!fetchingJob) {
            fetch();
        }
    })

    const onFinish = (values) => {
        post(`/job/${id}/apply`, {
            coverLetter: values.coverLetter,
            answers: job.questions.map((q, i) => ({
                question: q,
                answer: values.questions[i]
            }))
        }).then((response: ApiResponse) => {
            if (response.success) {
                toast("You applied succesfully.", {
                    type: "success"
                })

                history.push("/");
                props.refreshCurrentUser();
            } else {
                toast("Something went wrong. Please try again soon.", {
                    type: "error"
                })
            }
        })
    }

    return <PageCardContainer>
        <Form onFinish={onFinish} wrapperCol={{ span: 24 }} labelCol={{ span: 24 }}>
            <h3 className="title">Applying for {job?.title} at {job?.company.companyName}</h3>
            {job?.questions.map((q, i) => <Form.Item label={q} name={["questions", i]} rules={[{ required: true, message: "Question is required" }]}>
                <Input.TextArea />
            </Form.Item>)}
            <Form.Item label="Cover Letter" name="coverLetter">
                <Input.TextArea style={{ minHeight: "150px" }} />
            </Form.Item>
            <Button type="primary" style={{ marginTop: Space.sm }} htmlType="submit">
                Apply
                    </Button>
        </Form>
    </PageCardContainer>
}

export default connect((store: IAppState): Partial<Props> => ({
    user: store.currentUserStore.user as Employee,
    loading: store.currentUserStore.loading,
}),
    (dispatch) => bindActionCreators(CurrentUserStore.actionCreators, dispatch))
    (JobApplyPage);