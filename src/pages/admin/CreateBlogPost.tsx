import React, { useState } from "react"
import { Form, Input, Button, Select } from "antd"
import HtmlEditor from "../../common/HtmlEditor"
import { post, put, get } from "../../Utils";
import { ApiResponse } from "../../../models/ApiResponse";
import { toast } from "react-toastify";
import { BlogPost } from "../../../models/BlogPost";
import { useForm } from "antd/lib/form/util";
import FormItem from "antd/lib/form/FormItem";

const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
};

export default () => {
    const [blogs, setBlogs] = useState<BlogPost[]>();
    const [selectedBlog, setSelectedBlog] = useState<BlogPost>();
    const [form] = useForm();

    React.useEffect(() => {
        get("/blog").then((blogs: BlogPost[]) => {
            setBlogs(blogs);
        })
    }, []);

    React.useEffect(()=>{
        form.resetFields();
    }, [selectedBlog])

    const onFinish = (values) => {
        values.blogPost._id = selectedBlog?._id;

        put("/blog", values).then((response: ApiResponse) => {
            toast(response.message);
        })
    }

    const changeSelectedBlog = (title: string) => {
        const blog = blogs?.find((b) => b.title == title);
        setSelectedBlog(blog);
    }

    return <>
        <Select
            placeholder="Select a blog"
            onChange={changeSelectedBlog}
        >
            <Select.Option value="">New</Select.Option>
            {blogs?.map((b) => <Select.Option key={b.title} value={b.title}>{b.title}</Select.Option>)}
        </Select>
        <Form
            name="basic"
            form={form}
            {...layout}
            initialValues={{blogPost: selectedBlog}}
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
    </>
}