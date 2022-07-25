


const axios = require('axios').default;
const fs = require('fs');
const path = require('path');


const bungieBaseURL = 'https://www.bungie.net';
const bungieManifestURL = bungieBaseURL + '/platform/Destiny2/Manifest';
// const dbFileName = 'world_sql_content.db';

const directoryName = path.basename(__dirname);

const axiosConfig = {
  method: 'get',
  url: '',
  headers: {
    'X-API-KEY' : 'b556e93f437c49febdf1e10af4b284e3'
  },
  responseType: 'json'
};

const manifestConfig = axiosConfig;
manifestConfig.url = bungieManifestURL;

//https://www.bungie.net/platform/Destiny2/common/destiny2_content/sqlite/en/world_sql_content_c1d4ac435e5ce5b3046fe2d0e6190ce4.content
//https://www.bungie.net/common/destiny2_content/sqlite/en/world_sql_content_c1d4ac435e5ce5b3046fe2d0e6190ce4.content

axios(manifestConfig)
  .then( (response) => { 
    // Donwload - Manifest - en
    const dbFileName = response.data.Response.mobileWorldContentPaths.en;
    const dbPath = bungieBaseURL + dbFileName;
    console.log(dbPath);

    // db version check - False = outdated
    checkDbVersion(dbFileName).then(updateRequired =>{
      console.log('READY to DOWNLOAD? : ' + updateRequired);
      
      if(updateRequired){
        // db Download Setup
        const dbConfig = axiosConfig;
        dbConfig.url = dbPath;
        dbConfig.responseType = 'stream';  
        // execute download - db
        axios(dbConfig).then( (response) => {
          // Set download folder for new DB file
          let newDbFileName = "world_en.db";
          newDbFileName = `./${directoryName}/${newDbFileName}`;
          
          // Download - Content DB
          try{
            response.data.pipe(fs.createWriteStream(newDbFileName));
          } catch(err){
            console.log("try to execute 'npm run dbDownloader' from project root dir");
            console.error(err);
          }
        });

        updateDbVersion(dbFileName); 
      }
    });
  })

function checkDbVersion (fileName) {
  return new Promise((resolve) => {
    fs.readFile('db_versionInfo.txt', "UTF-8", (err, buf) => {
      // update required
      if( buf !== fileName){
        console.log('different version exist');
        resolve(true);
      }
      // db is up-to-date
      else{
        console.log('the current version is up-to-date');
        resolve(false);
      }
    });
  });

}

function updateDbVersion (dbFileName){
  fs.writeFile('db_versionInfo.txt', dbFileName, 'UTF-8', (err) =>{
    if(err) console.log(err);
    console.log('db version info updated: ' + dbFileName);
  })
}

//response.data -> fs  
//https://stackoverflow.com/questions/55374755/node-js-axios-download-file-stream-and-writefile

  