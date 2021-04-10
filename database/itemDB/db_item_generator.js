const ItemDAO = require('./db_item_DAO');
const ItemDB = require('./db_item');
const DestinyInventoryItemDAO = require('./d2_item_DAO');
const DestinyInventoryItemDB = require('./d2_item');


const D2dao = new DestinyInventoryItemDAO();
const D2ItemDB = new DestinyInventoryItemDB(D2dao);

const itemDAO = new ItemDAO();
const itemDB = new ItemDB(itemDAO);



const decodeIteminfo = (r) => {
  return {
    id:       r.hash,
    name:     r.displayProperties.name,
    type:     r.itemTypeAndTierDisplayName,
    hasIcon: (r.displayProperties.hasIcon ? 1 : 0),
    icon:     r.displayProperties.icon
  };
}

function ItemDB_generator() {

  D2ItemDB.getAll()
    .then((res)=>{
      itemDB.init()
        .then((err)=>{
          if(err) {
            return console.log('ItemDB - init error: ', err);
          }
          for (let o of res) {
            const r = JSON.parse(o.json);
            if(r.inventory.isInstanceItem) {
              const t = decodeIteminfo(r);
              itemDB.create(t.id, t.name, t.type, t.hasIcon, t.icon);
            }
          }
        });
    });
}



function ItemDB_test() {
  const itemDAO = new ItemDAO();
  const itemDB = new ItemDB(itemDAO);


  console.log('itemDB Test');
  itemDB.getAll()
    .then((res) => {
      console.log(res.length);
      let cnt = 0;
      for(let o of res) {
        console.log(o);
        if(cnt++ > 20) break;
      }
    });

    //ASTRAL HORIZON
  itemDB.getById(1697682876)
    .then((res) => console.log(res));
}


ItemDB_generator();
// ItemDB_test();