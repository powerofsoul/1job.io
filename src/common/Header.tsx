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
import { SimpleContainer } from "../style/CommonStyles";

const Header = styled.div`
    width: 100%;
    background-color: ${Colors.white};
    box-shadow: 1px 1px 1px 1px rgba(0,0,0,0.1);
    position: sticky;
    top:0;
    z-index: 10;

    ${DeviceSize.xs} {
        text-align: center;
        padding-top: 20px;
        padding-bottom: 20px;
        padding-left: 10px;
    }

    ${DeviceSize.md} {
        text-align: unset;
        padding: 20px;
    }

    ${SimpleContainer}
    margin:0;
`;
const HeaderDetails = styled(Col)`
    display: flex;
    text-align: right;
    align-items: center;

    .links {
        ${DeviceSize.xs} {
            margin-left: auto;
            margin-right: auto;
        }

        ${DeviceSize.md} {
            margin-left: auto;
            margin-right: 0;
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
    loading: boolean;
    currentUser?: User;
    logOut: () => void;
    refreshCurrentUser: () => void;
}

const component = (props: Props) => {
    return <Header>
        <Row>
            <Col xs={24} md={12}>
                <h1>
                    <Link to="/">
                        <img src="/img/logo.png" />
                    </Link>
                </h1>
            </Col>
            <HeaderDetails xs={24} md={12}>
                <div className="links">
                    {props.currentUser ?
                        <div className="right">
                            <Link to="/profile">
                                <Avatar className="avatar" style={{ backgroundColor: "white", verticalAlign: 'middle' }} src={props.currentUser?.avatar} size="large">
                                    {props.currentUser?._employer?.companyName}
                                </Avatar>
                                <Tag className="profile-link" color="green">{props.currentUser?._employer?.companyName}</Tag>
                            </Link>
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
    currentUser: store.currentUserStore.user,
    loading: store.currentUserStore.loading
});

export default connect(
    mapStateToProps,
    (dispatch) => bindActionCreators(CurrentUserStore.actionCreators, dispatch)
)(component);
