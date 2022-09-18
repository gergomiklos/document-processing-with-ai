import {PutObjectCommand} from "@aws-sdk/client-s3";
import s3Client from '../awsClient.js';

export default async (req, res, next) => {

    await Promise.all(res.locals.results.map(async ({_filename, buffer}) => {
        return await s3Client.send(new PutObjectCommand({
            Bucket: "ekrdocs",
            Key: _filename,
            Body: buffer,
        }));
    }))

    next()
}