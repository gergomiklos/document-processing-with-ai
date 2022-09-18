import {GetObjectCommand} from "@aws-sdk/client-s3";
import s3Client from '../awsClient.js';

export default async (req, res, next) => {

    const {Body: data, headers} = await s3Client.send(new GetObjectCommand({
        Bucket: "ekrdocs",
        Key: req.params.filename,
    }));

    res.locals.stream = data

    next()
}