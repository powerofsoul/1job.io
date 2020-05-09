import { Form, Input, Select, DatePicker } from "antd";
import React from "react";
import moment from 'moment';

const { RangePicker } = DatePicker;

export default (field) => <Form.Item {...field}>
    <Form.Item
        name={[field.name, 'title']}
        rules={[{ required: true, message: 'Title is required' }]}
    >
        <Input placeholder="Title..." />
    </Form.Item>
    <Form.Item
        name={[field.name, 'companyName']}
        rules={[{ required: true, message: 'Company Name is required' }]}
    >
        <Input placeholder="Company Name..." />
    </Form.Item>
    <Form.Item
        name={[field.name, 'period']}
        rules={[{ type: 'array', required: true,  message: 'Period is required'  }]}>
        <RangePicker picker="month" />
    </Form.Item>
    <Form.Item
        name={[field.name, 'description']}
    >
        <Input.TextArea placeholder="What you did here" />
    </Form.Item>
</Form.Item>