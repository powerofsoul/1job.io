import { User } from "../../models/UserModel";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CurrentUserStore from "../redux/stores/CurrentUserStore";
import { IAppState } from "../redux/configureStore";
import Router from 'next/router'
import React from "react";

interface Props {
    user: User;
}

const Profile = (props: Props) => {
    React.useEffect(() => {
        if(!props.user) {
            Router.push("/login");
        }
    }, [props.user]);

    return <div>
        {props.user.email}
    </div>
}

const mapStateToProps = (store: IAppState): Partial<Props> => ({
    user: store.currentUserStore.user
})
 
export default connect(
    mapStateToProps,
    (dispatch) => bindActionCreators(CurrentUserStore.actionCreators, dispatch)
)(Profile);
