import React from "react";
import styled from "styled-components";
import { Button } from "antd";
import { Link } from "react-router-dom";

const FinishStep = styled.div`
    text-align: center;
`;

interface Props {
    jobHref?: string;
}

export default (props: Props) => {
    return <FinishStep>
        <h3>Your job was posted 🎉🎉</h3>

        <Link to={props.jobHref}>
            <Button type="primary">View Job</Button>
        </Link>
    </FinishStep>
}