const express = require('express');
const router = express.Router();
const transcriptController = require("../controllers/transcriptController");

require("dotenv").config();

router.get("/search", async (req, res) => { res.render("transcripts/search") })
router.get("/vods/all",  transcriptController.render_all_vods);
router.get("/vods/:id", transcriptController.get_vod_by_id);
router.get("/clips/:id", transcriptController.get_clip_by_id);
router.get("/api/search", transcriptController.search_keywords);
router.get("/editors-choice", transcriptController.render_editors_choice);
router.get("/honorable-mentions", transcriptController.render_honorable_mentions);
router.get("/cdn/allvids", transcriptController.updateDbWithS3_Main);



module.exports = router;















    // not working http://localhost:3000/vods/631b1e9ad0f891998d449c7b
    // not working http://localhost:3000/vods/631b297e4cfec30d539ae367

    // Fake chall
    // ObjectId("631b1e98d0f891998d43963b
    // ObjectId("631b29784cfec30d539a5d0f
    // ObjectId("631b297a4cfec30d539aa3a5
    // ObjectId("631b297e4cfec30d539ad804
    // ObjectId("631b297e4cfec30d539ae07a 
    // ObjectId("631b297f4cfec30d539aeafc
    // ObjectId("631b297e4cfec30d539ae0a0
    // ObjectId("631b297f4cfec30d539aeafd
    // ObjectId("631b297f4cfec30d539aeb75
    // ObjectId("631b297e4cfec30d539ae3f7
    // ObjectId("631b297e4cfec30d539ae478
    // ObjectId("631b29774cfec30d539a5a73 ???
    // ObjectId("631b297d4cfec30d539acc8a
    // ObjectId("631b29774cfec30d539a2b96
    // ObjectId("631b297a4cfec30d539aa6e8
    // ObjectId("631b297a4cfec30d539aa6fc
    // ObjectId("631b29774cfec30d539a39f5 macro easy
    // ObjectId("631b29774cfec30d539a2eb4
    // ObjectId("6319d32fdea50b763ba2534a



    // 1st humble ever
    // ObjectId("631b29794cfec30d539a7f2d

    // honorabl mention (i have no life)


    // NOT CHALL ANY MORE - season 9
    // ObjectId("631b297d4cfec30d539ad15e
    // ObjectId("631b297e4cfec30d539ad714
    // ObjectId("631b297a4cfec30d539aa56b
    // ObjectId("631b297a4cfec30d539aa6fc
    // ObjectId("631b297a4cfec30d539aa714
    // ObjectId("631b297a4cfec30d539aa277
    // ObjectId("631b1e9ad0f891998d4471bf
    // ObjectId("631b1e99d0f891998d43df07


