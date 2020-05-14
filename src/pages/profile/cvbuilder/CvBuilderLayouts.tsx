import React from "react"
import { Row, Col } from "antd"
import Space from "../../../style/Space";
import styled from "styled-components";
import colors from "../../../style/Colors";

export type Layout = JSX.Element[][];

export const CvLayout = (props: {layout: Layout}) => {
    return <>
        {props.layout.map((l,i) => <Row style={{marginBottom: Space.sm}} key={i}>
            {l.map((c, j) => <Col xs={24/l.length}>
                {c}
            </Col>)}
        </Row>)}
    </>
}

const EmptyRowStyle = styled(Row)`
    border: 1px dashed black;
`;

const EmptyCol = styled(Col)`
    padding: ${Space.sm};
    text-align: center;
    cursor: pointer;

    &:hover{
        background-color: ${colors.blue};
    }
`;

export const EmptyRow = (props: {onAdd: () => void}) => <EmptyRowStyle>
    <EmptyCol xs={24} onClick={props.onAdd}>
        + 
    </EmptyCol>
</EmptyRowStyle>
