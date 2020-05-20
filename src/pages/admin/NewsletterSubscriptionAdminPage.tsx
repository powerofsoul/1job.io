import React, { useState } from "react"
import { Newsletter } from "../../../models/Newsletter";
import { get, post } from "../../Utils";
import { Spin, Button, Table, Tag, Select, Input } from "antd";
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


    const update = (id: string, newsletter: Partial<Newsletter>) => {
        setLoading(true);
        post("/newsletter/update", {
            id, newsletter
        }).then((response: ApiResponse & {newsletter: Newsletter}) => {
            toast(response.message);
            let index = subscriptions.findIndex((s) => s._id == response.newsletter._id);
            setSubscriptions([
                ...subscriptions.slice(0, index),
                response.newsletter,
                ...subscriptions.slice(index+1)
            ]);
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
                return <Select defaultValue={record.approved ? "yes" : "no"} onChange={(value) => {
                    record.approved = value == "yes";
                    setSubscriptions(subscriptions);
                }}>
                    <Select.Option value="yes">Yes</Select.Option>
                    <Select.Option value="no">No</Select.Option>
                </Select>
            }
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: (value, record: Newsletter) => {
                return <Input defaultValue={value} onChange={(e) => {
                    record.role = e.target.value
                }} />
            }
        },
        {
            title: 'Country',
            dataIndex: 'country',
            key: 'country',
            render: (value, record: Newsletter) => {
                return <Input defaultValue={value} onChange={(e) => {
                    record.country = e.target.value
                }} />
            }
        },
        {
            title: "Actions",
            render: (value, record) => {
                return <Button type="primary" 
                    onClick={() => update(record._id, record)}>
                    Update
                </Button>
            }
        }
    ];

    return <Spin spinning={loading}>
        <Table dataSource={subscriptions} columns={columns} />;
    </Spin>
}