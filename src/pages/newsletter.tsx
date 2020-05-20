import PageCardContainer from "../common/PageCardContainer"
import React from "react"
import { Form, Input, Select, Button } from "antd"
import { JobCategories } from "../../models/Job"
import { post } from "../Utils"
import { toast } from "react-toastify"
import { ApiResponse } from "../../models/ApiResponse"
import { useHistory } from "react-router"

const validLinkedin = async (rule, value: string) => {
    const validLinkedinUrls = [
        "https://www.linkedin.com/in/",
        "https://linkedin.com/in/"
    ];

    if (!validLinkedinUrls.some((l) => value?.toLocaleLowerCase().indexOf(l) == 0)) {
        throw new Error("Invalid LinkedIn url.")
    }
}

export default () => {
    const history = useHistory();
    
    const onFinish = (subscription) => {
        post("/newsletter/subscribe", {
            subscription
        }).then((response: ApiResponse) => {
            toast(response.message, {
                type: response.success ? "success" : "error"
            });

            if(response.success) {
                history.push("/");
            }
        }).catch(()=>{
            toast("Something went wrong", {
                type: "error"
            })
        })
    }
    return <PageCardContainer>
        <h2>Subscribe to Weekly Email Notification</h2>
        <p>All jobs will be fine tuned for your needs after we take a look on your LinkedIn profile.</p>

        <Form wrapperCol={{ xs: 24 }} labelCol={{ span: 24 }} onFinish={onFinish}>
            <Form.Item name="email" label="Email" rules={[{ required: true, message: "Please enter an email address." }, { type: "email", message: "Please enter a valid email!" }]}>
                <Input />
            </Form.Item>

            <Form.Item name="linkedinUrl" label="LinkedIn" rules={[
                { required: true, message: "Please enter your LinkedIn url." },
                { type: "url", message: "Please enter a valid url." },
                { validator: validLinkedin }
            ]}>
                <Input placeholder="https://www.linkedin.com/in/JohnDoe"/>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
        </Form>
    </PageCardContainer>
}