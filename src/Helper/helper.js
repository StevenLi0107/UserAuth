import S3 from 'react-aws-s3';

const config = {
    bucketName: process.env.REACT_APP_S3_BUCKET,
    dirName: process.env.REACT_APP_DIRNAME,
    region: process.env.REACT_APP_REGION,
    accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
}

export function uploadFile(file, filename) {
    return new Promise((resolve, reject) => {
        const ReactS3Client = new S3(config);
        ReactS3Client.uploadFile(file, filename).then(data => {
            resolve(data.location);
        }).catch(error => {
            reject(error);
        })
    });
}