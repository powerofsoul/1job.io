import { Form, Input, InputNumber, Button, Select, Radio, Spin, Steps, Row, Col } from "antd";
import HtmlEditor from "../../common/HtmlEditor";
import styled from "styled-components";
import { JobCategories, JobExeperienceLevels, JobRegions, Job, JobTypes } from "../../../models/Job";
import { put, get } from "../../Utils";
import { toast } from "react-toastify";
import React, { useState } from "react";
import { useParams, useHistory } from "react-router";
import { User } from "../../../models/User";
import { IAppState } from "../../redux/configureStore";
import { connect } from "react-redux";
import { CurrentUserStoreType } from "../../redux/stores/CurrentUserStore";
import { UserOutlined, LoadingOutlined, SolutionOutlined, PayCircleOutlined } from "@ant-design/icons";
import Space from "../../style/Space";
import CreateStep from "./CreateStep";
import PayStep from "./PayStep";
import FinishStep from "./FinishStep";
import { ApiResponse } from "../../../models/ApiResponse";
import PageCardContainer from "../../common/PageCardContainer";
const { Step } = Steps;

const Post = styled(Row)`
    margin-top: ${Space.md};

    .steps {
        margin-bottom: ${Space.md};
    }
`;

const PostPage = (props: CurrentUserStoreType) => {
    const { id } = useParams();
    const [step, setStep] = useState(0);
    const [createStepValues, setCreateStepValues] = useState({});
    const [jobHref, setJobHref] = useState("");
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();


    const sendRequest = (token: any) => {
        setLoading(true);
        put("/job", {
            job: createStepValues,
            token,
            _id: id
        }).then((response: ApiResponse) => {
            toast(response.message, {
                type: response.success ? "success" : "error"
            });
            setJobHref(`/job/${response.job._id}`);
            setStep(2);
        }).catch(() => {
            toast("Something went wrong!");
        }).finally(() => {
            setLoading(false);
        })
    }

    const steps = [
        {
            title: 'Create',
            content: <CreateStep form={form} initialValues={createStepValues} onFinish={(values) => {
                setCreateStepValues(values)
                setStep(1)
            }} />,
        },
        {
            title: 'Pay',
            content: <PayStep setLoading={setLoading} onFinish={(token) => sendRequest(token)} />,
        },
        {
            title: 'Finish',
            content: <FinishStep jobHref={jobHref} />,
        },
    ];

    return <PageCardContainer>
        <Spin spinning={loading} tip="Loading...">
            <Steps className="steps" current={step}>
                {steps.map(item => (
                    <Step key={item.title} title={item.title} />
                ))}
            </Steps>
            <div>{steps[step].content}</div>
        </Spin>
    </PageCardContainer>
}

export default connect((store: IAppState) => store.currentUserStore)(PostPage);