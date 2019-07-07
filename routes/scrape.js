const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const path = require("path");
const {Ytlist} = require('../models/youtube_list');
const router = express.Router();

var scrapeMore = async function(limit) {
    var urls = [];
    for (var i=2; i < limit+2; i++) {
        let url = `https://www.socialbakers.com/statistics/youtube/channels/india/page-${i}/`;
        urls.push(url);
    }
    console.log("urls",urls);
    urls.map(a);
}

a = async function(url){
    axios.get(url)
    .then(response => {
        scrapeData(response.data);
    })
    .catch(err => console.log(err));
}

function scrapeData(html){
    const $ = cheerio.load(html);
    $('table.brand-table-list tr').not('tr.replace-with-show-more').each((i,row) => {
        const ytlist = new Ytlist({
            name : $(row).find('td.name h2').text(),
            subscribers :$(row).find('span:contains("Subscribers")').parent().text().replace(/Subscribers/g,"").replace(/[\n\r\t]/g,''),
            videos :$(row).find('td strong').text().trim().replace(/[\n\r\t]/g,'')
        })
        ytlist.save()
        .catch(err => console.log("only unique values saved"));
    })
}


//GET requests 
// url 'localhost:5000/scrape/'
router.get('/',async (req ,res) => {
    axios.get('https://www.socialbakers.com/statistics/youtube/channels/india/')
    .then(response => {
        scrapeData(response.data);
        scrapeMore(5);
    })
    .catch(error => {
        console.log(error);
    });
    res.sendFile(path.join(__dirname+'/../static/scrape.html'));
});

// Exploring structure
// .brand-table-placeholder > table.brand-table-list > all tr >  td.name, td div.item, td div.item
// tr.replace-with-show-more > div.more-center-link > a
// https://www.socialbakers.com/statistics/youtube/channels/india/page-3/?do=platformList-renderAjax   .content  sno 21 to 30
// https://www.socialbakers.com/statistics/youtube/channels/india/page-2/?do=platformList-renderAjax   .content sno 11 to 20

module.exports = router ;