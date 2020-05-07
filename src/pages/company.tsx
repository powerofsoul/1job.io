import { User } from "../../models/User"
import React, { useState } from "react";
import { useParams, useHistory } from "react-router";
import { get } from "../Utils";
import { Row, Skeleton, Col, Avatar } from "antd";
import CompanyCard from "../common/CompanyCard";
import styled from "styled-components";
import { HoverableCard } from "../style/CommonStyles";
import Space from "../style/Space";
import CompanyJobsList from "../common/CompanyJobList";
import { Employer } from "../../models/Employer";

const CompanyPage = styled.div`
    margin-top: ${Space.md};
    margin-bottom: ${Space.md};

    .main-col {
        ${HoverableCard}
    }

    .company-job-list {
        margin-top: ${Space.md};
        margin-bottom: ${Space.md};
    }
`;

export default () => {
    const { id } = useParams();
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [company, setComany] = useState<Employer>()

    React.useEffect(() => {
        if (loading) {
            get(`/user/${id}`).then((response: {
                user: Employer
            }) => {
                setComany(response.user);
                setLoading(false);
            }).catch(() => {
                history.push('/');
            })
        }
    })

    return <CompanyPage>
        <Row justify="center">
            <Col className="main-col" md={12}>
                <Skeleton loading={loading}>
                    <CompanyCard hideViewMore user={company} />
                    <div dangerouslySetInnerHTML={{__html: company?.companyDescription}} />

                    <div className="company-job-list">
                        <CompanyJobsList companyId={company?._id}/>
                    </div>
                </Skeleton>
            </Col>
        </Row>
    </CompanyPage>
}