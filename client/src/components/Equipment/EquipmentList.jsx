import React from 'react';
import axios from 'axios';
import ItemInfo from './ItemInfo.jsx';

const APIkey = require('../../API/BungieAPI.js');

const bungieURL = 'https://www.bungie.net/platform/Destiny2/';
const profile_xbox  = '1/Profile/';
const profile_psn   = '2/Profile/';
const profile_steam = '3/Profile/';
const option_char = '/Character/';
const equipment_component = '?components=205';


// https://www.bungie.net/platform/Destiny2/3/Profile/4611686018468660527/Character/2305843009359234351/?components=205

class EquipmentList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: props.ids.uid,
      charId: props.ids.cid,
      equipment: [],
      equipmentReady : false
     };
    this.getEquipmentInfo = this.getEquipmentInfo.bind(this);
  }

  componentDidMount() {

    this.getEquipmentInfo();
  }

  getEquipmentInfo() {
    console.log('get equipment info');
    const uid = this.state.userId;
    const cid = this.state.charId;
    const URL =
      bungieURL+profile_steam+uid
      +option_char+cid+equipment_component;

    console.log(uid);
    console.log(cid);
    console.log('URL ', URL);

    axios({
        method : 'get',
        url : URL,
        headers : {'X-API-Key' :  APIkey.value}
      })
      .then((res) => {
        console.log(res.data.Response);


        //0,1,2 - Weapons
        //3,4, 5,6,7 - Armor
        // 8 - Ghost
        // 9 - Sparrow
        // 10 - Ship
        // 11 - Class
        // 12 - Clan Banner
        // 13 - Emblem
        // 14 - Finisher
        // 15 - Emote
        // Artifact

        // Weapons / Armors / Class


        const equipment = res.data.Response.equipment.data.items;
        console.log('Class information ' + this.state.userId + ' / ' + this.state.charId);
        console.log(res.data.Response.equipment.data.items[11]);
        // const equipment = res.data.Response.equipment.data.items.slice(0,3);

        this.setState({
          equipment : equipment,
          equipmentReady : true
        });


      })
      .catch(function (error) {
        console.log('Error', error.message);
        console.log(error.config);
      });
  }


  render() {
    console.log('EquipmentList render');

    if(!this.state.equipmentReady) {
      return (<div>No Equipment Info</div>);
    }
    const equipmentList = this.state.equipment.map( (item) => {
      const itemSearchIds = {
        uid : this.state.userId,
        eid : item.itemHash,
        instanceId: item.itemInstanceId
      };
      return (<div>
        <ItemInfo ids = {itemSearchIds} />
      </div>)
    });

    return (
      <div className="EquipmentList">
        <h3>Equipment Info </h3>
        {equipmentList}
      </div>
    );
  }
}

export default EquipmentList;

