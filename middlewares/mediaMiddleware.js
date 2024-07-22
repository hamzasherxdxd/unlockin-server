const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const dotenv = require("dotenv");
// import aws from "aws-sdk";
// import multer from "multer";
// import multerS3 from "multer-s3";
// import dotenv from 'dotenv'
dotenv.config();

aws.config.update({
  secretAccessKey: process.env.S3_SECRETKEY,
  accessKeyId: process.env.S3_ACCESSKEY,
  region: "us-east-2",
  correctClockSkew: true,
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "unlockinbucket",
    acl: 'public-read',
    metadata: (req, file, cb) => {
      cb(null, { fieldname: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString());
    },
  }),
});
console.log(upload);

module.exports = upload;
