import styled from "styled-components";
import Colors from "../style/Colors";
import { Row, Col, Layout } from "antd";
import Link from "./Link";

export default () => {
    return <Layout.Footer>
        <Row justify="center">
            <Col xs={24} md={8}>
                Copyright © 2020
                </Col>
            <Col xs={24} md={16}>
                <Row>
                <Col xs={24} md={2} span={2}>
                    <Link href="/about">About</Link>
                </Col>
                <Col xs={24} md={2} span={2}>
                    <Link href="/help">Help</Link>
                </Col>
                <Col xs={24} md={2} span={2}>
                    <Link href="/contract">Contact</Link>
                </Col>
                <Col xs={24} md={2} span={3}>
                    <Link href="/terms">Terms of Service</Link>
                </Col>    
                </Row>
            </Col>
        </Row>
    </Layout.Footer>
}