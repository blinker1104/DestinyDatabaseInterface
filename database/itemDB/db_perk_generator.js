const PerkDAO = require('./db_item_DAO');
const PerkDB = require('./db_item');
const DestinyInventoryPerkDAO = require('./d2_perk_DAO');
const DestinyInventoryPerkDB = require('./d2_perk');

const D2dao = new DestinyInventoryPerkDAO();
const D2PerkDB = new DestinyInventoryPerkDB(D2dao);

const perkDAO = new PerkDAO();
const perkDB = new PerkDB(perkDAO);



const decodePerkinfo = (r) => {
  return {
    id:       r.hash,
    name:     r.displayProperties.name,
    desc:     r.displayProperties.description,
    hasIcon: (r.displayProperties.hasIcon ? 1 : 0),
    icon:     r.displayProperties.icon
  };
}

function PerkDB_generator() {

  D2PerkDB.getAll()
    .then((res)=>{
      perkDB.init()
        .then((err)=>{
          if(err) {
            return console.log('ItemDB - init error: ', err);
          }
          for (let o of res) {
            const t = decodePerkinfo(JSON.parse(o.json));
            perkDB.create(t.id, t.name, t.desc, t.hasIcon, t.icon);
          }
        });
    });
}



function PerkDB_test() {

  console.log('itemDB Test');
  perkDB.getAll()
    .then((res) => {
      console.log(res.length);
      let cnt = 0;
      for(let o of res) {
        console.log(o);
        if(cnt++ > 20) break;
      }
    });

  // FullChoke?
  // perkDB.getById(1697682876)
  //   .then((res) => console.log(res));
}


ItemDB_generator();
// ItemDB_test();







