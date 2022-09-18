import {S3Client} from "@aws-sdk/client-s3";

export default new S3Client({
    region: 'eu-central-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'ACCESS_KEY_ID',
        secretAccessKey: process.env.AWS_SECRET_KEY || 'SECRET_KEY',
    }
});
