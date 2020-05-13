import PageCardContainer from "../common/PageCardContainer";
import React, { useState } from "react";
import { useParams, useHistory } from "react-router";
import { get } from "../Utils";
import { BlogPost } from "../../models/BlogPost";
import { Spin } from "antd";
import moment from "moment";
import styled from "styled-components";

const BlogPostStyle = styled(PageCardContainer)`
    .title {
        margin-bottom: 5px;
    }

`;

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


    return <BlogPostStyle>
        <Spin spinning={!blogPost}>
            <h2 className="title">{blogPost?.title}</h2>
            <small>{blogPost && moment(blogPost.postedOn).fromNow() }</small>
            <div className="ql-editor" dangerouslySetInnerHTML={{__html: blogPost?.content}}/>
        </Spin>
</BlogPostStyle>
}