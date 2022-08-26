const express = require('express');
// const https = require('node:https');
const https = require('https');
const router = express.Router();
const blogController = require("../controllers/blogController");
const { Transcript } = require('../models/transcript');
const { TranscriptParagraphs } = require('../models/transcript');
const { Captions } = require('../models/captions');
const { Captions2 } = require('../models/captions');
const common = require('../controllers/common.js');
const cors = require("cors");
require("dotenv").config();
const allVids = require("../models/allVids");
const parseString = require('xml2js').parseString;

const csv = require("csvtojson");



// https://api.assemblyai.com/v2/transcript/ouo2d25wgl-86ae-413c-93e0-ee50863c5545/sentences

// router.get('/transcript/:id/sentence', (req, res) => {


router.get("/allTsDbFull", async (req, res) => {

    let allTrans = await Transcript.find({});
    console.log("allTrans")
    console.log(allTrans)
    res.json(allTrans)
})

router.get("/allTranscriptsAAI", async (req, res) => {
    let qLimit = 69;
    let qStatus = "completed";
    let aiUrl = `https://api.assemblyai.com/v2/transcript?limit=${qLimit}&status=${qStatus}`
    let resMsg = await common.makeHttpRequest(aiUrl, { headers: { Authorization: authoriziation } });

    res.statusCode = resMsg.statusCode;
    resMsg.data['errorMsg'] = resMsg.errorMsg
    console.log("resMsg.data")
    console.log("resMsg.data")
    console.log(resMsg.data)
    let trimmedRes = resMsg.data.transcripts?.map( ts =>  ts.id )

    if ( resMsg.errorMsg) { 
        console.log("shiiiit something went wrong: " + resMsg.data['errorMsg'] ) 
        res.json(resMsg)
    }
    res.render("transcripts/allTrans", { allItems: trimmedRes })
    // res.json(resMsg.data)

})
router.get("/allTranscriptsDb", async (req, res) => {
    const filter = {};
    let allTransIds = await Transcript.find(filter, {id: 1, _id: 0});
    allTransIds = allTransIds.filter( x => x.id != null )
    allTransIds = allTransIds.map( x => x.id)
    console.log("allTransIds", allTransIds)
    res.render("transcripts/allTrans", { allItems: allTransIds })

})

const getItemFromDatabaseById = async (CollectionName, id) => {
    let result = await CollectionName.findOne({"id": id}).then( result =>  {
        console.log(result?.id)
        console.log(result?._id)
        // Check if in my Database
        return result;
    })
    console.log("did it wait???????????????")
    console.log("did it wait???????????????")
    console.log(result)
    return result
}
const saveToDb = (CollectionName) => {
    const transcript = new CollectionName(data);
    transcript.save().then( (result) => {
        console.log("save success!.")
        // resMsg = {
        //     statusCode: 200, 
        //     data: result
        // }
    })
    .catch( err => {
        console.log("(My error) Error occured", err)
        // resMsg = {
        //     statusCode: 500, 
        //     errorMsg: "Saving data to mongo failed :( " + err, 
        // }
    })
}



router.get("/transcript/:id/paragraphs", async (req, res) => {
    const id = req.params.id;
    const aiUrl = "https://api.assemblyai.com/v2/transcript/" + id + "/paragraphs";
    let resMsg = "";
    // let resMsg = await getItemFromDatabaseById(TranscriptParagraphs, aiUrl, id );
    if (resMsg == null || resMsg == "") { // It's not in DB, need to get from AssemblyAI
        console.log("RESULT NOT FOUND IN DB")

        console.log("00000 resMsg")
        resMsg = await common.makeHttpRequest(aiUrl, { headers: { Authorization: authoriziation } })

        // if (resMsg.statusCode >= 200 && response.statusCode < 300 ) {
        //     resMsg = await saveToDb(TranscriptParagraphs)
        // }
    }
    console.log("XXX resMsg")
    console.log("XXX resMsg")
    console.log("XXX resMsg")
    console.log("XXX resMsg")
    console.log( resMsg)
    res.statusCode = resMsg.statusCode;
    res.json(resMsg.data)
})
    
router.get('/transcript/:id', async (req, res) => {
    const id = req.params.id;
    const aiUrl = "https://api.assemblyai.com/v2/transcript/" + id;
    let result = await getItemFromDatabaseById(Transcript, id );
    console.log(result)
    console.log("result")
    console.log("result")
    console.log("result")
    // res.statusCode = resMsg.statusCode;
    res.json(result)
})


//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////    CDN VIDS       /////////////////////////
//////////////    CDN VIDS       /////////////////////////
//////////////    CDN VIDS       /////////////////////////
//////////////    CDN VIDS       /////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////



router.get("/test/getMahercsv", async (req, res) => {
    let csvUrl = process.env.CDN_DOMAIN + "/vids/maherTest/maherecsv.csv";
    res.writeHead(302, {
        'Location': csvUrl
      });
      res.end();
})

