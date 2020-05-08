import { Spin } from "antd"
import React, { useState } from "react"
import { post } from "../../Utils";
import { ApiResponse } from "../../../models/ApiResponse";
import { toast } from "react-toastify";
import { useHistory, useParams } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import CurrentUserStore from "../../redux/stores/CurrentUserStore";

interface Props {
    refreshCurrentUser: () => void;
}

const ChangeEmail = (props: Props) => {
    const history = useHistory();
    const { hash } = useParams();

    const [loading, setLoading] = useState(false);

    React.useEffect(() => {
        if (!loading) {
            setLoading(true);
            post("/user/changeEmail", { hash }).then(async (response: ApiResponse) => {
                toast(response.message || "Email Changed", {
                    type: response.success ? "success" : "error"
                });
                await props.refreshCurrentUser();
                history.push("/");
            });
        }
    });

    return <Spin spinning tip="Loading" />
}

export default connect(
    () => { },
    (dispatch) => bindActionCreators(CurrentUserStore.actionCreators, dispatch)
)(ChangeEmail);