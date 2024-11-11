import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { INTERNAL_SERVER_ERROR, OK } from 'stoker/http-status-codes'
import { z } from 'zod'
import {
    deleteS3File,
    getS3File,
    uploadToS3AndGetUrl,
} from '../../core/third-party/s3.service'

const app = new Hono()

app.post(
    '/v1/upload',
    zValidator(
        'form',
        z.object({
            file: z.instanceof(File),
        }),
    ),
    async (c) => {
        const fileData = c.req.valid('form')
        try {
            const url = await uploadToS3AndGetUrl(fileData.file)
            return c.json({ data: { url }, message: 'Upload successful' }, OK)
        } catch (error) {
            return c.json({ message: 'Upload failed' }, INTERNAL_SERVER_ERROR)
        }
    },
)

app.get('/v1/upload/:key', async (c) => {
    const { key } = c.req.param()
    try {
        const { data: byteArray, contentType } = await getS3File(key)
        if (byteArray === undefined) {
            return c.json({ error: 'Failed to read file' }, 500)
        }

        c.header('Content-Type', contentType)

        const stream = new ReadableStream({
            start(controller) {
                for (let byte of byteArray) {
                    controller.enqueue(byte)
                }
                controller.close()
            },
        })

        return c.body(stream, OK)
    } catch (error) {
        return c.json({ error: 'Failed to read file' }, 500)
    }
})

app.delete('/v1/upload/:key', async (c) => {
    const { key } = c.req.param()
    try {
        await deleteS3File(key)
        return c.json({ message: 'File deleted successfully' }, OK)
    } catch (error) {
        return c.json(
            { message: 'Failed to delete file' },
            INTERNAL_SERVER_ERROR,
        )
    }
})

export default app
