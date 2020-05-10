import React, { useState, useEffect } from "react"
import { Row, Col, Collapse, Input, Button, Form } from "antd"
import styled from "styled-components"
import { HoverableCard } from "../style/CommonStyles";
import Space from "../style/Space";
import { Employee } from "../../models/Employee";
import { IAppState } from "../redux/configureStore";
import { connect } from "react-redux";
import EmployeeProfileTab from "./profile/tabs/EmployeeProfileTab";
import { get, post } from "../Utils";
import { Job } from "../../models/Job";
import { useHistory, useParams } from "react-router";
import { response } from "express";
import { ApiResponse } from "../../models/ApiResponse";
import { toast } from "react-toastify";
import { bindActionCreators } from "redux";
import CurrentUserStore from "../redux/stores/CurrentUserStore";
const { Panel } = Collapse;

const JobApplyStyled = styled.div`
    margin-top: ${Space.sm};
    margin-bottom: ${Space.sm};
    ${HoverableCard}

    .title {
        text-align: center;
    }
`;

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
            coverLetter: values.coverLetter
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

    return <Row justify="center">
        <Col xs={21} lg={12}>
            <JobApplyStyled>
                <Form onFinish={onFinish} wrapperCol={{ span: 24 }} labelCol={{ span: 24 }}>
                    <h3 className="title">Applying for {job?.title} at {job?.company.companyName}</h3>
                    <Form.Item label="Cover Letter" name="coverLetter">
                        <Input.TextArea style={{ minHeight: "150px" }} />
                    </Form.Item>

                    <Button type="primary" style={{ marginTop: Space.sm }} htmlType="submit">
                        Apply
                    </Button>
                </Form>
            </JobApplyStyled>
        </Col>
    </Row>
}

export default connect((store: IAppState): Partial<Props> => ({
    user: store.currentUserStore.user as Employee,
    loading: store.currentUserStore.loading,
}),
    (dispatch) => bindActionCreators(CurrentUserStore.actionCreators, dispatch))
(JobApplyPage);