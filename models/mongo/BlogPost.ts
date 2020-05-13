import { Schema, model, Document } from "mongoose";
import { BlogPost } from "../BlogPost";
const xss = require("xss");

export const BlogPostSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    preview: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    postedOn: Date
})

export type BlogPostDocument = BlogPost & Document;

BlogPostSchema.pre('save', function (next) {
    const blog = this as BlogPostDocument;

    if (!blog.isModified('content')) return next();

    blog.content = xss(blog.content);
    next();
})

export default model<BlogPostDocument>("BlogPost", BlogPostSchema);