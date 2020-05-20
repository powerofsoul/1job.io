import React, { useState } from "react"
import { Newsletter } from "../../../models/Newsletter";
import { get, post } from "../../Utils";
import { Spin, Button, Table, Tag } from "antd";
import { toast } from "react-toastify";
import { ApiResponse } from "../../../models/ApiResponse";

export default () => {
    const [subscriptions, setSubscriptions] = useState<Newsletter[]>();
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        get("/newsletter/all").then((response: Newsletter[]) => {
            setSubscriptions(response)
            setLoading(false);
        });
    }, []);


    const onStatusToggle = (id: string, status: boolean) => {
        setLoading(true);
        post("/newsletter/changeStatus", {
            id, status
        }).then((response: ApiResponse) => {
            toast(response.message);
            subscriptions.find((s) => s._id == id).approved = status;
        }).catch(() => {
            toast("Somthing went wrong!")
        }).finally(() => {
            setLoading(false);
        })
    }


    const columns = [
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'LinkedIn Url',
            dataIndex: 'linkedinUrl',
            key: 'linkedinUrl',
        },
        {
            title: 'Approved',
            dataIndex: 'approved',
            key: 'approved',
            render: (value, record) => {
                return <Tag color={value ? "green" : "red"}>
                    {value ? "Yes" : "No"}
                </Tag>
            }
        },
        {
            title: "Actions",
            render: (value, record) => {
                return <Button type="primary" onClick={() => onStatusToggle(record._id, !record.approved)}>Toggle Status</Button>
            }
        }
    ];

    return <Spin spinning={loading}>
        <Table dataSource={subscriptions} columns={columns} />;
    </Spin>
}