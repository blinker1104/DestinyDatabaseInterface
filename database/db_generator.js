// let fs = require('fs');

let sqlite3 = require('sqlite3').verbose();
// let db = new sqlite3.Database(':memory:');
// let db_en = 'world_sql_content/world_sql_content_95411fe3f93a8c687c6eab50c0e5c445.content';
const path = require('path');
let db_en = path.join(__dirname,'world_sql_content/world_sql_content.db');


let db_item = path.join(__dirname,'simplified_content/itemDB.db');



let itemDB_generator = () => {






  //Item DB
  let itemDb = new sqlite3.Database(db_item, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.log('filepath: ' + db_item);
      console.error(err.message);
    }
    console.log('Connected to the itemDB');
  });


  // //Huckleberry itemHash = 2286143274
  // //Posterity itemHash   = 3281285075
  // //Astral Horizon itemHash = 1697682876
  // // let printItemInfo = (itemHash=1697682876) => {
  // db.printItemInfo_Safe = (itemHash=1697682876) => {

  //   console.log('id: ' + itemHash);

  //   q = 'SELECT json FROM DestinyInventoryItemDefinition';
  //   db.all(q, [], (err, res) => {

  //     db.itemInfo = [];
  //     console.log(res.length);

  //     for( let o of res) {
  //       db.itemInfo.push(JSON.parse(o.json));
  //     }

  //     console.log('info: ');
  //     let flag_search = false;
  //     for ( let o of db.itemInfo) {
  //       if( o.hash === itemHash) {
  //         console.log('Item Found');
  //         console.log(o);
  //         flag_search = true;
  //         break;
  //       }
  //     }
  //     if(!flag_search) {
  //       console.log('Item Not Found');
  //     }
  //   });
  // };


  let initItemDB = () => {

      //Manifest
    let db = new sqlite3.Database(db_en, sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        console.log('filepath: ' + db_en);
        console.error(err.message);
      }
      console.log('Connected to the ManifestInventoryDB');
    });

    db.serialize(() => {
      q = 'SELECT json FROM DestinyInventoryItemDefinition';
      db.all(q, [], (err, res) => {
        let itemInfo = [];
        let itemData = [];
        for( let o of res) {
          itemInfo.push(JSON.parse(o.json));
        }


        let counter = 0;
        for ( let o of itemInfo) {
          if(o.inventory.isInstanceItem){

            // Item DB format
            let temp = {
              id:       o.hash,
              name:     o.displayProperties.name,
              hasIcon:  o.displayProperties.hasIcon,
              icon:     o.displayProperties.icon
            };

            console.log(temp);
            counter ++;
          }
          if(counter > 100) {
            break;
          }
        }


      });

      db.close();
    });
  };

  initItemDB();
};




itemDB_generator();