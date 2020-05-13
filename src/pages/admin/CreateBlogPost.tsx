import React, { useState } from "react"
import { Form, Input, Button } from "antd"
import HtmlEditor from "../../common/HtmlEditor"
import { post, put } from "../../Utils";
import { ApiResponse } from "../../../models/ApiResponse";
import { toast } from "react-toastify";

const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
};

export default () => {
    const onFinish = (values) => {
        put("/blog", values).then((response: ApiResponse) => {
            toast(response.message);
        })
    }

    return <Form
        name="basic"
        {...layout}
        initialValues={{ remember: true }}
        onFinish={onFinish}>
        <Form.Item
            label="Title"
            name={["blogPost", "title"]}
            rules={[{ required: true, message: 'Cannot be empty!' }]}>
            <Input />
        </Form.Item>
        <Form.Item
            label="Preview"
            name={["blogPost", "preview"]}
            rules={[{ required: true, message: 'Cannot be empty!' }]}>
            <Input.TextArea />
        </Form.Item>
        <Form.Item label="Content"
            name={["blogPost", "content"]}
            rules={[{ required: true, message: 'Cannot be empty!' }]}>
            <HtmlEditor />
        </Form.Item>
        <Form.Item>
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
        </Form.Item>
    </Form>
}