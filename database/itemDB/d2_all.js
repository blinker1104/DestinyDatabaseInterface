// SEARCH ALL DB in D2 Content


const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');


const readline = require('readline');

sqlite3.verbose();
const d2_db_path = path.join(__dirname,'world_sql_content.db');
const db = new sqlite3.Database(d2_db_path);

let db_promise;
(async () => {
  db_promise = await open({
    filename: d2_db_path,
    driver: sqlite3.Database});
  })();

let tables = [
  'DestinyEnemyRaceDefinition',
  'DestinyPlaceDefinition',
  'DestinyActivityDefinition',
  'DestinyActivityTypeDefinition',
  'DestinyClassDefinition',
  'DestinyGenderDefinition',
  'DestinyInventoryBucketDefinition',
  'DestinyRaceDefinition',
  'DestinyTalentGridDefinition',
  'DestinyUnlockDefinition',
  'DestinyMaterialRequirementSetDefinition',
  'DestinySandboxPerkDefinition',
  'DestinyStatGroupDefinition',
  'DestinyFactionDefinition',
  'DestinyVendorGroupDefinition',
  'DestinyRewardSourceDefinition',
  'DestinyItemCategoryDefinition',
  'DestinyDamageTypeDefinition',
  'DestinyActivityModeDefinition',
  'DestinyMedalTierDefinition',
  'DestinyAchievementDefinition',
  'DestinyActivityGraphDefinition',
  'DestinyBondDefinition',
  'DestinyCollectibleDefinition',
  'DestinyDestinationDefinition',
  'DestinyEquipmentSlotDefinition',
  'DestinyStatDefinition',
  'DestinyInventoryItemDefinition',
  'DestinyItemTierTypeDefinition',
  'DestinyLocationDefinition',
  'DestinyLoreDefinition',
  'DestinyMetricDefinition',
  'DestinyObjectiveDefinition',
  'DestinyPlugSetDefinition',
  'DestinyPowerCapDefinition',
  'DestinyPresentationNodeDefinition',
  'DestinyProgressionDefinition',
  'DestinyProgressionLevelRequirementDefinition',
  'DestinyRecordDefinition',
  'DestinySackRewardItemListDefinition',
  'DestinySandboxPatternDefinition',
  'DestinySeasonDefinition',
  'DestinySeasonPassDefinition',
  'DestinySocketCategoryDefinition',
  'DestinySocketTypeDefinition',
  'DestinyTraitDefinition',
  'DestinyTraitCategoryDefinition',
  'DestinyVendorDefinition',
  'DestinyMilestoneDefinition',
  'DestinyActivityModifierDefinition',
  'DestinyReportReasonCategoryDefinition',
  'DestinyArtifactDefinition',
  'DestinyBreakerTypeDefinition',
  'DestinyChecklistDefinition',
  'DestinyEnergyTypeDefinition'
  // 'DestinyHistoricalStatsDefinition' // no ID field

];

// let id = -825131094;

// db.serialize(() => {
//   for(let t of tables){
//     let q = `SELECT * FROM ${t} WHERE id = ${id}`;
//     db.get(q, [], (err, res) => {
//       if(err) {
//         console.log('Error running sql ' + q);
//         console.log(err);
//       } else {
//         if (res !== undefined){
//           console.log(t);
//           console.log(res);
//         }
//       }
//     })
//   }
// });



function idOverflowCheck(n) {
  return n < 2147483648 ? n : n-4294967296 ;
}

function searchID(ids) {
  console.log(ids);
  console.log(typeof ids);
  if(typeof ids === "number"){
    let id = idOverflowCheck(ids);
    db.serialize(() => {
      for(let t of tables){
        let q = `SELECT * FROM ${t} WHERE id = ${id}`;
        db.get(q, [], (err, res) => {
          if(err) {
            console.log('Error running sql ' + q);
            console.log(err);
          } else {
            if (res !== undefined){
              console.log(t);
              console.log(res);
            }
          }
        });
      }
    });

  } else if (Array.isArray(ids)) {
    db.serialize(() => {
      for(let t of tables){
        for(let i of ids) {
          let id = idOverflowCheck(i);
          let q = `SELECT * FROM ${t} WHERE id = ${id}`;
          db.get(q, [], (err, res) => {
            if(err) {
              console.log('Error running sql ' + q);
              console.log(err);
            } else {
              if (res !== undefined){
                let v = JSON.parse(res.json);
                console.log(`${t} / ${i}`);
                console.log(v.displayProperties.name);
                if(v.displayProperties.name === undefined) {
                  console.log(v);
                }
              }
            }
          });
        }
      }
    });
  } else {
    // searchText(ids);
    searchText('Catalyst')
  }
}


