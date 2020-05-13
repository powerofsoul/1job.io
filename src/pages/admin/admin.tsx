import PageCardContainer from "../../common/PageCardContainer"
import React from "react"
import { connect } from "react-redux"
import { IAppState } from "../../redux/configureStore"
import { User } from "../../../models/User"
import { useHistory } from "react-router"
import Login from "../login"
import CreateStep from "../post/CreateStep"
import { post } from "../../Utils"
import { ApiResponse } from "../../../models/ApiResponse"
import { toast } from "react-toastify"
import { Tabs } from "antd"
import CreateBlogPost from "./CreateBlogPost"
const { TabPane } = Tabs;

interface Props {
    user: User;
}

const onFinish = (job) => {
    post("/admin/postJob", {
        job
    }).then((response: ApiResponse) => {
        toast(response.message)
    }).catch(() => {
        toast("Something went wrong");
    })
}

const Admin = (props: Props) => {
    if (!props.user?.isAdmin) {
        return <Login />
    }

    return <PageCardContainer>
        <Tabs size="large" defaultActiveKey="1">
            <TabPane tab="Job Post" key="1">
                <h2>POST A JOB</h2>
                <CreateStep form={undefined} onFinish={onFinish} />
            </TabPane>
            <TabPane tab="Blog Post" key="2">
                <h2>Create a Blog Post</h2>
                <CreateBlogPost />
            </TabPane>
        </Tabs>
    </PageCardContainer>
}

export default connect((store: IAppState) => ({
    user: store.currentUserStore.user
}))(Admin);