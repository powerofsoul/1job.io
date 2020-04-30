import { User } from "models/User";
import React from 'react';
import { Avatar, Skeleton, Row, Col, Button } from "antd";
import styled from "styled-components";
import { Link } from "react-router-dom";

const CompanyCard = styled(Skeleton)`

`;

export default (props: { user?: User }) => {
    const { user } = props;

    return <CompanyCard avatar active loading={user == undefined}>
        <Link to={`/profile/${user?._id}`}>
            <Row align="middle" gutter={[12, 12]}>
                <Col>
                    <Avatar size={64} className="companyLogo" src={user?.companyImage} />
                </Col>
                <Col>
                    {user?.companyName}
                </Col>
            </Row>
        </Link>
        {user?.companyWebsite && <Row>
            <Col>
                <a target="_blank" href={user.companyWebsite} className="ant-btn">
                    View Website
                </a>
            </Col>
        </Row>}
    </CompanyCard>
}