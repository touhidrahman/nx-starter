import {
    DeleteObjectCommand,
    GetObjectCommand,
    PutObjectCommand,
} from '@aws-sdk/client-s3'
import { s3Client, S3fileUrl } from '../../utils/s3Config'
import { error } from 'ng-packagr/lib/utils/log'

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

export const getFile = async (url: string) => {
    const fileKey = url.split('.com/')[1]
    const bucket = process.env.S3_BUCKET_NAME ?? ''
    const params = {
        Bucket: bucket,
        Key: fileKey,
    }

    try {
        const command = new GetObjectCommand(params)
        const file = await s3Client.send(command)
        console.log(file.Body)
    } catch (error) {
        console.error(`Failed to retrieve file ${fileKey}:`, error)
        throw error
    }
}

export const deleteFile = async (url: string) => {
    if (url) {
        const fileKey = url.split('.com/')[1]
        const bucket = process.env.S3_BUCKET_NAME ?? ''

        const params = {
            Bucket: bucket,
            Key: fileKey,
        }

        try {
            const command = new DeleteObjectCommand(params)
            await s3Client.send(command)
            return true
        } catch (e) {
            console.error(`Failed to retrieve file ${fileKey}:`, error)
            throw e
        }
    }
}
