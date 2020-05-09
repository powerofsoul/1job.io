import { Form, Input, Select, DatePicker } from "antd";
import React from "react";
import moment from 'moment';
import ArrayFormItem from "../ArrayFormItem";
import styled from "styled-components";

const { RangePicker } = DatePicker;

const Courses = styled(ArrayFormItem)`
    .main-item .ant-form-item-control-input-content {
        display: flex;
    }
`;

export default (field) => <Form.Item {...field}>
    <Form.Item
        name={[field.name, 'study']}
        rules={[{ required: true, message: 'Title is required' }]}
    >
        <Input placeholder="Study Program" />
    </Form.Item>
    <Form.Item
        name={[field.name, 'institution']}
        rules={[{ required: true, message: 'Institution is required' }]}
    >
        <Input placeholder="Institution/Place of Education..." />
    </Form.Item>
    <Form.Item
        name={[field.name, 'period']}
        rules={[{ type: 'array', required: true,  message: 'Period is required'  }]}>
        <RangePicker picker="month" />
    </Form.Item>
    <Courses 
            label="Courses"
            name={[field.name, "courses"]}
            addButtonText="Add course"
            className="courses"
            emptyFieldError="Please input a skill name or delete this field."
    />
</Form.Item>