import { Col, Row, Menu, Dropdown, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styled from "styled-components";
import Colors from "../style/Colors";
import DeviceSize from "../style/DeviceSize";
import Link from "./Link";

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
const HeaderDetails = styled.div`
    display: flex;
    text-align: right;

    .links {
        ${DeviceSize.xs} {
            margin-left: unset;
        }

        ${DeviceSize.md} {
            margin-left: auto;
        }

        .primary-button {
            margin-right: 10px;
            border:none;
            background-color: ${Colors.primary};
            color: ${Colors.light};
            text-align: center;
            font-size: 16px;
        }

        .button {
            margin-right: 10px;
            border:none;
            background-color: ${Colors.light};
            color: ${Colors.dark};
            text-align: center;
            font-size: 16px;
        }
    }
`;

const notificationsContent = (
    <div>
      <p>New user has joined the channel</p>
    </div>
  );

const profileMenu = (
    <Menu>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="/profile">
                Profile
        </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="/help">
                Help
        </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="/">
                Sign out
        </a>
        </Menu.Item>
    </Menu>
)



export default () => {
    return <Header>
        <Row>
            <Col xs={24} md={12}>
                <h1>
                    <Link href="/">Jobs Remotely Online</Link>
                </h1>
            </Col>
            <Col xs={24} md={12}>
                <HeaderDetails>
                    <div className="links">
                        <Button className="primary-button" href="/post">Post a job</Button>
                        <Button className="button" href="/notifications">Notifications</Button>
                        <Dropdown overlay={profileMenu} placement="bottomRight">
                            <Button className="button">Profile</Button>
                        </Dropdown>
                    </div>
                </HeaderDetails>
            </Col>
        </Row>
    </Header>
}