// function searchText(text) {
//   console.log('Seach Text ', text);
//   db.serialize(() => {
//     for(let t of tables){
//       db.all(`SELECT * FROM ${t}`, [], (err, res) => {
//         if(err){

//         } else {
//           for(let r of res){
//             if(r.json){

//               //Masterwork ONLY
//               const j = JSON.parse(r.json);
//               // if(j.displayProperties.name === text){
//               //   console.log( j.hash );
//               //   console.log( j.displayProperties );
//               // }
//             }
//           }
//         }
//       });
//     }
//   });
// }


// searchID(2697220197);  //  Masterwork.Range // -1597747099

// searchID(3373582085);  // Kinetic


// searchID(1480404414);  // Attack
// searchID(1935470627);  //  Power
// searchID(3555269338);  //  Zoom
// searchID(4284893193);  //  RPM
// searchID(4043523819);  //  Impact
// 2715839340  // recoil direction

// searchID(1240592695);  //  Range Stat
// searchID(155624089);  //  Stability
// searchID(943549884);  // Handling
// searchID(4188031367); // Reload  //-106935929
// searchID(3614673599); // Blast Radius  //-680293697
// searchID(2523465841); // Velocity // -1771501455
// searchID(1591432999); // Accuracy // 1591432999



// searchText('Masterwork');
// searchText('True Prophecy');
// searchID(2742838700);
// searchID(2697220197);  // Masterwork - Range (-1597747099/DestinyInventoryItemDefinition)
// searchID(3469836202);  // Missing (-825131094/DestinySandboxPerkDefinition)
// searchID(3373582085);  // Kinetic DMG (-921385211/DestinyDamageTypeDefinition)
// searchID(3983457027); // AggressiveFrame (-311510269/DestinyInventoryItemDefinition)
// searchID(1480404414); // Attack=ItemLevel (1480404414/DestinyStatDefinition)


/*
searchID(-825131094);
searchID(1889474);

let perkSample = [
  682617678, 4073514581, 1886251741, 1162525369, 1984731949, 3469836202, 3983457027, 1047830412, 3142289711, 3436462433, 1264398905, 4248210736, 941997506, 2697220197, 38912240
  ];
*/


// searchID(perkSample);

//SRC: https://stackabuse.com/a-sqlite-tutorial-with-node-js/


/*
   '{"displayProperties":{"description":"Maximized stats. Generates Orbs on multikills. Fitted with a kill tracker.","name":"Masterwork","icon":"/common/destiny2_content/icons/d7f830688e5d383400307f2d50a810f4.jpg","hasIcon":true},"tooltipNotifications":[],"iconWatermark":"/common/destiny2_content/icons/5baa302ee959e7d98330edc050cbec09.png","backgroundColor":{"colorHash":0,"red":0,"green":0,"blue":0,"alpha":0},"itemTypeDisplayName":"","flavorText":"","uiItemDisplayStyle":"","itemTypeAndTierDisplayName":"","displaySource":"","tooltipStyle":"vendor_action","action":{"verbName":"Dismantle","verbDescription":"","isPositive":true,"requiredCooldownSeconds":0,"requiredItems":[],"progressionRewards":[],"rewardSheetHash":0,"rewardItemHash":0,"rewardSiteHash":0,"requiredCooldownHash":0,"deleteOnAction":true,"consumeEntireStack":false,"useOnAcquire":false},"inventory":{"maxStackSize":1,"bucketTypeHash":3313201758,"recoveryBucketTypeHash":215593132,"tierTypeHash":4008398120,"isInstanceItem":false,"nonTransferrableOriginal":false,"tierTypeName":"Legendary","tierType":5,"expirationTooltip":"","expiredInActivityMessage":"","expiredInOrbitMessage":"","suppressExpirationWhenObjectivesComplete":true},"plug":{"insertionRules":[],"plugCategoryIdentifier":"v400.plugs.weapons.masterworks.stat.range","plugCategoryHash":1392237582,"onActionRecreateSelf":false,"actionRewardSiteHash":0,"actionRewardItemOverrideHash":0,"insertionMaterialRequirementHash":3785659211,"previewItemOverrideHash":0,"enabledMaterialRequirementHash":0,"enabledRules":[],"uiPlugLabel":"masterwork","plugStyle":1,"plugAvailability":2,"alternateUiPlugLabel":"","alternatePlugStyle":0,"isDummyPlug":false,"applyStatsToSocketOwnerItem":false},"acquireRewardSiteHash":0,"acquireUnlockHash":0,"investmentStats":[{"statTypeHash":1240592695,"value":10,"isConditionallyActive":false},{"statTypeHash":155624089,"value":3,"isConditionallyActive":true},{"statTypeHash":943549884,"value":3,"isConditionallyActive":true},{"statTypeHash":4188031367,"value":3,"isConditionallyActive":true},{"statTypeHash":3614673599,"value":3,"isConditionallyActive":true},{"statTypeHash":2523465841,"value":3,"isConditionallyActive":true},{"statTypeHash":1591432999,"value":3,"isConditionallyActive":true}],"perks":[{"requirementDisplayString":"","perkHash":3469836202,"perkVisibility":0}],"allowActions":true,"doesPostmasterPullHaveSideEffects":false,"nonTransferrable":false,"itemCategoryHashes":[59],"specialItemType":0,"itemType":19,"itemSubType":0,"classType":3,"breakerType":0,"equippable":false,"defaultDamageType":0,"isWrapper":false,"hash":2697220197,"index":5538,"redacted":false,"blacklisted":false}' }

*/

