import aws from 'aws-sdk'
import fs from 'fs'
import path from 'path'
import { promisify } from 'util'
import { Iimage } from '../model/Iimage'

const { APP_URL, STORAGE_TYPE, AWS_BUCKET_NAME } = process.env

const s3 = new aws.S3()
const unlinkAsync = promisify(fs.unlink)

export class Storage {
//   static async remove(post: Iimage) {
    // try {
    //   if (STORAGE_TYPE === 's3' && !post.url.startsWith(APP_URL)) {
    //     await s3
    //       .deleteObject({
    //         Bucket: AWS_BUCKET_NAME,
    //         Key: post.key
    //       })
    //       .promise()
    //   } 
    //   else {
    //     const filePath = path.resolve(__dirname, '..', '..', 'tmp', post.key)
    //     await unlinkAsync(filePath)
    //   }
    // } catch (error) {
    //   console.error(`Failed removing image "${post.key}"`, error)
    // }
//   }
}
