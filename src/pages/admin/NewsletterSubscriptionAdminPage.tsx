import { Button, Input, Select, Spin, Table } from "antd";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { ApiResponse } from "../../../models/ApiResponse";
import { JobCategories } from "../../../models/Job";
import { Newsletter } from "../../../models/Newsletter";
import { get, post } from "../../Utils";

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
            render: (value) => {
                return <a href={value} target="_blank">link</a>
            }
        },
        {
            title: 'Approved',
            dataIndex: 'approved',
            key: 'approved',
            render: (value, record) => {
                return <Select defaultValue={record.approved ? "yes" : "no"} onChange={(value) => {
                    record.approved = value == "yes";
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
                return <Select style={{width: "100%"}} defaultValue={value} onChange={(value) => {
                    record.role = value
                }}>
                    {JobCategories.map((j)=> <Select.Option value={j} key={j}>{j}</Select.Option>)}
                </Select>
            }
        },
        {
            title: 'Country',
            dataIndex: 'country',
            key: 'country',
            render: (value, record: Newsletter) => {
                return <Input key={record._id + ""} defaultValue={value} onChange={(e) => {
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
        <Table rowKey={(row) => row._id} dataSource={subscriptions} columns={columns} />;
    </Spin>
}