/*


2286143274
3281285075
4230965989
1321354572
4194072668
4177973942
2054979724
1021060724
*/


//1021060724 // Hunter Cloak
//1106697451 // GHOST SHELL // tyrantShell
//3317837688 // Vehicle
//1748147691 // SHIP  // 284967655(BucketHash)
//873720784 // Revenant - Hunter Subclass
//684040282 // ClanBanner
//3605230075 // EMBLEM - VEIST UPGRADE
//152583919  //  finisher
//3183180185 // EMOTE
//3234265291 // Artifact - Bell of Conquest



// searchID(2465295065); //EnergyWeapon
// searchID(3281285075); // Posterity
// searchID(2303181850);  //  Arc - DamageTypeDefinition
// searchID(1480404414); // Attack - DestinyStatDefinition




// askQuestion("ID please : ")
//     .then((res) => {
//         console.log(Number.parseInt(res));
//         let id = Number.parseInt(res);
//         console.log(id);
//         // searchID(id);
//     });


async function asyncSearchID(ids){
  let searchResult = [];

  if(typeof ids === "number"){
    let id = idOverflowCheck(ids);
    db.serialize(() => {
      for(let t of tables){
        let q = `SELECT * FROM ${t} WHERE id = ${id}`;
        db.get(q, [], (err, res) => {
            if(err) {
              console.log('Error running sql ' + q);
              console.log(err);
            } else {
            if (res !== undefined){
              console.log('item found: ' + t);
              searchResult.push(res);
            }
          }
        });
      }
    });
  }

  console.log('item?: ' + searchResult);
  return new Promise((resolve) => {
    console.log('item: ' + searchResult);
    resolve(searchResult);
  });
}




async function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise(resolve => rl.question(query, ans => {
    rl.close();
    resolve(ans);
  }))
}

// 2286143274
// 3281285075
// 4230965989
// 1321354572
// 4194072668
// 4177973942
// 2054979724
// 1021060724

// searchID(2303181850);  //  Arc - DamageTypeDefinition


async function asyncSearchID2(input){
  let searchResult = [];
  if(input ===  '0') return searchResult;
  let id = idOverflowCheck(Number.parseInt(input));
  if(typeof id === "number" && id){

    console.log(id);
    for(let t of tables){
      let q = `SELECT * FROM ${t} WHERE id = ${id}`;
      const result = await db_promise.all(q);
      if(result.length > 0){
        searchResult.push(t)
        searchResult.push(result[0]);
      }
    }
  } else {
    searchText(input);
  }
  return (searchResult);
}


async function searchText(text) {
  let searchResult = [];
  if(text.length < 2) return searchResult;
  for(let t of tables){
    let q = `SELECT * FROM ${t}`;
    const result = await db_promise.all(q);
    for(let r of result){

      //Masterwork ONLY
      const j = JSON.parse(r.json);
      if(!j.displayProperties || !j.displayProperties.name) continue;
      if(j.displayProperties.name.includes(text)){
        // console.log( j.hash );
        // console.log( j.displayProperties );
        console.log(`${j.hash} / ${j.displayProperties.name}` );
      }
      //HASH
    }
  };
  return searchResult;
}


async function questionForm () {
  try{
    for(let i=0; i<24; i++){
      const searchWord = await askQuestion("ID please (0 to close): ");
      if(searchWord ===  '0') return;
      else {
        console.log('Search Keyword: ', searchWord);
        const search = await asyncSearchID2(searchWord);
        if(!search){
          console.log('No Data Found');
          continue;
        }
        console.log(' --- result --- ');
        for(let i=0; i<search.length; i+=2){
          // console.log('from '+search[i]);
          // console.log(search[i+1]);
          const data_source = search[i];
          const data = JSON.parse(search[i+1].json);
          const name = data.displayProperties ?
            data.displayProperties.name : 'No Name Data';
          console.log( '- '+name + ' / ' + data_source);
          console.log(data);
        }
        console.log(' --- result end --- ');
      }
    }
  }catch(err){
    console.log(err);
    throw err;
  }

};


