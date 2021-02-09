require("dotenv").config();
const express = require('express');
const router = express.Router();
const patDtsCont = require('../controllers/patDetsCont');
const upload = require('../controllers/repUploadCont');
const uplReport = require('../models/patReport');
//const doct = require('../controllers/docCont');
const path = require('path');
const AWS = require("aws-sdk");
//const webview = require('webview');
var fs = require('fs');

// routes for patient details

// POST request to create patient details
router.post('/patients/create', patDtsCont.patDetsValidate('create_patDets'), patDtsCont.create_patDets);

// GET request to display the specific patient details 
router.get('/patients/:id', patDtsCont.patDets);

// GET request to display all the patient details
router.get('/patients', patDtsCont.allPatDets);

// PUT request to update the specific patient details
router.put('/patients/:id/update', patDtsCont.patDetsUpd);

// DELETE request to delete the specific patient details
router.delete('/patients/:id/delete', patDtsCont.patDetsDel);

router.post('/doctors/uploadReport', upload.single('report'), async(req, res) => {
    try {
    const report = req.file;
    const reportpath = req.file.location;
    //const patient = req.body.userId

    const newReport = new uplReport({report, reportpath});

    const savedReport = await newReport.save();
                // req.flash("success", "PDF successfully uploaded");
                res.json({message: 'success', report: savedReport, reportpath: reportpath})
                //res.render("displayPage",  {savedReport: report, path: reportpath});
    }catch(err){
        res.json({status: 'Upload failed', err: err.message})
    } 
});

// GET request to download the patient report
router.get('/doctors/reports/download/:dlKey', function(req, res, next){
    // download the file via aws s3 here
    const dlkey = req.params.dlKey;

    //console.log('Trying to download file', fileKey);
    //var AWS = require('aws-sdk');
    AWS.config.update(
      {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_ACCESS_SECRET,
        region: 'ap-south-1'
      }
    );
    var s3 = new AWS.S3();
    const params = {
        Bucket : process.env.BUCKET_NAME,
        Key    : dlkey
    }

    uplReport.findOne({'report.key': dlkey})
    .then(() => 
    {
   const readStream = s3.getObject(params).createReadStream();
   const writeStream = fs.createWriteStream(path.join(__dirname, '../report_download/'+ dlkey));
   readStream.pipe(writeStream);
   res.json({message: 'success'})
}).catch(err => res.json({err: err.message}));
    
});

module.exports = router;
