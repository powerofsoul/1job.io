import { User } from "../../models/User";
import React from 'react';
import { Avatar, Skeleton, Row, Col, Button } from "antd";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Space from "../style/Space";
import { Employer } from "../../models/Employer";

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

interface Props {
    user?: Employer;
    hideViewMore?: boolean;
}

export default (props: Props) => {
    const { user, hideViewMore } = props;

    return <CompanyCard>
        <Skeleton avatar active loading={user == undefined}>
            <div className="section">
                <img className="company-logo" src={user?.avatar} />
            </div>
            <div className="section">
                <h3>
                    <a href={user?.companyWebsite} target="_blank">{user?.companyName}</a>
                </h3>
            </div>
            {!hideViewMore && <div>
                <Button type="primary">
                    <Link to={`/company/${user?._id}`}>View More</Link>
                </Button>
            </div>}
        </Skeleton>
    </CompanyCard>
}