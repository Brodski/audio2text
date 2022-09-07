
const https = require('https');



/*
 * Takes in: "challenger every season" ===> finds exactly that string
 * Takes in: "a lot of money OR challenger OR richer" ===> finds any of those strings
 */
const processQuery = (querySearch) => {
    if (querySearch == null || querySearch == "") {
        return
    }
    console.log("--------------QUERY ----------------")
    console.log(querySearch)
    querySearch = querySearch.trim()
    console.log("q0", querySearch)
    querySearch = querySearch.replaceAll(/\sOR\s/gmi, '|') // syntax stuff for "OR"
    console.log("q1", querySearch)
    querySearch = querySearch.replaceAll(/[^a-zA-Z\s|']/gmi, '') // shitty sanatize, remove all goofy characters and symbols
    console.log("q2", querySearch)
    querySearch = querySearch.replaceAll(/\s+/gmi, ' ') // replace multiple spaces with just 1 space, eg) "more    money"=> "more money"
    console.log("q3", querySearch)
    // querySearch = querySearch.replace(/\s/gmi, '|') // replace spaces with OR operator, eg) "chall dog rich" => "chall|dog|rich"
    // console.log("q4", querySearch)
    return querySearch;
}




const errorHandler = (response, data) => {
    let statusCode = "";
    let errorMsg = "";
    if (response.statusCode >= 200 && response.statusCode < 300 ) { // && data?.status?.toLowerCase() != "completed"
        console.log("(409) conflict request. Transcription not complete, status code: ", response.statusCode)
        statusCode = 400;
        errorMsg = "Transcription not complete :/";
    }
    else if (response.statusCode >= 400 || response.statusCode < 500) {
        console.log("(400) bad request, status code: ", response.statusCode)
        statusCode = 400;
        errorMsg = "Bad request :( ...Likely wrong ID ";
    }
    else if (response.statusCode > 500) {
        console.log("(500) Assembly AI server error, status code: ", response.statusCode)
        statusCode = 500;
        errorMsg = "Assembly AI broke :(";
    } else {
        console.log("(400) Generic fail, status code: ", response.statusCode)
        statusCode = 400;
        errorMsg = "Generic 400";
    }
    return {statusCode, errorMsg}
}



const makeHttpRequest = async (myUrl, optionz, isCsv = false) => {
    console.log(" ##########################################################" )
    console.log("---------------------------> Requesting: ", myUrl)
    console.log(" #" )
    return new Promise(function (resolve, reject) {
        console.log("PROMISE! ")
        let options;
        // if (optionz != null) {
        //     options = optionz != null ? optionz : {};
        // }
        options = optionz != null ? optionz : {};
        let request = https.get(myUrl, options, (response) => {
            // console.log('statusCode:', response.statusCode);
            let data = ''
            response.on('data', function (chunk) {
                // console.log("chunk ", chunk.slice(0,20))
                data += chunk;
            });
        
            response.on('end', function () {
                resMsg = {}
                console.log("Comleted Common.js ", response.statusCode, myUrl)
                // data = isCsv ? data : JSON.parse(data);
                delete data.words
    
                if (response.statusCode >= 200 && response.statusCode < 300 ) { // && data?.status?.toLowerCase() == "completed"
                    resMsg = { statusCode: 200 }
                    resMsg['data'] = data;
                    resolve(resMsg);
                } 
                else {
                    let {statusCode, errorMsg} = errorHandler(response)
                    resMsg = { statusCode, errorMsg, }
                    resMsg['data'] = data;
                    reject(resMsg)
                }
            });
        })
        request.on('error', (e) => {
            console.error(e);
            resMsg = { statusCode: 404, errorMsg:  "error making request to AssemblyAI " + e }
            resMsg['data'] = data;
            reject(resMsg)
        });
    })
}



module.exports = {processQuery, makeHttpRequest};