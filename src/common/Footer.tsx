import styled from "styled-components";
import Colors from "../style/Colors";
import { Row, Col, Layout } from "antd";
import Link from "./Link";
import DeviceSize from "../style/DeviceSize";
import colors from "../style/Colors";

const {Footer} = Layout;
const StyledFooter = styled(Footer)`
    margin-top: auto;
    background-color: ${colors.light_light};
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
                        <Link className="link" href="/">Home</Link>
                        <Link className="link" href="/aboutus">About Us</Link>
                        <Link className="link" href="/help">Help</Link>
                        <Link className="link" href="/contact">Contact</Link>
                    </div>
                 </FooterDetails>
            </Col>
        </Row>
    </StyledFooter>
}