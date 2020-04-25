import styled from "styled-components";
import Colors from "../style/Colors";
import { Row, Col, Space } from "antd";
import Typist from "react-typist";
import TypistLoop from 'react-typist-loop'

const Header = styled.div`
    width: 100%;
    background-color: ${Colors.light};
`;

const Title = styled.h1`
    display: flex;
`;

export default () => {
    return <Header>
        <Row>
            <Col xs={12}>
                <Title>
                    <TypistLoop interval={3000}>
                        {[
                            'Remote jobs for everyone',
                            'Updated daily.',
                            'Boost your career now!',
                        ].map(text => <Typist key={text} startDelay={1000}>{text}</Typist>)}
                    </TypistLoop>
                </Title>
            </Col>
        </Row>
    </Header>
}