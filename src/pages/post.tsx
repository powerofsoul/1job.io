import { Form, Input, InputNumber, Button, Select, Radio, Spin } from "antd";
import HtmlEditor from "../common/HtmlEditor";
import styled from "styled-components";
import { JobCategories, JobExeperienceLevels, JobRegions, Job } from "../../models/Job";
import { put, get } from "../Utils";
import { toast } from "react-toastify";
import React, { useState } from "react";
import { useParams, useHistory } from "react-router";
import { User } from "../../models/User";
import { IAppState } from "../redux/configureStore";
import { connect } from "react-redux";
import { CurrentUserStoreType } from "../redux/stores/CurrentUserStore";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
};
const validateMessages = {
    required: '${label} is required!',
    types: {
        number: '${label} is not a valid number!',
        url: '${label} is not a valid url'
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    }
}

const Post = styled.div`
    margin-top: 20px;
`;

const PostPage = (props: CurrentUserStoreType) => {
    const { id } = useParams();
    const [editing, setEditing] = useState(false);
    const [initialValues, setInitialValues] = useState({});
    const [jobLoading, setJobLoading] = useState(true);

    const history = useHistory();

    const getJob = async (id: string) => {
        await get(`/job/${id}`).then((job:Job) => {
            if(props.user._id == job.company._id){
                setInitialValues(job);
                setJobLoading(false);
            } else {
                history.push('/');
            }
        }).catch(() => {
            history.push('/');
        });
    }

    React.useEffect(() => {
        if (id && jobLoading) {
            setEditing(true);
            getJob(id);
        } else {
            setJobLoading(false);
        }
    })
    
    const onFinish = (values) => {
        put("/job", {
            job: {...values,
                _id: id
            }
        }).then(() => {
            toast("Job posted!");
            history.push(`/job/${id}`);
        }).catch(() => {
            toast("Something went wrong!");
        })
    }

    const component = <Form initialValues={initialValues} {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
        <Form.Item name={'title'} label="Title" rules={[{ required: true }]}>
            <Input />
        </Form.Item>
        <Form.Item name={'category'} label="Category" rules={[{ required: true }]}>
            <Select
                placeholder="Select a category"
                allowClear
            >
                {JobCategories.map((c) => <Select.Option value={c} key={c}>{c}</Select.Option>)}
            </Select>
        </Form.Item>
        <Form.Item name={'experienceLevel'} label="Experience Level" rules={[{ required: true }]}>
            <Select
                mode="tags"
                placeholder="Select the required experience level"
                allowClear>
                {JobExeperienceLevels.map((c) => <Select.Option value={c} key={c}>{c}</Select.Option>)}
            </Select>
        </Form.Item>
        <Form.Item name={'regions'} label="Regions" rules={[{ required: true }]}>
            <Select
                mode="tags"
                placeholder="Select the required regions"
                allowClear>
                {JobRegions.map((c) => <Select.Option value={c} key={c}>{c}</Select.Option>)}
            </Select>
        </Form.Item>
        <Form.Item name={'visa'} label="Visa Soponsorship">
            <Radio.Group>
                <Radio value={true}>Yes</Radio>
                <Radio value={false}>No</Radio>
                <Radio value={undefined}>Don't Specify</Radio>
            </Radio.Group>
        </Form.Item>
        <Form.Item name={'description'} label="Job Description" rules={[{ required: true }]}>
            <HtmlEditor />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
                {editing ? "Update" : "Submit"}
            </Button>
        </Form.Item>
    </Form>

    return <Post>
        {(props.loading || jobLoading) ? <Spin spinning size="large" /> : component}
    </Post>
}

export default connect((store: IAppState) => store.currentUserStore)(PostPage);