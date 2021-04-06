

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

let jsonObjs = [];

db.serialize(() => {
  db.each('SELECT id, json FROM DestinySeasonDefinition', function (err, row){
    // console.log(row.id + ': ' + row.json + '\n');
    // console.log(row.id + ': ' + JSON.parse(row.json) + '\n');
    jsonObjs.push(JSON.parse(row.json));
  });

});


db.close( () => {
  console.log('JSON objs');
  // console.log(jsonObjs[0]);

  for( let o of jsonObjs ){
    if(o.index === 0){
      continue;
    }
    let msg = o.seasonNumber + ' ' ;
    if(o.redacted ){
      msg += ' [redacted]';
    } else {
      msg += o.displayProperties.name;
    }
    console.log(msg);
  }

});
//module.exports = db;  // var db = require("./database.js")






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