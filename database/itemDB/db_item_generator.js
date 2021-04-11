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
            const t = decodeIteminfo(JSON.parse(o.json));
            itemDB.create(t.id, t.name, t.type, t.hasIcon, t.icon);
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
  //       if(cnt++ > 20) break;
  //     }
  //   });

  //   //ASTRAL HORIZON
  // itemDB.getById(1697682876)
  //   .then((res) => console.log(res));

  // //Full Choke - 1047830412
  // itemDB.getById(1047830412)
  //   .then((res) => console.log(res));

  // //Accurized - 2635532173
  // itemDB.getById(2635532173)
  //   .then((res) => console.log(res));

  let plug = [
    684616255,
    2931483505,
    2285418970];


  //[684616255];// [3054949324, 1047830412, 3142289711, 3161816588, 47981717, 4248210736, 2323986101, 4003264426];
  for(let p of plug){
    itemDB.getById(p)
    .then((res) => console.log(res));
  }
}


// ItemDB_generator();
ItemDB_test();

/*
//3054949324 - shot package

"socketEntries":[{"socketTypeHash":3956125808,"singleInitialItemHash":3054949324,"reusablePlugItems":[],"preventInitializationOnVendorPurchase":false,"preventInitializationWhenVersioning":false,"hidePerksInItemTooltip":false,"plugSources":6,"reusablePlugSetHash":1295,"overridesUiAppearance":false,"defaultVisible":true},{"socketTypeHash":3362409147,"singleInitialItemHash":1047830412,"reusablePlugItems":[],"preventInitializationOnVendorPurchase":false,"preventInitializationWhenVersioning":false,"hidePerksInItemTooltip":false,"plugSources":6,"reusablePlugSetHash":637,"overridesUiAppearance":false,"defaultVisible":true},{"socketTypeHash":3815406785,"singleInitialItemHash":3142289711,"reusablePlugItems":[],"preventInitializationOnVendorPurchase":false,"preventInitializationWhenVersioning":false,"hidePerksInItemTooltip":false,"plugSources":6,"reusablePlugSetHash":502,"overridesUiAppearance":false,"defaultVisible":true},{"socketTypeHash":2614797986,"singleInitialItemHash":3161816588,"reusablePlugItems":[],"preventInitializationOnVendorPurchase":false,"preventInitializationWhenVersioning":false,"hidePerksInItemTooltip":false,"plugSources":6,"reusablePlugSetHash":784,"overridesUiAppearance":false,"defaultVisible":true},{"socketTypeHash":2614797986,"singleInitialItemHash":47981717,"reusablePlugItems":[],"preventInitializationOnVendorPurchase":false,"preventInitializationWhenVersioning":false,"hidePerksInItemTooltip":false,"plugSources":6,"reusablePlugSetHash":1296,"overridesUiAppearance":false,"defaultVisible":true},{"socketTypeHash":1288200359,"singleInitialItemHash":4248210736,"reusablePlugItems":[],"preventInitializationOnVendorPurchase":false,"preventInitializationWhenVersioning":false,"hidePerksInItemTooltip":false,"plugSources":7,"reusablePlugSetHash":2,"overridesUiAppearance":false,"defaultVisible":true},

{"socketTypeHash":3939863699,"singleInitialItemHash":2323986101,"reusablePlugItems":[{"plugItemHash":4003264426},{"plugItemHash":299264772},{"plugItemHash":4278960718},{"plugItemHash":634781242},{"plugItemHash":1225726778},{"plugItemHash":1525622117},{"plugItemHash":1710791394},{"plugItemHash":3789184904},{"plugItemHash":3018373291}],

"preventInitializationOnVendorPurchase":true,"preventInitializationWhenVersioning":false,"hidePerksInItemTooltip":false,"plugSources":7,"reusablePlugSetHash":455349356,"overridesUiAppearance":false,"defaultVisible":true},{"socketTypeHash":2218962841,

"singleInitialItemHash":684616255,"reusablePlugItems":[],"preventInitializationOnVendorPurchase":true,"preventInitializationWhenVersioning":false,"hidePerksInItemTooltip":false,"plugSources":1,"overridesUiAppearance":false,"defaultVisible":true},{"socketTypeHash":2999483328,"singleInitialItemHash":2931483505,"reusablePlugItems":[],"preventInitializationOnVendorPurchase":false,"preventInitializationWhenVersioning":false,"hidePerksInItemTooltip":false,"plugSources":7,"reusablePlugSetHash":1297,"overridesUiAppearance":false,"defaultVisible":true},{"socketTypeHash":1282012138,"singleInitialItemHash":2285418970,"reusablePlugItems":[],"preventInitializationOnVendorPurchase":true,"preventInitializationWhenVersioning":false,"hidePerksInItemTooltip":false,"plugSources":6,"reusablePlugSetHash":5,"overridesUiAppearance":false,"defaultVisible":true}],


"intrinsicSockets":[{"plugItemHash":3690882495,"socketTypeHash":1726040302,"defaultVisible":true}],"socketCategories":[{"socketCategoryHash":3956125808,"socketIndexes":[0]},{"socketCategoryHash":4241085061,"socketIndexes":[1,2,3,4,9]},{"socketCategoryHash":2048875504,"socketIndexes":[5,8]},{"socketCategoryHash":2685412949,"socketIndexes":[6,7]}]},"talentGrid":{"talentGridHash":521135891,"itemDetailString":"Details","hudDamageType":1},"investmentStats":[{"statTypeHash":1480404414,"value":0,"isConditionallyActive":false},{"statTypeHash":1935470627,"value":0,"isConditionallyActive":false},{"statTypeHash":1885944937,"value":0,"isConditionallyActive":false},{"statTypeHash":3555269338,"value":12,"isConditionallyActive":false},{"statTypeHash":4284893193,"value":0,"isConditionallyActive":false},{"statTypeHash":4043523819,"value":90,"isConditionallyActive":false},{"statTypeHash":1240592695,"value":21,"isConditionallyActive":false},{"statTypeHash":155624089,"value":19,"isConditionallyActive":false},{"statTypeHash":3871231066,"value":0,"isConditionallyActive":false},{"statTypeHash":4188031367,"value":34,"isConditionallyActive":false},{"statTypeHash":1931675084,"value":34,"isConditionallyActive":false},{"statTypeHash":943549884,"value":26,"isConditionallyActive":false},{"statTypeHash":1345609583,"value":33,"isConditionallyActive":false},{"statTypeHash":2715839340,"value":62,"isConditionallyActive":false}],


"perks":[{"requirementDisplayString":"","perkHash":3486450016,"perkVisibility":0}],"loreHash":1179141605,"sum

*/


/*
id: 3054949324,
name: 'Shot Package',

id: 1047830412,
  name: 'Full Choke',

id: 3142289711,
name: 'Accurized Rounds',



id: 3161816588,
name: 'Slideshot',

706527188
Quickdraw



id: 47981717,
name: 'Opening Shot',





id: 4248210736,
  name: 'Default Shader',
id: 2323986101,
  name: 'Empty Mod Socket',

id: 2931483505,
  name: 'Default Ornament',
id: 684616255,
  name: 'Masterwork',
id: 2285418970,
  name: 'Tracker Disabled',

*/