import PageCardContainer from "../common/PageCardContainer"
import React, { useState } from "react"
import { Spin } from "antd"
import { BlogPost } from "../../models/BlogPost";
import { get } from "../Utils";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { HoverableCard } from "../style/CommonStyles";
import Space from "../style/Space";
import moment from "moment";
import { useHistory } from "react-router";

const Blog = styled(PageCardContainer)`
    .blog-card {
        ${HoverableCard}

        margin-top: ${Space.sm};
        margin-bottom: ${Space.sm};
    }

    .title {
        margin-bottom: 0px;
    }

    .posted-time {
        margin-bottom: ${Space.sm};
    }
`;

export default () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<BlogPost[]>();
    const history = useHistory();
    
    React.useEffect(() => {
        get("/blog").then((blogs: BlogPost[]) => {
            setBlogs(blogs);
            setLoading(false);
        })
    }, [])

    const goToBlog = (title) => {
        history.push(`/blog/${title}`);
    }

    return <Blog>
        <Spin spinning={loading}>
            <h2>1 Job Blog</h2>
            {blogs?.map((b, i) => <div key={b.title} onClick={()=>goToBlog(b.title)} className="blog-card">
                <h3 className="title">{b.title}</h3>
                <div className="posted-time">
                    <small>{moment(b.postedOn).fromNow()}</small>
                </div>
                {b.preview}
            </div>)}
        </Spin>
    </Blog>
}