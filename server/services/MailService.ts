import { SES } from "aws-sdk";
import config from "../config";

const ses = new SES(({
    region: "us-east-1",
    accessKeyId: config.aws_access_key_id,
    secretAccessKey: config.aws_access_secret
}));

const notify = (to: string, subject: string, content: string) => {
    if( config.env == "development") {
        to = config.test_mail
    }

    const params = {
        Destination: {
            ToAddresses: [to]
        },
        Message: {
            Body: {
                Html: {
                    Data: content,
                }
            },
            Subject: {
                Data: subject,
            }
        },
        Source: "notifications@1job.io"
    };

    return new Promise((resolve, reject) => {
        ses.sendEmail(params, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    })
}

export default {
    notify
}