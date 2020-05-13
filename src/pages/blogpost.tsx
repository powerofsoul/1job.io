import PageCardContainer from "../common/PageCardContainer";
import React, { useState } from "react";
import { useParams, useHistory } from "react-router";
import { get } from "../Utils";
import { BlogPost } from "../../models/BlogPost";
import { Spin } from "antd";
import moment from "moment";

export default () => {
    const {title} = useParams();
    const [blogPost, setBlogPost] = useState<BlogPost>();
    const history = useHistory();

    React.useEffect(() => {
        get(`/blog/${title}`).then((response: BlogPost)=>{
            setBlogPost(response);
        }).catch(() => {
            history.push("/");
        })
    }, []);


    return <PageCardContainer>
        <Spin spinning={!blogPost}>
            <h2>{blogPost?.title}</h2>
            <small>{blogPost && moment(blogPost.postedOn).fromNow() }</small>
            <div className="ql-editor" dangerouslySetInnerHTML={{__html: blogPost?.content}}/>
        </Spin>
</PageCardContainer>
}