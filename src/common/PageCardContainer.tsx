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
    position: relative;

    .card {
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        padding: ${Space.md};
    }

    .breadcrumb {
        margin-bottom: ${Space.md};
    }

    .shiny-top-border {
        position: absolute;
        height: 5px;
        width: 100%;
        top:0;
        left:0;
        background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
        background-size: 400% 400%;
        animation: gradient 15s ease infinite;

        @keyframes gradient {
            0% {
                background-position: 0% 50%;
            }
            50% {
                background-position: 100% 50%;
            }
            100% {
                background-position: 0% 50%;
            }
        }
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
            <div className="shiny-top-border" />
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