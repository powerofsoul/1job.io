import { Form, Input, Select, DatePicker } from "antd";
import React from "react";
import moment from 'moment';
import ArrayFormItem from "../ArrayFormItem";
import styled from "styled-components";

const { RangePicker } = DatePicker;

export default (field) => <Form.Item {...field}>
    <Form.Item
        name={[field.name, 'name']}
        rules={[{ required: true, message: 'Name is required' }]}
    >
        <Input placeholder="Name" />
    </Form.Item>
    <Form.Item
        name={[field.name, 'link']}
        rules={[{  type: "url", message: "Invalid url" }]}
    >
        <Input placeholder="http://.." />
    </Form.Item>
    <Form.Item
        name={[field.name, 'period']}
        rules={[{ type: 'array', required: true,  message: 'Period is required'  }]}>
        <RangePicker style={{width: "100%"}} picker="month" />
    </Form.Item>
    <Form.Item
        name={[field.name, 'description']}
        rules={[{ required: true, message: 'Institution is required' }]}
    >
        <Input placeholder="Description..." />
    </Form.Item>
</Form.Item>