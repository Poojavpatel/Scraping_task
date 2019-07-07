const express = require('express');
const {Ytlist} = require('../models/youtube_list');
const {Parser} = require('json2csv');
const router = express.Router();

//GET requests 
// url 'localhost:5000/csv/'
router.get('/',async (req ,res) => {
    Ytlist.find({},(err,doc)=>{
        // dataarray = JSON.stringify(doc);
        const fields = ['_id','name', 'subscribers', 'videos'];
        const json2csvParser = new Parser({ fields });
        const mycsv = json2csvParser.parse(doc);
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-disposition', 'attachment; filename=report.csv');
        res.status(200).send(mycsv);
    });
});

module.exports = router ;