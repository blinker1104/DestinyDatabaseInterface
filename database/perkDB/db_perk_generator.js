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





"preventInitializationOnVendorPurchase":false,"preventInitializationWhenVersioning":false,"hidePerksInItemTooltip":false,"plugSources":2,"randomizedPlugSetHash":2070940234,"overridesUiAppearance":false,"defaultVisible":true},{"socketTypeHash":2614797986,"singleInitialItemHash":3161816588,"reusablePlugItems":[{"plugItemHash":3161816588}]


//"socketTypeHash":2614797986,

{"displayProperties":{"description":"","name":"","hasIcon":false},"insertAction":{"actionExecuteSeconds":0,"actionSoundHash":0,"isPositiveAction":false,"actionType":0},"plugWhitelist":[{"categoryHash":7906839,"categoryIdentifier":"frames"}],"socketCategoryHash":4241085061,"visibility":0,"alwaysRandomizeSockets":false,"isPreviewEnabled":false,"hideDuplicateReusablePlugs":false,"overridesUiAppearance":false,"avoidDuplicatesOnInitialization":false,"currencyScalars":[],"hash":2614797986,"index":109,"redacted":false,"blacklisted":false}




"sockets":{"detail":"Details","socketEntries":[{"socketTypeHash":3956125808,"singleInitialItemHash":878286503,"reusablePlugItems":[],"preventInitializationOnVendorPurchase":false,"preventInitializationWhenVersioning":false,"hidePerksInItemTooltip":false,"plugSources":6,"reusablePlugSetHash":8,"overridesUiAppearance":false,"defaultVisible":true},{"socketTypeHash":3362409147,"singleInitialItemHash":1840239774,"reusablePlugItems":[{"plugItemHash":1840239774}],"preventInitializationOnVendorPurchase":false,"preventInitializationWhenVersioning":false,"hidePerksInItemTooltip":false,"plugSources":2,"randomizedPlugSetHash":295878355,"overridesUiAppearance":false,"defaultVisible":true},{"socketTypeHash":3815406785,"singleInitialItemHash":2420895100,"reusablePlugItems":[{"plugItemHash":2420895100},{"plugItemHash":3142289711}],"preventInitializationOnVendorPurchase":false,"preventInitializationWhenVersioning":false,"hidePerksInItemTooltip":false,"plugSources":2,"randomizedPlugSetHash":22229563,"overridesUiAppearance":false,"defaultVisible":true},{"socketTypeHash":2614797986,"singleInitialItemHash":1556840489,"reusablePlugItems":[{"plugItemHash":1556840489}],"preventInitializationOnVendorPurchase":false,"preventInitializationWhenVersioning":false,"hidePerksInItemTooltip":false,"plugSources":2,"randomizedPlugSetHash":1575733413,"overridesUiAppearance":false,"defaultVisible":true},{"socketTypeHash":2614797986,"singleInitialItemHash":3038247973,"reusablePlugItems":[{"plugItemHash":3038247973}],"preventInitializationOnVendorPurchase":false,"preventInitializationWhenVersioning":false,"hidePerksInItemTooltip":false,"plugSources":2,"randomizedPlugSetHash":2744704843,"overridesUiAppearance":false,"defaultVisible":true},{"socketTypeHash":1288200359,"singleInitialItemHash":4248210736,"reusablePlugItems":[],"preventInitializationOnVendorPurchase":false,"preventInitializationWhenVersioning":false,"hidePerksInItemTooltip":false,"plugSources":7,"reusablePlugSetHash":2,"overridesUiAppearance":false,"defaultVisible":true},{"socketTypeHash":2040251785,"singleInitialItemHash":2323986101,"reusablePlugItems":[{"plugItemHash":4003264426},{"plugItemHash":299264772},{"plugItemHash":4278960718},{"plugItemHash":634781242},{"plugItemHash":1225726778},{"plugItemHash":1525622117},{"plugItemHash":1710791394},{"plugItemHash":3789184904},{"plugItemHash":3018373291}],"preventInitializationOnVendorPurchase":true,"preventInitializationWhenVersioning":false,"hidePerksInItemTooltip":false,"plugSources":7,"reusablePlugSetHash":393254112,"overridesUiAppearance":false,"defaultVisible":true},{"socketTypeHash":2218962841,"singleInitialItemHash":684616255,"reusablePlugItems":[{"plugItemHash":1590375901},{"plugItemHash":1590375902},{"plugItemHash":1590375903},{"plugItemHash":1590375896},{"plugItemHash":1590375897},{"plugItemHash":1590375898},{"plugItemHash":1590375899},{"plugItemHash":1590375892},{"plugItemHash":1590375893},{"plugItemHash":384158423},{"plugItemHash":150943607},{"plugItemHash":150943604},{"plugItemHash":150943605},{"plugItemHash":150943602},{"plugItemHash":150943603},{"plugItemHash":150943600},{"plugItemHash":150943601},{"plugItemHash":150943614},{"plugItemHash":150943615},{"plugItemHash":2697220197},{"plugItemHash":518224747},{"plugItemHash":518224744},{"plugItemHash":518224745},{"plugItemHash":518224750},{"plugItemHash":518224751},{"plugItemHash":518224748},{"plugItemHash":518224749},{"plugItemHash":518224738},{"plugItemHash":518224739},{"plugItemHash":186337601},{"plugItemHash":1486919755},{"plugItemHash":1486919752},{"plugItemHash":1486919753},{"plugItemHash":1486919758},{"plugItemHash":1486919759},{"plugItemHash":1486919756},{"plugItemHash":1486919757},{"plugItemHash":1486919746},{"plugItemHash":1486919747},{"plugItemHash":3486498337},{"plugItemHash":4283235143},{"plugItemHash":4283235140},{"plugItemHash":4283235141},{"plugItemHash":4283235138},{"plugItemHash":4283235139},{"plugItemHash":4283235136},{"plugItemHash":4283235137},{"plugItemHash":4283235150},{"plugItemHash":4283235151},{"plugItemHash":758092021},{"plugItemHash":3928770367},{"plugItemHash":3928770364},{"plugItemHash":3928770365},{"plugItemHash":3928770362},{"plugItemHash":3928770363},{"plugItemHash":3928770360},{"plugItemHash":3928770361},{"plugItemHash":3928770358},{"plugItemHash":3928770359},{"plugItemHash":3803457565},{"plugItemHash":4105787909},{"plugItemHash":4105787910},{"plugItemHash":4105787911},{"plugItemHash":4105787904},{"plugItemHash":4105787905},{"plugItemHash":4105787906},{"plugItemHash":4105787907},{"plugItemHash":4105787916},{"plugItemHash":4105787917},{"plugItemHash":1154004463},{"plugItemHash":3353797898},{"plugItemHash":3353797897},{"plugItemHash":3353797896},{"plugItemHash":3353797903},{"plugItemHash":3353797902},{"plugItemHash":3353797901},{"plugItemHash":3353797900},{"plugItemHash":3353797891},{"plugItemHash":3353797890},{"plugItemHash":3128594062},{"plugItemHash":2203506848},{"plugItemHash":2203506851},{"plugItemHash":2203506850},{"plugItemHash":2203506853},{"plugItemHash":2203506852},{"plugItemHash":2203506855},{"plugItemHash":2203506854},{"plugItemHash":2203506857},{"plugItemHash":2203506856},{"plugItemHash":1639384016},{"plugItemHash":892374263},{"plugItemHash":892374260},{"plugItemHash":892374261},{"plugItemHash":892374258},{"plugItemHash":892374259},{"plugItemHash":892374256},{"plugItemHash":892374257},{"plugItemHash":892374270},{"plugItemHash":892374271},{"plugItemHash":2993547493}],"preventInitializationOnVendorPurchase":true,"preventInitializationWhenVersioning":false,"hidePerksInItemTooltip":false,"plugSources":3,"reusablePlugSetHash":1117738936,"overridesUiAppearance":false,"defaultVisible":true},{"socketTypeHash":0,"singleInitialItemHash":0,"reusablePlugItems":[],"preventInitializationOnVendorPurchase":false,"preventInitializationWhenVersioning":false,"hidePerksInItemTooltip":false,"plugSources":1,"overridesUiAppearance":false,"defaultVisible":false},{"socketTypeHash":1282012138,"singleInitialItemHash":2285418970,"reusablePlugItems":[],"preventInitializationOnVendorPurchase":true,"preventInitializationWhenVersioning":false,"hidePerksInItemTooltip":false,"plugSources":6,"reusablePlugSetHash":5,"overridesUiAppearance":false,"defaultVisible":true}],"intrinsicSockets":[{"plugItemHash":3690882495,"socketTypeHash":4261726982,"defaultVisible":true}],"socketCategories":[{"socketCategoryHash":3956125808,"socketIndexes":[0]},{"socketCategoryHash":4241085061,"socketIndexes":[1,2,3,4,9]},{"socketCategoryHash":2048875504,"socketIndexes":[5]},{"socketCategoryHash":2685412949,"socketIndexes":[6,7]}]},"talentGrid":{"talentGridHash":521135891,"itemDetailString":"Details","hudDamageType":1},"investmentStats":[{"statTypeHash":1480404414,"value":0,"isConditionallyActive":false},{"statTypeHash":1935470627,"value":0,"isConditionallyActive":false},{"statTypeHash":1885944937,"value":0,"isConditionallyActive":false},{"statTypeHash":3555269338,"value":40,"isConditionallyActive":false},{"statTypeHash":4284893193,"value":100,"isConditionallyActive":false},{"statTypeHash":4043523819,"value":0,"isConditionallyActive":false},{"statTypeHash":1240592695,"value":36,"isConditionallyActive":false},{"statTypeHash":155624089,"value":41,"isConditionallyActive":false},{"statTypeHash":3871231066,"value":90,"isConditionallyActive":false},{"statTypeHash":4188031367,"value":61,"isConditionallyActive":false},{"statTypeHash":1931675084,"value":51,"isConditionallyActive":false},{"statTypeHash":943549884,"value":65,"isConditionallyActive":false},{"statTypeHash":1345609583,"value":73,"isConditionallyActive":false},{"statTypeHash":2715839340,"value":49,"isConditionallyActive":false}],"perks":[{"requirementDisplayString":"","perkHash":3435464613,"perkVisibility":0}],"loreHash":1812829992,"summaryItemHash":3520001075,"allowActions":true,"doesPostmasterPullHaveSideEffects":false,"nonTransferrable":false,"itemCategoryHashes":[3,1,10],"specialItemType":0,"itemType":3,"itemSubType":12,"classType":3,"breakerType":0,"equippable":true,"damageTypeHashes":[2303181850],"damageTypes":[2],"defaultDamageType":2,"defaultDamageTypeHash":2303181850,"isWrapper":false,"traitIds":["item_type.weapon","weapon_type.sniper_rifle"],"hash":2164448701,"index":10379,"redacted":false,"blacklisted":false}

