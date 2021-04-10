

// let request = require('request');
// let fs = require('fs');

let sqlite3 = require('sqlite3').verbose();
// let db = new sqlite3.Database(':memory:');
// let db_en = 'world_sql_content/world_sql_content_95411fe3f93a8c687c6eab50c0e5c445.content';
const path = require('path');
let db_en = path.join(__dirname,'world_sql_content/world_sql_content.db');






let db = new sqlite3.Database(db_en, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.log('filepath: ' + db_en);
    console.error(err.message);
  }
  console.log('Connected to the DB');
});

db.jsonObjs = [];
db.itemInfo = [];



let routine = () => {
  // db.serialize(() => {

  //   console.log('db serialization');

  //   // //Season Definition
  //   // let q = 'SELECT id, json FROM DestinySeasonDefinition';
  //   // db.all(q, function (err, row){
  //   //   db.jsonObjs.push(JSON.parse(row.json));
  //   // });

  //   q = 'SELECT json FROM DestinyInventoryItemDefinition';
  //   db.all(q, [], (err, res) => {
  //     // itemInfo[row.id] = (JSON.parse(row.json));
  //     db.itemInfo = res;
  //   }).then( ()=> {
  //     console.log('item#: ' + db.itemInfo.length);
  //   });

  // });

  q = 'SELECT json FROM DestinyInventoryItemDefinition';
  db.all(q, [], (err, res) => {
    // itemInfo[row.id] = (JSON.parse(row.json));
    db.itemInfo = res;
    console.log('item#: ' + db.itemInfo.length);
  });
}

// routine();


db.getSeasons = () => {

  let q = 'SELECT json FROM DestinySeasonDefinition';

  return new Promise( (resolve, reject) => {

    db.all(q, [], (err, res) => {
      if ( err ) {
        console.log(err);
        reject(err);
      } else {
        let jsonObj = [];
        for (let o of res) {
          jsonObj.push(JSON.parse(o.json));
        }
        // resolve(res);
        resolve(jsonObj);
      }
    });
  });
}


//Sample Info
db.printSeasons = () => {
  db.getSeasons()
  .then(res => {

    console.log(res[0]);
    console.log(res[1]);
  });
};


//Huckleberry itemHash = 2286143274
//Posterity itemHash   = 3281285075
//Astral Horizon itemHash = 1697682876
// let printItemInfo = (itemHash=1697682876) => {
db.printItemInfo = (itemHash=4037745684) => {

  // routine();

  console.log('id: ' + itemHash); // console.log(jsonObjs[0]);
  console.log('item#: ' + db.itemInfo.length);

  console.log('info: ');
  let flag_search = false;
  for ( let o of db.itemInfo) {
    if( o.hash === itemHash) {
      console.log('Item Found');
      console.log(o);
      flag_search = true;
      break;
    }
  }
}



db.printItemInfo_Safe = (itemHash=1697682876) => {

  // routine();

  console.log('id: ' + itemHash); // console.log(jsonObjs[0]);

  q = 'SELECT json FROM DestinyInventoryItemDefinition';
  db.all(q, [], (err, res) => {

    db.itemInfo = [];
    console.log(res.length);

    for( let o of res) {
      db.itemInfo.push(JSON.parse(o.json));
    }

    console.log('info: ');
    let flag_search = false;
    for ( let o of db.itemInfo) {
      if( o.hash === itemHash) {
        console.log('Item Found');
        console.log(o);
        flag_search = true;
        break;
      }
    }
    if(!flag_search) {
      console.log('Item Not Found');
    }
  });
}

// db.close( () => {
//   printSeasonInfo();
//   printItemInfo();
// });

module.exports = db;  // var db = require("./database.js")






// db.serialize(function() {

  // db.run('CREATE TABLE lorem (info TEXT)');
  // var stmt = db.prepare('INSERT INTO lorem VALUES (?)');

  // for ( let i = 0; i<10; i++) {
  //   stmt.run('Ipsum ' + i);
  // }

  // stmt.finalize();

//   db.each('SELECT rowid AS id, info FROM lorem', function (err, row){
//     console.log(row.id + ': ' + row.info);
//   });
// });

// db.close();


/*
let en_path = 'world_sql_content/world_sql_content_95411fe3f93a8c687c6eab50c0e5c445.content';



function queryManifest(){
	let db = new sqlite.Database('manifest.content');


  const rawdb = db.getDatabaseInstance();
  rawdb.serialize(function(){
    console.log('db working?');
		let query = "SELECT name FROM sqlite_master WHERE type='table'";

		db.each(query, function(err, row){
			if(err){
        console.log(err);
        throw err;
      }

			console.log(row);

	});
}

*/