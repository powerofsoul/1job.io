import { BlogPost } from "../../models/BlogPost";
import { User } from "../../models/User";
import BlogPostModel from "../../models/mongo/BlogPostModel";

function update(_id: string ,blogPost: BlogPost) {
    delete blogPost.postedOn;
    delete blogPost.author;
    
    return new Promise((resolve) => {
        BlogPostModel.updateOne({_id: _id},{
            ...blogPost
        }).then(() => {
            resolve({
                success: true,
                message: "Blog post updated"
            })
        }).catch(()=> {
            resolve({
                success: false,
                message: "Something went wrong"
            })
        })
    })
}

function create(blogPost: BlogPost, currentUser: User) {
    return new Promise((resolve) => {
        BlogPostModel.create({
            ...blogPost, 
            author: currentUser,
            postedOn: new Date()
        }).then(() => {
            resolve({
                success: true,
                message: "Blog post posted"
            })
        }).catch(()=> {
            resolve({
                success: false,
                message: "Something went wrong"
            })
        })
    })
}

export const BlogService = {
    update, create
}