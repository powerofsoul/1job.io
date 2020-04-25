import { Col, Row } from "antd";
import styled from "styled-components";
import Colors from "../style/Colors";
import DeviceSize from "../style/DeviceSize";

const Header = styled.div`
    width: 100%;
    background-color: ${Colors.light};

    ${DeviceSize.xs} {
        padding-top: 20px;
        padding-bottom: 20px;
        padding-left: 10px;
    }

    ${DeviceSize.md} {
        padding: 20px;
    }
`;

export default () => {
    return <Header>
        <Row>
            <Col xs={24}>
                <h1>
                   Jobs Remotely Online
                </h1>
            </Col>
        </Row>
    </Header>
}