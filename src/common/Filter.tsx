import { Row, Col, Select, Button, Input } from "antd";
import styled from "styled-components";
import { ReloadOutlined } from "@ant-design/icons/lib/icons";
import Search from "antd/lib/input/Search";
import React, { useState } from "react";
import { JobExeperienceLevels, JobCategories, JobRegions, Job, JobCategoriesType, JobExeperienceLevelsType, JobRegionsType } from "../../models/Job";

const FilterArea = styled.div`
    width: 100%;
`;

interface Props {
    onReload?: () => void;
    onSearch?: (searchArgs: Partial<Job>) => void;
}

const Filter = (props: Props) => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState<JobCategoriesType | undefined>();
    const [regions, setRegions] = useState([]);
    const [experienceLevel, setExperienceLevel] = useState<JobExeperienceLevelsType[] | undefined>();

    const filter = () => {
        props.onSearch({
            title, category, regions, experienceLevel
        })
    }

    return <FilterArea>
        <Row gutter={[12, 12]}>
            <Col xs={12} lg={6}>
                <Input
                    allowClear
                    placeholder="Job Title"
                    onChange={(e) => setTitle(e.target.value)}
                />
            </Col>
            <Col xs={12} lg={3}>
                <Select
                    allowClear
                    mode="tags"
                    size="middle"
                    options={JobCategories.map(e => ({ value: e }))}
                    placeholder="Select Category"
                    onChange={(o) => setCategory(o as JobCategoriesType)}
                    style={{ width: '100%' }}
                />
            </Col>
            <Col xs={12} lg={3}>
                <Select
                    allowClear
                    mode="tags"
                    size="middle"
                    options={JobRegions.map(e => ({ value: e }))}
                    placeholder="Select Region"
                    onChange={(o) => setRegions(o as JobRegionsType[])}
                    style={{ width: '100%' }}
                />
            </Col>
            <Col xs={12} lg={3}>
                <Select
                    allowClear
                    mode="tags"
                    size="middle"
                    options={JobExeperienceLevels.map(e => ({ value: e }))}
                    placeholder="Experience level"
                    onChange={(o) => setExperienceLevel(o as JobExeperienceLevelsType[])}
                    style={{ width: '100%' }}
                />
            </Col>
            <Col xs={24} lg={1} style={{ textAlign: "center" }}>
                <Button onClick={filter} type="primary">Search</Button>
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
    onSearch: (searchArgs: Partial<Job>) => {}
} as Props;

export default Filter;