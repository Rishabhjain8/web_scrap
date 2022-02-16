const request = require("request");
const cheerio = require("cheerio");
const path = require("path");
const fs = require("fs");
const iplPath = path.join(__dirname, "ipl");
dirCreator(iplPath);
const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";
const scorecardObj = require('./scorecard');

request(url, cb);

function cb(err, response, html){
    if(err){
        console.log("Error: ", err);
    }
    else{
        extractHtml(html);
    }
}

function extractHtml(html){
    let $ = cheerio.load(html);
    let anchorElem = $('a[data-hover="View All Results"]');
    let link = anchorElem.attr('href');

    let fullLink = "https://www.espncricinfo.com/" + link;
    getAllMatchesLink(fullLink);
}

function getAllMatchesLink(url){
    request(url, function(err, respnse, html){
        if(err){
            console.log(err);
        }
        else{
            getExtractAllLink(html);
        }
    })
}

function getExtractAllLink(html){
    let $ = cheerio.load(html);
    let scorecardElems = $('a[data-hover="Scorecard"]');
    for(let i = 0;i < scorecardElems.length;i++){
        let link = scorecardElems.attr("href");
        let fullLink = "https://www.espncricinfo.com/" + link;
        // console.log(fullLink);

        scorecardObj.ps(fullLink);

    }
}

function dirCreator(filePath){
    if(fs.existsSync(filePath) == false){
        fs.mkdirSync(filePath);
    }
}