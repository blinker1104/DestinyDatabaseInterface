import React from 'react';
import axios from 'axios';

const APIkey = require('../API/BungieAPI.js');

const bungieBaseURL = 'https://www.bungie.net';
const bungieURL = 'https://www.bungie.net/platform/Destiny2/';
const profile_xbox  = '1/Profile/';
const profile_psn   = '2/Profile/';
const profile_steam = '3/Profile/';
const option_item = '/Item/';
const equipment_component = '?components=205';
const perk_component = '?components=305';

// https://www.bungie.net/platform/Destiny2/3/Profile/4611686018468660527/Item/6917529301468312674/?components=300

// https://www.bungie.net/platform/Destiny2/3/Profile/4611686018468660527/Item/6917529301468312674/?components=305


class ItemInfo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: props.ids.uid,
      itemReady : false,
      itemId : props.ids.eid,
      instanceId : props.ids.instanceId,
      perks: [],
      iconIds: [],
      iconUrls : [],
      icons: []
     };
    //  console.log(props);

    this.getEquipmentInfo = this.getEquipmentInfo.bind(this);
    this.getWeaponInfo = this.getWeaponInfo.bind(this);
    this.getPerkInfo = this.getPerkInfo.bind(this);
    this.setIcons = this.setIcons.bind(this);
  }


  // https://www.bungie.net/platform/Destiny2/3/Profile/4611686018468660527/Item/6917529301468312674/?components=305
  // https://www.bungie.net/platform/Destiny2/3/Profile…611686018468660527/Item/4177973942?components=305


  componentDidMount() {

    // this.getEquipmentInfo();
    this.getPerkInfo();
  }

  getEquipmentInfo() {
    // icons
    //==================
    //GetEquipment
    // 0: WeaponIcon
    //GetPerks
    // 0: Intrinsic
    // 6: Mod
    // 7: Masterwork
    //==================
    // 1: Barrel-1
    // 2: Barrel-2
    // 3: Random Perk-1
    // 4: Random Perk-2
    //==================
    // 5: Shader
    // 8: Tracker(PVE/PVP)

    iconIds[0] = this.state.itemId;
    this.getPerkInfo();

  }

  getWeaponInfo(){
    console.log('get equipment info');
    const uid = this.state.userId;
    const URL =
      bungieURL+profile_steam+uid
      +option_char+cid+equipment_component;

    // console.log(uid);
    // console.log(cid);
    // console.log('URL ', URL);

    // axios({
    //     method : 'get',
    //     url : URL,
    //     headers : {'X-API-Key' :  APIkey.value}
    //   })
    //   .then((res) => {
    //     console.log(res.data.Response);
    //     const equipment = res.data.Response.equipment.data.items;

    //     this.setState({
    //       equipment : equipment,
    //       equipmentReady : true
    //     });


    //   })
    //   .catch(function (error) {
    //     console.log('Error', error.message);
    //     console.log(error.config);
    //   });
  }

  getPerkInfo(){
    const uid = this.state.userId;
    const itemId = this.state.itemId;
    const instanceId = this.state.instanceId;
    const URL =
      (bungieURL + profile_steam + uid
      + option_item + instanceId + perk_component);

    axios({
      method : 'get',
      url : URL,
      headers : {'X-API-Key' :  APIkey.value}
    })
    .then((res) => {
      // console.log('Perks - '+ itemId + '/'+ instanceId);
      // console.log(res.data);
      const perks = res.data.Response.sockets.data.sockets;

      // console.log(perks);
      this.state.perks = perks;
      // this.setState({
      //   equipment : equipment,
      //   equipmentReady : true
      // });
      this.setIcons();

    })
    .catch(function (error) {
      console.log('Error', error.message);
      console.log(error.config);
    });

  }

  setIcons() {

    // icons
    //==================
    //GetEquipment
    // 0: WeaponIcon
    //GetPerks
    // 0: Intrinsic
    // 6: Mod
    // 7: Masterwork
    //==================
    // 1: Barrel-1
    // 2: Barrel-2
    // 3: Random Perk-1
    // 4: Random Perk-2
    //==================
    // 5: Shader
    // 8: Tracker(PVE/PVP)

    const iconOrder = [0,6,7,1,2,3,4];
    const itemId = this.state.itemId;
    let iconUrls=  [];
    iconUrls[0] = itemId;
    for(let i=0; i<iconOrder.length; i++) {
      iconUrls[i+1] = this.state.perks[i].plugHash;
    }
    console.log(iconUrls.join());

    const len = iconUrls.length;
    for (let i =0; i< len; i++) {
      const p = iconUrls[i];
      axios.get('/getItem/' + p)
        .then((response)=>{
          if(response.data){
            iconUrls[i] = bungieBaseURL + response.data.icon;
            console.log('icon: ',iconUrls[i]);

            this.setState({
              itemReady: true,
              iconUrls: iconUrls
            });

          }
        });
    }



  }

  render() {

    // const icons_slot0 = this.state.iconIds.map( (url)=>{
    //   return (<img  style={{
    //     backgroundColor: 'gray',
    //     width: '50px',
    //     height: '50px' }}
    //     src={url} />);
    // });

    if(this.state.itemReady)
      console.log(this.state.iconUrls.length);
    console.log('Icon Urls');

    const iconsIds = this.state.itemReady ? this.state.iconUrls.map( (url) => {
      console.log(url);
      return (<img  style={{
        backgroundColor: 'gray',
        width: '50px',
        height: '50px' }}
        src={url} />);
    }) : 'No Data';

    // if(!this.state.equipmentReady) {
    //   return (<div>No Equipment Info</div>);
    // }

    // const weaponInfo = this.state.equipment.map( (item) => {
    //   return (<div>

    //   </div>)
    // });

    // const perks = this.state.iconIds.join();

    return (
      <div className="WeaponList">
        <h5>Item Info </h5>
        {iconsIds}
      </div>
    );
  }
}

export default ItemInfo;

