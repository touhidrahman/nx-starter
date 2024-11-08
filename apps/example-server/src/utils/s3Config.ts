import { S3Client } from '@aws-sdk/client-s3'

const config = {
    endpoint: process.env.S3_ENDPOINT ?? '',
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY ?? '',
        secretAccessKey: process.env.S3_SECRET_KEY ?? '',
    },
    region: 'us-east-1',
}

export const s3Client = new S3Client(config)

export const S3fileUrl = (key: string) => {
    const region = process.env.S3_REGION
    const bucket = process.env.S3_BUCKET_NAME
    return `https://${bucket}.${region}.linodeobjects.com/${key}`
}
