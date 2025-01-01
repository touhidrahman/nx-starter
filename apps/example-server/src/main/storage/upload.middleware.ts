// import { createMiddleware } from 'hono/factory'
// import { uploadToS3AndGetUrl } from '../../core/third-party/s3.services';

// export const uploadMiddleware = createMiddleware(async (c, next) => {
//     const body = await c.req.parseBody({ all: true });
//     const file = body['file'];
//     if (file instanceof Array) {
//         for await (const f of file) {
//             const url = await uploadToS3AndGetUrl(f as File)
//         }
//     }
//     if (!file) {
//         return res.status(400).json({ message: 'No file uploaded' });
//     }
//     await next();
// })
