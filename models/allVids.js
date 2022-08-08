// const S3 = require('aws-sdk/clients/s3');

const AWS = require('aws-sdk');
const https = require('https');
const parseString = require('xml2js').parseString;

const bucketName = process.env.AWS_BUCKET_REGION;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

async function go() {
    const s3 = new AWS.S3({
        region,
        accessKeyId,
        secretAccessKey
    })
    
    console.log("s3 go")
    // console.log(s3)
    let params = { "Bucket": bucketName }
    
    // // let url = "https://d2h6hz1aakujaj.cloudfront.net/bifrost3d_clothed.png"
    // let url = "https://d2h6hz1aakujaj.cloudfront.net"
    // let request = await https.get(url, {headers: "application/xml"} , (response) => {
    //     let data = ''
    //     let i = 0
    //     response.on('data', function (chunk) {
    //         console.log("chunk ", i)
    //         i++
    //         data += chunk;
    //     });
    
    //     response.on('end', function () {
    //         // data = JSON.parse(data)
    //         console.log("data");
    //         console.log('statusCode:', response.statusCode);
    //         // console.log(data)
    //         if (response.statusCode >= 200 && response.statusCode < 300 ) {
    //             // && data.status.toLowerCase() == "completed"
    //             let content;
    //             console.log("trying to save....")
    //             // console.log("data", data)
    //             console.log("status", data?.status)
    //             parseString(data, function (err, result) {
    //                 console.dir(result)
    //                 content = result
    //             })
    //             console.log("returning". content);
    //             return content;
    //             // let xmlDoc = parser.parseFromString(data, "text/xml")
    //             // console.log("---------------")
    //             // console.log(xmlDoc)
    //         }
    //         // res.send(JSON.parse(data))
    //     }).on('error', (e) => {
    //         console.error(e);
    //         res.statusCode = 404
    //         res.json({error: "errorx"})
    //         // res.end('{error: "error"}')
    //         // res.end(JSON.stringify({error: "error"}))
    //     });
    //     console.log("?????????????????")
    // });
}

module.exports = { go };


// https://docs.aws.amazon.com/AmazonS3/latest/API/API_ListObjectsV2.html
// AWS Identity and Access Management (IAM) policy, you must have permissions to perform the s3:ListBucket action
// const response = s3.listObjectsV2(params, function(err, data) {
//     if (err) {
//         console.error("ripx", err);
//     }
//     else {
//         console.log(data)
//     }

// })
// console.log(response)

