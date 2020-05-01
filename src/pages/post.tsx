import { Form, Input, InputNumber, Button, Select, Radio } from "antd";
import HtmlEditor from "../common/HtmlEditor";
import styled from "styled-components";
import { JobCategories, JobExeperienceLevels, JobRegions } from "../../models/Job";
import { post } from "../Utils";
import { toast } from "react-toastify";
import React from "react";

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

export default () => {
    const onFinish = (values) => {
        post("/job/create", {
            job: values
        }).then(() => {
            toast("Job posted!");
        }).catch(() => {
            toast("Something went wrong!");
        })
    }

    return <Post>
        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
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
                    Submit
            </Button>
            </Form.Item>
        </Form>
    </Post>
}