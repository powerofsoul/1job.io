import { Col, Row, Menu, Dropdown, Button, Tag } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styled from "styled-components";
import Colors from "../style/Colors";
import DeviceSize from "../style/DeviceSize";
import Link from "./Link";
import { User } from "../../models/UserModel";
import { IAppState } from "../redux/configureStore";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import CurrentUserStore from "../redux/stores/CurrentUserStore";

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
    align-items: center;

    .links {
        ${DeviceSize.xs} {
            margin-left: unset;
        }

        ${DeviceSize.md} {
            margin-left: auto;
        }
    }
`;

interface Props {
    currentUser?: User;
    logOut: () => void;
}

const component = (props: Props) => {
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
                        {props.currentUser ?
                            <div className="right">
                                <Tag color="green">{props.currentUser.email}</Tag>
                                <a onClick={props.logOut}>Log out</a>
                            </div>
                            :
                            <Link href="/login">Log in</Link>
                        }
                    </div>
                </HeaderDetails>
            </Col>
        </Row>
    </Header>
}

const mapStateToProps = (store: IAppState): Partial<Props> => ({
    currentUser: store.currentUserStore.user
});

export default connect(
    mapStateToProps,
    (dispatch) => bindActionCreators(CurrentUserStore.actionCreators, dispatch)
)(component);
