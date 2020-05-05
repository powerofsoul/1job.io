import styled from "styled-components";
import React, { useState } from "react";
import CreateStep from "./CreateStep";
import { Job } from "../../../models/Job";
import { get, put } from "../../Utils";
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";
import { IAppState } from "../../redux/configureStore";
import { User } from "../../../models/User";
import { connect } from "react-redux";
import Space from "../../style/Space";
import { useForm } from "antd/lib/form/Form";
import { Row, Col } from "antd";

const Edit = styled.div`
    margin-top: ${Space.md};
`;

interface Props {
    user: User;
}

const EditJobPage = (props: Props) => {
    const [initialValues, setInitialValues] = useState<Job>();
    const [loading, setLoading] = useState(true)
    const [jobLoading, setJobLoading] = useState(false);
    const [form] = useForm();
    const history = useHistory();
    const { id } = useParams();

    const getJob = async (id: string) => {
        await get(`/job/${id}`).then((job: Job) => {
            if (props.user._id == job.company._id) {
                setInitialValues(job);
                form.resetFields();
                setLoading(false);
            } else {
                history.push('/');
            }
        }).catch(() => {
            history.push('/');
        });
    }

    React.useEffect(() => {
        if (id && !jobLoading) {
            setJobLoading(true);
            setLoading(true);
            getJob(id);
        } else {
            setLoading(false);
        }
    })

    const onFinish = (values) => {
        put("/job", {
            job: {
                ...values,
                _id: id
            }
        }).then(() => {
            toast("Job updated!", {
                type: "success"
            });
            history.push(`/job/${id}`);
        }).catch(() => {
            toast("Something went wrong!");
        })
    }

    return <Edit>
        <Row justify="center">
            <Col md={12}>
                <CreateStep nextButtonText="Update" form={form} jobLoading={loading} onFinish={onFinish} initialValues={initialValues} />
            </Col>
        </Row>
    </Edit>
}

export default connect((store: IAppState): Partial<Props> => ({
    user: store.currentUserStore.user
}))(EditJobPage);