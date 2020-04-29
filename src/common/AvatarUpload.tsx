import { Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { toast } from "react-toastify";

export default (props: { avatarUrl?: string, afterUpload: (url: string) => void }) => {
    const [avatarUrl, setAvatarUrl] = useState(props.avatarUrl);

    const [loading, setLoading] = useState(false);
    
    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true)
            return;
        }
    
        if (info.file.status === 'done') {
            setAvatarUrl(info.file.response.url);
            props.afterUpload(info.file.response.url);
        }
    };
    
    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            toast('You can only upload JPG/PNG file!', {
                type: "error"
            });
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            toast('Image must smaller than 2MB!', {
                type: "error"
            });
        }
        return isJpgOrPng && isLt2M;
    }
    
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div className="ant-upload-text">Upload</div>
        </div>
    );

    
    return <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="api/user/uploadAvatar"
        beforeUpload={beforeUpload}
        onChange={handleChange}
    >
        {avatarUrl ? <img src={avatarUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
    </Upload>
}