// https://stackoverflow.com/questions/62456867/cannot-await-for-sqlite3-database-get-function-completion-in-node-js





// let i = 0;
// while(i++ < 10){
//   console.log(questionForm());
// }
// console.log(questionForm());
questionForm();

//   questionForm().then((res)=>{console.log(res)});
//   questionForm().then((res)=>{console.log(res)});
//   questionForm().then((res)=>{console.log(res)});
//SRC:https://stackoverflow.com/questions/18193953/waiting-for-user-to-enter-input-in-node-js

/*


1280545291
{ description:
   'This weapon generates Orbs on multikills, and displays the number of opponents defeated in the Crucible by using it.',
  name: 'Masterwork Weapon',
  icon:
   '/common/destiny2_content/icons/2ada5f23160f98be7e814cb1a6ffe7f7.jpg',
  hasIcon: true }

1233605808
{ description:
   'This weapon generates Orbs on multikills, and displays the number of enemies defeated by using it.',
  name: 'Masterwork Weapon',
  icon:
   '/common/destiny2_content/icons/4d9723fe1739b552426969dc612d9d32.jpg',
  hasIcon: true }
1234111636

1178660677
{ description:
   'Upgrades this weapon to a Masterwork.\n\nIt will generate Orbs on multikills and gain a tracker that displays the number of combatants defeated with it. The Masterworked weapon will also receive additional capabilities.\n\nDefeat enemies using this weapon to unlock this upgrade.',
  name: 'Anarchy Catalyst',
  icon:
   '/common/destiny2_content/icons/46ebd791f692b682691416beea7ac4c5.jpg',
  hasIcon: true }

1154004463
{ description:
   'Maximized stats. Generates Orbs on multikills. Fitted with a kill tracker.',
  name: 'Masterwork',
  icon:
   '/common/destiny2_content/icons/f0afe1ad6e598bd4b7473ee49ec53198.jpg',
  hasIcon: true }

  1076337029
{ description: '',
  name: 'Masterwork objective complete',
  icon:
   '/common/destiny2_content/icons/28355e0adda864289165854e376f86ee.jpg',
  hasIcon: true }
1149703256

*/



