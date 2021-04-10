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
      const itemDAO = new ItemDAO();
      const itemDB = new ItemDB(itemDAO);

      // itemDB.createTable()
      //   .then(()=>{
      //     for (let o of res) {
      //       const r = JSON.parse(o.json);
      //       if(r.inventory.isInstanceItem) {
      //         const t = {
      //           id:       r.hash,
      //           name:     r.displayProperties.name,
      //           hasIcon: (r.displayProperties.hasIcon ? 1 : 0),
      //           icon:     r.displayProperties.icon
      //         };

      //         itemDB.create(t.id, t.name, t.hasIcon, t.icon)
      //           .then((err) => {
      //             if(err) {
      //               return console.log(err.message);
      //             }
      //             console.log( 'item ' t.name + ' added to ItemDB');
      //           });
      //       }
      //   });



      itemDB.init()
        .then(()=>{
          for (let o of res) {
            const r = JSON.parse(o.json);
            if(r.inventory.isInstanceItem) {
              const t = {
                id:       r.hash,
                name:     r.displayProperties.name,
                hasIcon: (r.displayProperties.hasIcon ? 1 : 0),
                icon:     r.displayProperties.icon
              };

              itemDB.create(t.id, t.name, t.hasIcon, t.icon)
                .then((err) => {
                  if(err) {
                    return console.log(err.message);
                  }
                  // console.log(`Item  ${t.name} added to ItemDB`);
                });
            }
          }
        });
    });
}



function ItemDB_test() {
  const itemDAO = new ItemDAO();
  const itemDB = new ItemDB(itemDAO);


  // console.log('itemDB Test');
  // itemDB.getAll()
  //   .then((res) => {
  //     console.log(res.length);
  //     let cnt = 0;
  //     for(let o of res) {
  //       console.log(o);
  //       if(cnt++ > 10) break;
  //     }
    // });

    //ASTRAL HORIZON
  // itemDB.getById(1697682876)
  //   .then((res) => console.log(res));
}


ItemDB_generator();
// ItemDB_test();