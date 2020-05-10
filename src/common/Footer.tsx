import styled from "styled-components";
import Colors from "../style/Colors";
import { Row, Col, Layout } from "antd";
import { Link } from "react-router-dom";
import DeviceSize from "../style/DeviceSize";
import colors from "../style/Colors";
import React from "react";
import { FacebookFilled, LinkedinFilled } from "@ant-design/icons";

const {Footer} = Layout;
const StyledFooter = styled(Footer)`
    margin-top: auto;
    background-color: ${Colors.white};
    box-shadow: 0px 0 10px rgba(0, 0, 0, 0.1);
`;

const FooterDetails = styled.div`
    display: flex;
    text-align: right;
    
    .links {
        ${DeviceSize.xs} {
            margin-left: unset;
        }

        ${DeviceSize.md} {
            margin-left: auto;
        }

        .link {
            margin-right: 10px;
        }
    }
`;

export default () => {
    return <StyledFooter>
        <Row justify="center">
            <Col xs={24} md={12}>
                Copyright © 2020
                </Col>
            <Col xs={24} md={12}>
                 <FooterDetails>
                     <div className="links">
                        <a target="_blank" href="https://www.linkedin.com/company/1jobdotio"><LinkedinFilled style={{fontSize: "2rem"}} /></a>
                        <a target="_blank" href="https://www.facebook.com/1JOB-100100101713880"><FacebookFilled style={{fontSize: "2rem"}}/></a>
                    </div>
                 </FooterDetails>
            </Col>
        </Row>
    </StyledFooter>
}