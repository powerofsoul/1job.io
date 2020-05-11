import { Form, Input, InputNumber, Button, Select, Radio, Spin, Steps, Row, Col } from "antd";
import HtmlEditor from "../../common/HtmlEditor";
import styled from "styled-components";
import { JobCategories, JobExeperienceLevels, JobRegions, Job, JobTypes } from "../../../models/Job";
import { put, get, post } from "../../Utils";
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

const Post = styled(PageCardContainer)`
    .steps {
        margin-bottom: ${Space.md};
    }
`;
export type PaymentIntentResponse = ApiResponse & { secret?: string };

const PostPage = (props: CurrentUserStoreType) => {
    const { id } = useParams();
    const [step, setStep] = useState(0);
    const [createStepValues, setCreateStepValues] = useState({});
    const [jobHref, setJobHref] = useState("");
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const [canSwitchTabs, setCanSwitchTabs] = useState(true);


    const [paymentIntent, setPaymentIntent] = useState<PaymentIntentResponse>({
        success: false
    });

    React.useEffect(() => {
        if (!paymentIntent.success) {
            post("/payment/createIntent").then((response: PaymentIntentResponse) => {
                setPaymentIntent(response)
            });
        }
    }, [])

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
            setCanSwitchTabs(false);
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
                setCreateStepValues(values);
                setStep(1);
                setCanSwitchTabs(false);
            }} />,
            disabled: canSwitchTabs
        },
        {
            title: 'Pay',
            content: <PayStep setLoading={setLoading} onFinish={(token) => sendRequest(token)} paymentIntent={paymentIntent}/>,
            disabled: canSwitchTabs
        },
        {
            title: 'Finish',
            content: <FinishStep jobHref={jobHref} />,
            disabled: true
        },
    ];

    return <Post>
        <Spin spinning={loading} tip="Loading...">
            <Steps className="steps" current={step} onChange={setStep}>
                {steps.map(item => (
                    <Step key={item.title} title={item.title} status="wait" disabled={item.disabled} />
                ))}
            </Steps>
            <div>{steps[step].content}</div>
        </Spin>
    </Post>
}

export default connect((store: IAppState) => store.currentUserStore)(PostPage);