import { Row, Col, Select, Button } from "antd";
import styled from "styled-components";
import { ReloadOutlined } from "@ant-design/icons/lib/icons";
import Search from "antd/lib/input/Search";
import React from "react";

const FilterArea = styled.div`
    width: 100%;
`;

interface Props {
    onReload?: () => void;
    onSearch?: (searchArgs: any) => void//TODO change type from any
}

const Filter = (props: Props) => <FilterArea>
    <Row gutter={[12, 12]}>
        <Col xs={12} lg={6}>
            <Search
                placeholder="Job Title"
                onSearch={value => console.log(value)}
            />
        </Col>
        <Col xs={12} lg={3}>
            <Select
                mode="tags"
                size="middle"
                options={[{ value: "C#" }, { value: "Java" }, { value: "JS" }, { value: "Typescript" }]}
                placeholder="Select Category"
                style={{ width: '100%' }}
            />
        </Col>
        <Col xs={12} lg={3}>
            <Select
                mode="tags"
                size="middle"
                options={[{ value: "WorldWide" }, { value: "USA" }, { value: "Europe" }, { value: "Asia" }]}
                placeholder="Select Region"
                style={{ width: '100%' }}
            />
        </Col>
        <Col xs={12} lg={3}>
            <Select
                mode="tags"
                size="middle"
                options={[{ value: "Junior" }, { value: "Middle" }, { value: "Senior" }, { value: "Lead" }]}
                placeholder="Experience level"
                style={{ width: '100%' }}
            />
        </Col>
        <Col xs={12} lg={3}>
            <Select
                size="middle"
                options={[{ value: "Yes" }, { value: "No" }]}
                placeholder="Visa Sponsorship"
                style={{ width: '100%' }}
            />
        </Col>
        <Col flex="auto" style={{ textAlign: "right" }}>
            <h2>
                <ReloadOutlined className="reload-icon" title="Reload" onClick={props.onReload} />
            </h2>
        </Col>
    </Row>
    <Row>
        <Col xs={24} style={{ textAlign: "center" }}>
            <Button onClick={props.onSearch} type="primary">Search</Button>
        </Col>
    </Row>
</FilterArea>

Filter.defaultProps = {
    onReload: () => {},
    onSearch: () => {}
} as Props;

export default Filter;