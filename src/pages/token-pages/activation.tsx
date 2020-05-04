import React, { useState } from "react";
import { useParams, useHistory } from "react-router";
import { Spin } from "antd";
import { post } from "../../Utils";
import { toast } from "react-toastify";

export default () => {
    const { activationString } = useParams();
    const [duplicateRequestCheck, setDuplicateRequestCheck] = useState(false);

    const history = useHistory();

    React.useEffect(() => {
        if (activationString && !duplicateRequestCheck) {
            post("/user/activate", { activationString }).then((response: { success: boolean, message: string }) => {
                if (response.success) {
                    toast(response.message, {
                        type: "success"
                    })
                } else {
                    toast((response.message), {
                        type: "error"
                    })
                }
                history.push("/login");
            }).catch(() => {
                history.push("/");
            })
        } else {
            history.push("/");
        }
        setDuplicateRequestCheck(true);
    });

    return <Spin spinning />
}