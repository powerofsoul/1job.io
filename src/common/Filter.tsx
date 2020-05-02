import { Row, Col, Select, Button, Input, Form } from "antd";
import styled from "styled-components";
import { ReloadOutlined } from "@ant-design/icons/lib/icons";
import Search from "antd/lib/input/Search";
import React, { useState } from "react";
import { JobExeperienceLevels, JobCategories, JobRegions, Job, JobCategoriesType, JobExeperienceLevelsType, JobRegionsType, JobTypes } from "../../models/Job";

const FilterArea = styled(Form)`
    width: 100%;

    .container {
        width: 100%;
    }
`;

interface Props {
    onReload?: () => void;
    onSearch?: (searchArgs: Partial<Job>) => void;
}

const Filter = (props: Props) => {
    const filter = (values) => {
        props.onSearch(values)
    }

    return <FilterArea name="filter" layout="inline" onFinish={filter}>
        <Row gutter={[0, 12]} className="container">
            <Col xs={12} lg={4}>
                <Form.Item name="title">
                    <Input
                        allowClear
                        placeholder="Job Title"
                        style={{ width: '100%' }}
                    />
                </Form.Item>
            </Col>
            <Col xs={12} lg={4}>
                <Form.Item name="category">
                    <Select
                        allowClear
                        mode="tags"
                        size="middle"
                        options={JobCategories.map(e => ({ value: e }))}
                        placeholder="Select Category"
                        style={{ width: '100%' }}
                    />
                </Form.Item>
            </Col>
            <Col xs={12} lg={4}>
                <Form.Item name="type">
                    <Select
                        allowClear
                        mode="tags"
                        size="middle"
                        options={JobTypes.map(e => ({ value: e }))}
                        placeholder="Job Type"
                        style={{ width: '100%' }}
                    />
                </Form.Item>
            </Col>
            <Col xs={12} lg={4}>
                <Form.Item name="regions">
                    <Select
                        allowClear
                        mode="tags"
                        size="middle"
                        options={JobRegions.map(e => ({ value: e }))}
                        placeholder="Select Region"
                        style={{ width: '100%' }}
                    />
                </Form.Item>
            </Col>
            <Col xs={12} lg={4}>
                <Form.Item name="experienceLevel">
                    <Select
                        allowClear
                        mode="tags"
                        size="middle"
                        options={JobExeperienceLevels.map(e => ({ value: e }))}
                        placeholder="Experience level"
                        style={{ width: '100%' }}
                    />
                </Form.Item>
            </Col>
            <Col style={{ textAlign: "center" }}>
                <Button
                    type="primary"
                    htmlType="submit">
                    Search
                </Button>
            </Col>
            <Col flex="auto" style={{ textAlign: "right" }}>
                <h2>
                    <ReloadOutlined className="reload-icon" title="Reload" onClick={props.onReload} />
                </h2>
            </Col>

        </Row>
    </FilterArea>
}

Filter.defaultProps = {
    onReload: () => { },
    onSearch: (searchArgs: Partial<Job>) => { }
} as Props;

export default Filter;