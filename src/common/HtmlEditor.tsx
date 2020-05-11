import React from 'react'
import 'react-quill/dist/quill.snow.css'
import styled from 'styled-components'
import Editor from "react-quill";
const modules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }, "link"],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
        ['clean']
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false
    }
}

const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
]

const HmlEditor = styled(Editor)`
    .ql-editor{
        height:500px;
    }
`;

export default (props) => <HmlEditor
    modules={modules}
    formats={formats}
    theme='snow'
    {...props}
    value={props.value || "<p></p>"}
/>