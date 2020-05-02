import { User } from "../../models/User";
import React from 'react';
import { Avatar, Skeleton, Row, Col, Button } from "antd";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Space from "../style/Space";

const CompanyCard = styled.div`
    text-align: center;
    .company-logo {
        height: 150px;
    }

    .section {
        margin-top: ${Space.sm};
        margin-bottom: ${Space.sm};
    }
`;

export default (props: { user?: User }) => {
    const { user } = props;

    return <CompanyCard>
        <Skeleton avatar active loading={user == undefined}>
            <div className="section">
                <img className="company-logo" src={user?.companyImage} />
            </div>
            <div className="section">
                <h3>
                    {user?.companyName}
                </h3>
            </div>
            {user?.companyWebsite && <div className="section">
                <a target="_blank" href={user.companyWebsite} className="ant-btn">
                    View Website
                </a>
            </div>}
        </Skeleton>
    </CompanyCard>
}