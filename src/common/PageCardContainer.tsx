import React from "react"
import { Row, Col, Breadcrumb } from "antd"
import styled from "styled-components";
import Space from "../style/Space";
import { HoverableCard } from "../style/CommonStyles";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const PageCardContainer = styled(Row)`
    margin-top: ${Space.md};
    margin-bottom: ${Space.md};

    .card {
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        padding: ${Space.md};
    }

    .breadcrumb {
        margin-bottom: ${Space.md};
    }
`;

export interface HeaderItem {
    name: string,
    to?: string;
}

interface Props {
    children: any;
    lg?: number
    className?: string;
    header?: HeaderItem[]
}

export default (props: Props) => {
    return <PageCardContainer justify="center" className={props.className}>
        <Col className="card" xs={22} lg={props.lg || 12}>
            {props.header && <Breadcrumb className="breadcrumb">
                <Breadcrumb.Item>
                    <Link to="/">
                        <HomeOutlined />
                    </Link>
                </Breadcrumb.Item>
                {
                    props.header.map((h) => <Breadcrumb.Item>
                        {h.to ? <Link to={h.to}> {h.name} </Link> : h.name}
                    </Breadcrumb.Item>)
                }
            </Breadcrumb>}
            {props.children}
        </Col>
    </PageCardContainer>
}