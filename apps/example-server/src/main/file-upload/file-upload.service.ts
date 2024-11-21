import { PutObjectCommand } from '@aws-sdk/client-s3'
import { s3Client, S3fileUrl } from '../../core/third-party/s3Config'

export const uploadFile = async (file: File) => {
    const bucket = process.env.S3_BUCKET_NAME ?? ''
    const key = `uploads-${crypto.randomUUID()}-${file.name}`
    const buffer = await file.arrayBuffer()

    const params = new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: Buffer.from(buffer),
        ACL: 'public-read',
        ContentType: file.type,
    })
    await s3Client.send(params)
    return S3fileUrl(key)
}
