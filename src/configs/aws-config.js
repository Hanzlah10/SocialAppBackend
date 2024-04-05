const { S3Client } = require("@aws-sdk/client-s3");
const express = require('express')
const multer = require('multer')
const multerS3 = require('multer-s3')
const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_BUCKET_NAME } = require('./ServerConfig')
const s3Client = new S3Client({
    region: "ap-south-1",
    credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY
    }
})
const upload = multer({
    storage: multerS3({
        s3: s3Client,
        bucket: AWS_BUCKET_NAME,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
})
module.exports = { upload }