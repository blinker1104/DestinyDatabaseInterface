const ItemDAO = require('./db_item_DAO');
const ItemDB = require('./db_item');
const DestinyInventoryItemDAO = require('./d2_item_DAO');
const DestinyInventoryItemDB = require('./d2_item');


function ItemDB_generator() {

  const D2dao = new DestinyInventoryItemDAO();
  const D2ItemDB = new DestinyInventoryItemDB(D2dao);


  console.log('getALL?');
  D2ItemDB.getAll()
    .then((res)=>{
      console.log(res[0]);
      console.log(res.length);
    });
}



ItemDB_generator();