/*


Astral Horizon
{
    "acquireRewardSiteHash": 0,
    "acquireUnlockHash": 0,
    "action": {
        "actionTypeLabel": "shard",
        "consumeEntireStack": false,
        "deleteOnAction": true,
        "isPositive": false,
        "progressionRewards": [],
        "requiredCooldownHash": 0,
        "requiredCooldownSeconds": 0,
        "requiredItems": [],
        "rewardItemHash": 0,
        "rewardSheetHash": 0,
        "rewardSiteHash": 0,
        "useOnAcquire": false,
        "verbDescription": "",
        "verbName": "Dismantle"
    },
    "allowActions": true,
    "backgroundColor": {
        "alpha": 0,
        "blue": 0,
        "colorHash": 0,
        "green": 0,
        "red": 0
    },
    "blacklisted": false,
    "breakerType": 0,
    "classType": 3,
    "collectibleHash": 1894288229,
    "damageTypeHashes": [
        3373582085
    ],
    "damageTypes": [
        1
    ],
    "defaultDamageType": 1,
    "defaultDamageTypeHash": 3373582085,
    "displayProperties": {
        "description": "",
        "hasIcon": true,
        "icon": "/common/destiny2_content/icons/ded3f43dc1fa13a69ba18660db952180.jpg",
        "name": "Astral Horizon"
    },
    "displaySource": "Random Perks: This item cannot be reacquired from Collections.",
    "doesPostmasterPullHaveSideEffects": false,
    "equippable": true,
    "equippingBlock": {
        "ammoType": 2,
        "attributes": 0,
        "displayStrings": [
            "",
            ""
        ],
        "equipmentSlotTypeHash": 1498876634,
        "equippingSoundHash": 0,
        "hornSoundHash": 0,
        "uniqueLabelHash": 0
    },
    "flavorText": "Even the brightest stars eventually set.",
    "hash": 1697682876,
    "iconWatermark": "/common/destiny2_content/icons/3d335ddc3ec6668469aae60baad8548d.png",
    "iconWatermarkShelved": "/common/destiny2_content/icons/e27a4f39c1bb8c6f89613648afaa3e9f.png",
    "index": 11369,
    "inventory": {
        "bucketTypeHash": 1498876634,
        "expirationTooltip": "",
        "expiredInActivityMessage": "",
        "expiredInOrbitMessage": "",
        "isInstanceItem": true,
        "maxStackSize": 1,
        "nonTransferrableOriginal": false,
        "recoveryBucketTypeHash": 215593132,
        "suppressExpirationWhenObjectivesComplete": true,
        "tierType": 5,
        "tierTypeHash": 4008398120,
        "tierTypeName": "Legendary"
    },
    "investmentStats": [
        {
            "isConditionallyActive": false,
            "statTypeHash": 1480404414,
            "value": 0
        },
        {
            "isConditionallyActive": false,
            "statTypeHash": 1935470627,
            "value": 0
        },
        {
            "isConditionallyActive": false,
            "statTypeHash": 1885944937,
            "value": 0
        },
        {
            "isConditionallyActive": false,
            "statTypeHash": 3555269338,
            "value": 12
        },
        {
            "isConditionallyActive": false,
            "statTypeHash": 4284893193,
            "value": 0
        },
        {
            "isConditionallyActive": false,
            "statTypeHash": 4043523819,
            "value": 90
        },
        {
            "isConditionallyActive": false,
            "statTypeHash": 1240592695,
            "value": 24
        },
        {
            "isConditionallyActive": false,
            "statTypeHash": 155624089,
            "value": 27
        },
        {
            "isConditionallyActive": false,
            "statTypeHash": 3871231066,
            "value": 0
        },
        {
            "isConditionallyActive": false,
            "statTypeHash": 4188031367,
            "value": 33
        },
        {
            "isConditionallyActive": false,
            "statTypeHash": 1931675084,
            "value": 40
        },
        {
            "isConditionallyActive": false,
            "statTypeHash": 943549884,
            "value": 28
        },
        {
            "isConditionallyActive": false,
            "statTypeHash": 1345609583,
            "value": 34
        },
        {
            "isConditionallyActive": false,
            "statTypeHash": 2715839340,
            "value": 62
        }
    ],
    "isWrapper": false,
    "itemCategoryHashes": [
        2,
        1,
        11
    ],
    "itemSubType": 7,
    "itemType": 3,
    "itemTypeAndTierDisplayName": "Legendary Shotgun",
    "itemTypeDisplayName": "Shotgun",
    "loreHash": 91586893,
    "nonTransferrable": false,
    "perks": [],
    "preview": {
        "previewActionString": "",
        "previewVendorHash": 0,
        "screenStyle": "screen_style_sockets"
    },
    "quality": {
        "currentVersion": 1,
        "displayVersionWatermarkIcons": [
            "/common/destiny2_content/icons/3d335ddc3ec6668469aae60baad8548d.png",
            "/common/destiny2_content/icons/6a52f7cd9099990157c739a8260babea.png"
        ],
        "infusionCategoryHash": 2601628231,
        "infusionCategoryHashes": [
            2601628231
        ],
        "infusionCategoryName": "2601628231",
        "itemLevels": [],
        "progressionLevelRequirementHash": 3157915980,
        "qualityLevel": 0,
        "versions": [
            {
                "powerCapHash": 2470863922
            },
            {
                "powerCapHash": 2470863920
            }
        ]
    },
    "redacted": false,
    "screenshot": "/common/destiny2_content/screenshots/1697682876.jpg",
    "sockets": {
        "detail": "Details",
        "intrinsicSockets": [
            {
                "defaultVisible": true,
                "plugItemHash": 3690882495,
                "socketTypeHash": 1726040302
            }
        ],
        "socketCategories": [
            {
                "socketCategoryHash": 3956125808,
                "socketIndexes": [
                    0
                ]
            },
            {
                "socketCategoryHash": 4241085061,
                "socketIndexes": [
                    1,
                    2,
                    3,
                    4,
                    9
                ]
            },
            {
                "socketCategoryHash": 2048875504,
                "socketIndexes": [
                    5
                ]
            },
            {
                "socketCategoryHash": 2685412949,
                "socketIndexes": [
                    6,
                    7
                ]
            }
        ],
        "socketEntries": [
            {
                "defaultVisible": true,
                "hidePerksInItemTooltip": false,
                "overridesUiAppearance": false,
                "plugSources": 6,
                "preventInitializationOnVendorPurchase": false,
                "preventInitializationWhenVersioning": false,
                "reusablePlugItems": [],
                "reusablePlugSetHash": 1113,
                "singleInitialItemHash": 3983457027,
                "socketTypeHash": 3956125808
            },
            {
                "defaultVisible": true,
                "hidePerksInItemTooltip": false,
                "overridesUiAppearance": false,
                "plugSources": 2,
                "preventInitializationOnVendorPurchase": false,
                "preventInitializationWhenVersioning": false,
                "randomizedPlugSetHash": 1571809010,
                "reusablePlugItems": [
                    {
                        "plugItemHash": 1332244541
                    }
                ],
                "singleInitialItemHash": 1332244541,
                "socketTypeHash": 3362409147
            },
            {
                "defaultVisible": true,
                "hidePerksInItemTooltip": false,
                "overridesUiAppearance": false,
                "plugSources": 2,
                "preventInitializationOnVendorPurchase": false,
                "preventInitializationWhenVersioning": false,
                "randomizedPlugSetHash": 2070940234,
                "reusablePlugItems": [
                    {
                        "plugItemHash": 791862061
                    }
                ],
                "singleInitialItemHash": 791862061,
                "socketTypeHash": 3815406785
            },
            {
                "defaultVisible": true,
                "hidePerksInItemTooltip": false,
                "overridesUiAppearance": false,
                "plugSources": 2,
                "preventInitializationOnVendorPurchase": false,
                "preventInitializationWhenVersioning": false,
                "randomizedPlugSetHash": 1186633387,
                "reusablePlugItems": [
                    {
                        "plugItemHash": 3161816588
                    }
                ],
                "singleInitialItemHash": 3161816588,
                "socketTypeHash": 2614797986
            },
            {
                "defaultVisible": true,
                "hidePerksInItemTooltip": false,
                "overridesUiAppearance": false,
                "plugSources": 2,
                "preventInitializationOnVendorPurchase": false,
                "preventInitializationWhenVersioning": false,
                "randomizedPlugSetHash": 334979453,
                "reusablePlugItems": [
                    {
                        "plugItemHash": 3511092054
                    }
                ],
                "singleInitialItemHash": 0,
                "socketTypeHash": 2614797986
            },
            {
                "defaultVisible": true,
                "hidePerksInItemTooltip": false,
                "overridesUiAppearance": false,
                "plugSources": 7,
                "preventInitializationOnVendorPurchase": false,
                "preventInitializationWhenVersioning": false,
                "reusablePlugItems": [],
                "reusablePlugSetHash": 2,
                "singleInitialItemHash": 4248210736,
                "socketTypeHash": 1288200359
            },
            {
                "defaultVisible": true,
                "hidePerksInItemTooltip": false,
                "overridesUiAppearance": false,
                "plugSources": 7,
                "preventInitializationOnVendorPurchase": true,
                "preventInitializationWhenVersioning": false,
                "reusablePlugItems": [
                    {
                        "plugItemHash": 4003264426
                    },
                    {
                        "plugItemHash": 299264772
                    },
                    {
                        "plugItemHash": 4278960718
                    },
                    {
                        "plugItemHash": 634781242
                    },
                    {
                        "plugItemHash": 1225726778
                    },
                    {
                        "plugItemHash": 1525622117
                    },
                    {
                        "plugItemHash": 1710791394
                    },
                    {
                        "plugItemHash": 3789184904
                    },
                    {
                        "plugItemHash": 3018373291
                    }
                ],
                "reusablePlugSetHash": 455349356,
                "singleInitialItemHash": 2323986101,
                "socketTypeHash": 3939863699
            },
            {
                "defaultVisible": true,
                "hidePerksInItemTooltip": false,
                "overridesUiAppearance": false,
                "plugSources": 3,
                "preventInitializationOnVendorPurchase": true,
                "preventInitializationWhenVersioning": false,
                "reusablePlugItems": [
                    {
                        "plugItemHash": 1590375901
                    },
                    {
                        "plugItemHash": 1590375902
                    },
                    {
                        "plugItemHash": 1590375903
                    },
                    {
                        "plugItemHash": 1590375896
                    },
                    {
                        "plugItemHash": 1590375897
                    },
                    {
                        "plugItemHash": 1590375898
                    },
                    {
                        "plugItemHash": 1590375899
                    },
                    {
                        "plugItemHash": 1590375892
                    },
                    {
                        "plugItemHash": 1590375893
                    },
                    {
                        "plugItemHash": 384158423
                    },
                    {
                        "plugItemHash": 150943607
                    },
                    {
                        "plugItemHash": 150943604
                    },
                    {
                        "plugItemHash": 150943605
                    },
                    {
                        "plugItemHash": 150943602
                    },
                    {
                        "plugItemHash": 150943603
                    },
                    {
                        "plugItemHash": 150943600
                    },
                    {
                        "plugItemHash": 150943601
                    },
                    {
                        "plugItemHash": 150943614
                    },
                    {
                        "plugItemHash": 150943615
                    },
                    {
                        "plugItemHash": 2697220197
                    },
                    {
                        "plugItemHash": 518224747
                    },
                    {
                        "plugItemHash": 518224744
                    },
                    {
                        "plugItemHash": 518224745
                    },
                    {
                        "plugItemHash": 518224750
                    },
                    {
                        "plugItemHash": 518224751
                    },
                    {
                        "plugItemHash": 518224748
                    },
                    {
                        "plugItemHash": 518224749
                    },
                    {
                        "plugItemHash": 518224738
                    },
                    {
                        "plugItemHash": 518224739
                    },
                    {
                        "plugItemHash": 186337601
                    },
                    {
                        "plugItemHash": 1486919755
                    },
                    {
                        "plugItemHash": 1486919752
                    },
                    {
                        "plugItemHash": 1486919753
                    },
                    {
                        "plugItemHash": 1486919758
                    },
                    {
                        "plugItemHash": 1486919759
                    },
                    {
                        "plugItemHash": 1486919756
                    },
                    {
                        "plugItemHash": 1486919757
                    },
                    {
                        "plugItemHash": 1486919746
                    },
                    {
                        "plugItemHash": 1486919747
                    },
                    {
                        "plugItemHash": 3486498337
                    },
                    {
                        "plugItemHash": 4283235143
                    },
                    {
                        "plugItemHash": 4283235140
                    },
                    {
                        "plugItemHash": 4283235141
                    },
                    {
                        "plugItemHash": 4283235138
                    },
                    {
                        "plugItemHash": 4283235139
                    },
                    {
                        "plugItemHash": 4283235136
                    },
                    {
                        "plugItemHash": 4283235137
                    },
                    {
                        "plugItemHash": 4283235150
                    },
                    {
                        "plugItemHash": 4283235151
                    },
                    {
                        "plugItemHash": 758092021
                    },
                    {
                        "plugItemHash": 3928770367
                    },
                    {
                        "plugItemHash": 3928770364
                    },
                    {
                        "plugItemHash": 3928770365
                    },
                    {
                        "plugItemHash": 3928770362
                    },
                    {
                        "plugItemHash": 3928770363
                    },
                    {
                        "plugItemHash": 3928770360
                    },
                    {
                        "plugItemHash": 3928770361
                    },
                    {
                        "plugItemHash": 3928770358
                    },
                    {
                        "plugItemHash": 3928770359
                    },
                    {
                        "plugItemHash": 3803457565
                    },
                    {
                        "plugItemHash": 4105787909
                    },
                    {
                        "plugItemHash": 4105787910
                    },
                    {
                        "plugItemHash": 4105787911
                    },
                    {
                        "plugItemHash": 4105787904
                    },
                    {
                        "plugItemHash": 4105787905
                    },
                    {
                        "plugItemHash": 4105787906
                    },
                    {
                        "plugItemHash": 4105787907
                    },
                    {
                        "plugItemHash": 4105787916
                    },
                    {
                        "plugItemHash": 4105787917
                    },
                    {
                        "plugItemHash": 1154004463
                    },
                    {
                        "plugItemHash": 3353797898
                    },
                    {
                        "plugItemHash": 3353797897
                    },
                    {
                        "plugItemHash": 3353797896
                    },
                    {
                        "plugItemHash": 3353797903
                    },
                    {
                        "plugItemHash": 3353797902
                    },
                    {
                        "plugItemHash": 3353797901
                    },
                    {
                        "plugItemHash": 3353797900
                    },
                    {
                        "plugItemHash": 3353797891
                    },
                    {
                        "plugItemHash": 3353797890
                    },
                    {
                        "plugItemHash": 3128594062
                    },
                    {
                        "plugItemHash": 2203506848
                    },
                    {
                        "plugItemHash": 2203506851
                    },
                    {
                        "plugItemHash": 2203506850
                    },
                    {
                        "plugItemHash": 2203506853
                    },
                    {
                        "plugItemHash": 2203506852
                    },
                    {
                        "plugItemHash": 2203506855
                    },
                    {
                        "plugItemHash": 2203506854
                    },
                    {
                        "plugItemHash": 2203506857
                    },
                    {
                        "plugItemHash": 2203506856
                    },
                    {
                        "plugItemHash": 1639384016
                    },
                    {
                        "plugItemHash": 892374263
                    },
                    {
                        "plugItemHash": 892374260
                    },
                    {
                        "plugItemHash": 892374261
                    },
                    {
                        "plugItemHash": 892374258
                    },
                    {
                        "plugItemHash": 892374259
                    },
                    {
                        "plugItemHash": 892374256
                    },
                    {
                        "plugItemHash": 892374257
                    },
                    {
                        "plugItemHash": 892374270
                    },
                    {
                        "plugItemHash": 892374271
                    },
                    {
                        "plugItemHash": 2993547493
                    }
                ],
                "reusablePlugSetHash": 1117738936,
                "singleInitialItemHash": 0,
                "socketTypeHash": 2218962841
            },
            {
                "defaultVisible": false,
                "hidePerksInItemTooltip": false,
                "overridesUiAppearance": false,
                "plugSources": 1,
                "preventInitializationOnVendorPurchase": false,
                "preventInitializationWhenVersioning": false,
                "reusablePlugItems": [],
                "singleInitialItemHash": 0,
                "socketTypeHash": 0
            },
            {
                "defaultVisible": true,
                "hidePerksInItemTooltip": false,
                "overridesUiAppearance": false,
                "plugSources": 6,
                "preventInitializationOnVendorPurchase": true,
                "preventInitializationWhenVersioning": false,
                "reusablePlugItems": [],
                "reusablePlugSetHash": 3,
                "singleInitialItemHash": 2285418970,
                "socketTypeHash": 1282012138
            }
        ]
    },
    "specialItemType": 0,
    "stats": {
        "disablePrimaryStatDisplay": false,
        "hasDisplayableStats": true,
        "primaryBaseStatHash": 1480404414,
        "statGroupHash": 770484158,
        "stats": {
            "1240592695": {
                "displayMaximum": 100,
                "maximum": 0,
                "minimum": 0,
                "statHash": 1240592695,
                "value": 32
            },
            "1345609583": {
                "displayMaximum": 100,
                "maximum": 0,
                "minimum": 0,
                "statHash": 1345609583,
                "value": 34
            },
            "1480404414": {
                "displayMaximum": 100,
                "maximum": 0,
                "minimum": 0,
                "statHash": 1480404414,
                "value": 0
            },
            "155624089": {
                "displayMaximum": 100,
                "maximum": 0,
                "minimum": 0,
                "statHash": 155624089,
                "value": 34
            },
            "1885944937": {
                "displayMaximum": 100,
                "maximum": 0,
                "minimum": 0,
                "statHash": 1885944937,
                "value": 0
            },
            "1931675084": {
                "displayMaximum": 100,
                "maximum": 0,
                "minimum": 0,
                "statHash": 1931675084,
                "value": 40
            },
            "1935470627": {
                "displayMaximum": 100,
                "maximum": 0,
                "minimum": 0,
                "statHash": 1935470627,
                "value": 0
            },
            "2715839340": {
                "displayMaximum": 100,
                "maximum": 0,
                "minimum": 0,
                "statHash": 2715839340,
                "value": 62
            },
            "3555269338": {
                "displayMaximum": 100,
                "maximum": 0,
                "minimum": 0,
                "statHash": 3555269338,
                "value": 12
            },
            "3871231066": {
                "displayMaximum": 100,
                "maximum": 0,
                "minimum": 0,
                "statHash": 3871231066,
                "value": 4
            },
            "4043523819": {
                "displayMaximum": 100,
                "maximum": 0,
                "minimum": 0,
                "statHash": 4043523819,
                "value": 80
            },
            "4188031367": {
                "displayMaximum": 100,
                "maximum": 0,
                "minimum": 0,
                "statHash": 4188031367,
                "value": 40
            },
            "4284893193": {
                "displayMaximum": 100,
                "maximum": 0,
                "minimum": 0,
                "statHash": 4284893193,
                "value": 55
            },
            "943549884": {
                "displayMaximum": 100,
                "maximum": 0,
                "minimum": 0,
                "statHash": 943549884,
                "value": 35
            }
        }
    },
    "summaryItemHash": 3520001075,
    "talentGrid": {
        "hudDamageType": 1,
        "itemDetailString": "Details",
        "talentGridHash": 521135891
    },
    "tooltipNotifications": [],
    "traitIds": [
        "item_type.weapon",
        "weapon_type.shotgun"
    ],
    "translationBlock": {
        "arrangements": [
            {
                "artArrangementHash": 1697682876,
                "classHash": 0
            }
        ],
        "customDyes": [],
        "defaultDyes": [
            {
                "channelHash": 1667433279,
                "dyeHash": 2251379098
            },
            {
                "channelHash": 1667433278,
                "dyeHash": 2251379099
            },
            {
                "channelHash": 1667433277,
                "dyeHash": 2251379096
            }
        ],
        "hasGeometry": true,
        "lockedDyes": [],
        "weaponPatternHash": 1697682876
    },
    "uiItemDisplayStyle": ""
}


*/