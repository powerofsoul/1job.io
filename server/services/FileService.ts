import config from "../config";
const path = require("path");
import fse from "fs-extra"
import { S3 } from "aws-sdk";

let upload: (file: Buffer, name: string) => Promise<string>;

if (config.env == "development") {
    upload = (file, name) => {
        return new Promise((resolve) => {
            const relativePath = path.join("/uploads", name);

            const filePath = path.join(__dirname, "../../public/", relativePath)

            fse.outputFileSync(filePath, file);

            resolve(relativePath);
        })
    }
} else {
    upload = (file: Buffer, name) => {
        const s3 = new S3({
            accessKeyId: config.aws_access_key_id,
            secretAccessKey: config.aws_access_secret
        });

        const params = {
            Bucket: config.uploads_bucket,
            Key: path.join("uploads", name),
            Body: file
        };

        return new Promise((resolve, reject) => {
            s3.upload(params, (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data.Location)
            });
        })
    }
}

const FileStore = {
    upload
}

export default FileStore;