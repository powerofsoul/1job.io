import React from "react"
import { Form, Spin, Select, Input, Radio, Button } from "antd"
import { JobTypes, JobExeperienceLevels, JobCategories, JobRegions } from "../../../models/Job"
import { FormInstance } from "antd/lib/form";
import HtmlEditor from "../../common/HtmlEditor";
import ArrayFormItem from "../profile/tabs/fields/ArrayFormItem";

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};
const validateMessages = {
    required: '${label} is required!',
    types: {
        number: '${label} is not a valid number!',
        url: '${label} is not a valid url'
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
    string: {
        max: '${label} cannot be longer than ${max} characters'
    }
}

interface Props {
    form: FormInstance,
    onFinish: (values) => void;
    jobLoading?: boolean;
    initialValues?: any,
    nextButtonText?: string
}

export default (props: Props) => {
    return <Form form={props.form} initialValues={props.initialValues} {...layout} name="nest-messages" onFinish={props.onFinish} validateMessages={validateMessages}>
        <Spin spinning={props.jobLoading || false} tip="Loading...">
            <Form.Item name={'title'} label="Title" rules={[{ required: true, max: 100 }]}>
                <Input />
            </Form.Item>
            <Form.Item name={'type'} label="Type" rules={[{ required: true }]}>
                <Select
                    placeholder="Select the job type"
                    allowClear
                >
                    {JobTypes.map((c) => <Select.Option value={c} key={c}>{c}</Select.Option>)}
                </Select>
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
            <Form.Item name={'applyOn'} label="Apply On" rules={[{ type: "url" }]}>
                <Input placeholder="https://" />
            </Form.Item>
            <ArrayFormItem name="questions"
                label="Questions"
                addButtonText="Add question"
                emptyFieldError="Please input a question or delete this field."
                wrapperCol={{ ...layout.wrapperCol }}
                noLabelWrapperCol={{ ...layout.wrapperCol, offset: 4 }} />
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
                <small>*Questions are only available if the user will apply using 1job</small>
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }} style={{textAlign: "center"}}>
                <Button type="primary" htmlType="submit">
                    {props.nextButtonText ?? "Next"}
                </Button>
            </Form.Item>
        </Spin>
    </Form>
}