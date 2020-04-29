import { Form, Input, InputNumber, Button, Select } from "antd";
import HtmlEditor from "../common/HtmlEditor";
import styled from "styled-components";
import { JobCategories, JobExeperienceLevels } from "../../models/Job";
import { post } from "../Utils";
import { toast } from "react-toastify";
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
        post("/api/job/create", {
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
                    {JobCategories.map((c)=><Select.Option value={c} key={c}>{c}</Select.Option>)}
                </Select>
            </Form.Item>
            <Form.Item name={'experienceLevel'} label="Experience Level" rules={[{ required: true }]}>
                <Select
                    placeholder="Select a category"
                    allowClear>
                    {JobExeperienceLevels.map((c)=><Select.Option value={c} key={c}>{c}</Select.Option>)}
                </Select>
            </Form.Item>
            <Form.Item name={'description'} label="Job Description">
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