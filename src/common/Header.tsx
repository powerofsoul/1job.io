import { Col, Row, Menu, Dropdown, Button, Tag, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styled from "styled-components";
import Colors from "../style/Colors";
import DeviceSize from "../style/DeviceSize";
import { IAppState } from "../redux/configureStore";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import CurrentUserStore from "../redux/stores/CurrentUserStore";
import { User } from "../../models/User";
import { Link } from "react-router-dom";
import * as React from "react";

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
const HeaderDetails = styled(Col)`
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
        
    .header-buttons {
        * {
            margin-left: 10px;
        }
    }

    .profile-link {
        cursor: pointer;
    }

    .avatar {
        margin-right: 10px;
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
                    <Link to="/">Jobs Remotely Online</Link>
                </h1>
            </Col>
            <HeaderDetails xs={24} md={12}>
                <div className="links">
                    {props.currentUser ?
                        <div className="right">
                            <Avatar className="avatar" style={{ backgroundColor: "red", verticalAlign: 'middle' }} src={props.currentUser?.companyImage} size="large">
                                {props.currentUser?.companyName}
                            </Avatar>
                            <Link to="/profile"><Tag className="profile-link" color="green">{props.currentUser?.companyName}</Tag></Link>
                            <a onClick={props.logOut}>Log out</a>
                        </div>
                        : <div className="header-buttons">
                            <Link to="/login">Log in</Link>
                            <Link to="/register">Register</Link>
                        </div>
                    }
                </div>
            </HeaderDetails>
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