/* --------------------------------- */
/* --------------------------------- */
/*     FOLDER STRUCTURE OF 'vid/'    */
/* --------------------------------- */
/* --------------------------------- */
// vid/ ┐ 
//      ┣ <folder-name> ┐
//      ┃               ┣ transcript>.csv
//      ┃               ┖ <vid-name>.mp4
//      ┣ 123-a7x9-019  ┐
//      ┃               ┣ transcript_XYZ.csv
//      ┃               ┖ vid.mp4
//      ┣ gera-short-stream ┐
//      ┃                   ┣ transcript_000.csv
//      ┃                   ┖ gera-short-stream.mp4


// vids/283498290/someVid.mp4
// vids/283498290/someCsv.mp4
// vids/maherTest/Real Time With Bill Maher Season 20 Episode 22 HBO Bill Maher Aug 5, 2022 FULL 720p.mp4
// vids/maherTest/maherecsv.csv



const getFolderContents = (folderName, allItemsS3) => {
    // s3Item = 'vids/maherTest/maherecsv.csv', 
    // folderName = maherTest
    let filt = allItemsS3.filter( s3Item => {
        console.log("s3Item ===>", s3Item)
        console.log("name ??????", folderName )
        return s3Item.includes(folderName)
    })
    console.log("DONE ", filt)
    
}


const getAllBucketsHack = (itemPath) => {
    console.log("------", itemPath, "------")
    const S3_vid_path = "vids/";
    if ( !itemPath.includes(S3_vid_path)) {
        return;
    }
    let split = itemPath.split("/")
    let half_1st = split[0];
    let bucketName = split[1];
    let half_3rd = split.slice(2).join('/');
    // console.log("buckets - half 1st", half_1st)
    // console.log("buckets - half 2nd", bucketName)
    // console.log("buckets - half 3rd", half_3rd)
    return bucketName
}

const parseIdFromName = (itemPath) => {
    console.log("------", itemPath, "------")
    const S3_vid_path = "vids/";
    if ( !itemPath.includes(S3_vid_path)) {
        return;
    }


    getAllBucketsHack(itemPath)
    // if (itemPath.toUpperCase().indexOf("_ID_") != -1) {
    //     return parseIdFromName_OLDASSEBMLY();
    // }
    // // let split = itemPath.split('/')

    // let idx = itemPath.indexOf(S3_vid_path) + S3_vid_path.length;
    
    // let half_2nd = itemPath.slice(idx);          // 'maherTest/Real Time With Bill Maher Season 20 Episode 22 HBO Bill Maher Aug 5, 2022 FULL 720p.mp4'
    // let half_1st = itemPath.slice(0, idx);      // 'vids/'
    // console.log("half_1st", half_1st);
    // console.log("half_2nd", half_2nd); 
    // let idx2 = half_2nd.indexOf('/');
    // let folderName = half_2nd.slice(0,idx2)
    // // let folderName = itemPath.slice(0,idx2)
    // // console.log("itemPath")
    // console.log("idx2", idx2)
    // console.log("folderName", folderName)

}
//  All s3 items should be formated as <id>_ID_<name>
const parseIdFromName_OLDASSEBMLY = (s3Name) => {
    let idx = s3Name.toUpperCase().indexOf("_ID_");
    if (idx == -1) {
        return {id: null, name: s3Name }
    }
    let name = s3Name.substring(idx+4);
    let id = s3Name.substring(0,idx);
    return {id, name}

}

router.get("/cdn/allvids", (req, res) => {
    console.log(allVids)
     // let url = "https://d2h6hz1aakujaj.cloudfront.net/bifrost3d_clothed.png"
     let url = "https://d2h6hz1aakujaj.cloudfront.net";
     let request = https.get(url, {headers: "application/xml"} , (response) => {
         let data = ''
         response.on('data', function (chunk) {
             data += chunk;
         });
     
         response.on('end', function () {
             if (response.statusCode >= 200 && response.statusCode < 300 ) {
                 // using xml2js
                 parseString(data, function (err, result) { 
                    console.log("Everythign from cd")
                    console.log(2)
                    // 1. only grab items, not folders (folders end in '/')
                    let allItemsS3 = result?.ListBucketResult?.Contents?.filter( item => { 
                        return (item.Key[0].slice(-1) != "/") 
                    })
                    console.log(2)
                    // 2. item.Key is an array for some reason. Fix that.
                    allItemsS3 = allItemsS3.map( item => { 
                        return (item.Key[0] ); 
                    })
                    
                    console.log(3)
                    let allVids2 = allItemsS3.map (itemPath => { return parseIdFromName(itemPath) })


                    let allFolders = allItemsS3.map (itemPath => { return getAllBucketsHack(itemPath) })
                    allFolders = allFolders.filter (folder => { return folder != null })
                    allFolders = [...new Set(allFolders)]

                    let folderConents = allFolders.map (folder => { return getFolderContents(folder, allItemsS3)  })
                     
                    console.log("allFolders")
                    console.log(allFolders)
                    console.log(4)
                    console.log("allItemsS3")
                    console.log(allItemsS3)
                    console.log("allVids2")
                    console.log(allVids2)
                    res.send("end, gg ty")
                    //  res.render("videos/all", {allVids})
                 })
             }
             // res.send(JSON.parse(data))
         }).on('error', (e) => {
             console.error(e);
             res.statusCode = 404
             res.json({error: "Failed to get all vids :("})
         });
     });    
})


module.exports = router;

