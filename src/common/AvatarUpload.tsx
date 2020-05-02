import { Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { toast } from "react-toastify";
import React from "react";
import { apiUrl, post, uploadFile } from "../Utils";

export default (props: { avatarUrl?: string, afterUpload: (url: string) => void }) => {
    const [avatarUrl, setAvatarUrl] = useState(props.avatarUrl);

    const [loading, setLoading] = useState(false);

    const handleChange = (info) => {
        setLoading(true)    
           
        if (info.file.status === 'done') {
            setAvatarUrl(info.file.response.url);
            setLoading(false);
            props.afterUpload(info.file.response.url);
        }
    };

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type == 'image/gif';
        if (!isJpgOrPng) {
            toast('You can only upload JPG/PNG/GIF file!', {
                type: "error"
            });
            setLoading(false);
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            toast('Image must smaller than 2MB!', {
                type: "error"
            });
            setLoading(false);
        }
        return isJpgOrPng && isLt2M;
    }

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div className="ant-upload-text">Upload</div>
        </div>
    );

    const avatar = (
        <div>
            {loading ? <LoadingOutlined /> : <img src={avatarUrl} alt="avatar" style={{ width: '100%' }} />}
        </div>
    )

    return <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action={apiUrl("/user/uploadAvatar")}
        withCredentials={true}
        beforeUpload={beforeUpload}
        onChange={handleChange}
    >
        {avatarUrl ? avatar : uploadButton}
    </Upload>
}