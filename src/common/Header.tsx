import styled from "styled-components";
import Colors from "../style/Colors";
import { Row, Col, Space } from "antd";
import Typist from "react-typist";
import TypistLoop from 'react-typist-loop'
import DeviceSize from "../style/DeviceSize";

const Header = styled.div`
    width: 100%;
    background-color: ${Colors.light};

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