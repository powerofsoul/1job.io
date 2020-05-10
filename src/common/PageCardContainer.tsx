import React from "react"
import { Row, Col } from "antd"
import styled from "styled-components";
import Space from "../style/Space";
import { HoverableCard } from "../style/CommonStyles";

const PageCardContainer = styled(Row)`
    margin-top: ${Space.md};
    margin-bottom: ${Space.md};

    .card {
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        padding: ${Space.md};
    }
`;

interface Props {
    children: any;
    lg?: number
}

export default (props: Props) => {
    return <PageCardContainer justify="center">
        <Col className="card" xs={22} lg={props.lg || 12}>
            {props.children}
        </Col>
    </PageCardContainer>
}