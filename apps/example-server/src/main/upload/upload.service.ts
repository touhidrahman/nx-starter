import env from '../../env'
import { HonoS3Storage } from '@hono-storage/s3'
import {
    DeleteObjectCommand,
    GetObjectCommand,
    PutObjectCommand,
    S3Client,
} from '@aws-sdk/client-s3'
import { read } from 'fs'
import { tryit } from 'radash'

export const appS3Client = new S3Client({
    region: env.S3_REGION,
    forcePathStyle: true,
    endpoint: env.S3_ENDPOINT,
    credentials: {
        accessKeyId: env.S3_ACCESS_KEY,
        secretAccessKey: env.S3_SECRET_KEY,
    },
})

export const uploader = new HonoS3Storage({
    key: (_, file) =>
        `${file.originalname}-${crypto.randomUUID()}.${file.extension}`,
    bucket: env.S3_BUCKET,
    client: appS3Client,
})

export const uploadToS3AndGetUrl = async (file: File): Promise<string> => {
    const fileKey = `${crypto.randomUUID()}.${file.type.split('/')[1]}`

    const uploadCommand = new PutObjectCommand({
        Body: Buffer.from(await file.arrayBuffer()),
        Bucket: env.S3_BUCKET,
        Key: fileKey,
        ContentType: file.type,
        ACL: 'public-read',
    })
    try {
        await appS3Client.send(uploadCommand)
        return `${env.S3_BUCKET_URL}/${fileKey}`
    } catch (error) {
        console.error('Error uploading to S3:', error)
        return ''
    }
}

export const getS3File = async (
    key: string,
): Promise<{
    data: Uint8Array
    contentType: string
}> => {
    const readCommand = new GetObjectCommand({
        Bucket: env.S3_BUCKET,
        Key: key,
    })
    const object = await appS3Client.send(readCommand)
    const byteArray = await object.Body?.transformToByteArray()
    if (byteArray === undefined) {
        throw new Error('File does not exist')
    }

    return {
        data: byteArray,
        contentType: object.ContentType ?? 'application/octet-stream',
    }
}

export const deleteS3File = async (key: string): Promise<void> => {
    const deleteCommand = new DeleteObjectCommand({
        Bucket: env.S3_BUCKET,
        Key: key,
    })

    await appS3Client.send(deleteCommand)
}
