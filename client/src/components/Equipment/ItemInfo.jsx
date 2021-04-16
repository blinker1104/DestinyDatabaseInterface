import React from 'react';
import axios from 'axios';

const APIkey = require('../../API/BungieAPI.js');

const bungieBaseURL = 'https://www.bungie.net';
const bungieURL = 'https://www.bungie.net/platform/Destiny2/';
const profile_xbox  = '1/Profile/';
const profile_psn   = '2/Profile/';
const profile_steam = '3/Profile/';
const option_item = '/Item/';
const equipment_component = '?components=205';
const perk_component = '?components=305';


const hash_emptySocket = 4248662490;

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
    this.getPerkInfo = this.getPerkInfo.bind(this);
    this.setIcons = this.setIcons.bind(this);
    this.createIconList = this.createIconList.bind(this);
  }


  // https://www.bungie.net/platform/Destiny2/3/Profile/4611686018468660527/Item/6917529301468312674/?components=305
  // https://www.bungie.net/platform/Destiny2/3/Profile…611686018468660527/Item/4177973942?components=305


  componentDidMount() {

    this.getEquipmentInfo();
  }

  getEquipmentInfo() {
    // icons
    //==================
    //GetEquipment
    // 0: WeaponIcon
    //GetPerks  (0~10)
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
    // 9: Ornament

    this.getPerkInfo();

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
      const perks = res.data.Response.sockets.data ?
        res.data.Response.sockets.data.sockets : [];

      // console.log(perks);
      this.state.perks = perks;
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
    //GetPerks  (0~10)
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
    // 9: Ornament

    const iconOrder = [0, 6,7,1,2,3,4];
    const itemId = this.state.itemId;

    let iconUrls=  [];
    iconUrls.push(itemId);
    if(this.state.perks){
      // console.log(this.state.perks);

      for(let i=0; i<this.state.perks.length; i++) {
        iconUrls[i+1] = this.state.perks[i].isEnabled ?
          this.state.perks[i].plugHash : 0;
      }

      // for(let o of iconOrder){
      //   if(o > this.state.perks.length) continue;
      //   iconUrls.push(this.state.perks[o].isEnabled ?
      //     this.state.perks[o].plugHash : 0);
      // }
    }
    const icons = iconUrls.join();
    // console.log('icons: ' + icons);

    axios.get('/getItems/' + icons)
      .then((response)=>{
        if(response.data){
          iconUrls = [];
          for(let i=0; i<response.data.length; i++){
            const url = response.data[i].icon;
            iconUrls.push(url ? bungieBaseURL + url : '');
          }
          this.setState({
            itemReady: true,
            iconUrls: iconUrls
          });
          }
      });
  }



  createIconList(){
    if(!this.state.itemReady) return 'Loading';
    return (
      this.state.iconUrls.map( (url) => {
        // console.log(url);
        if(!url || url === hash_emptySocket) return('x');
        return (<img style={{
          backgroundColor: 'gray',
          width: '50px',
          height: '50px' }}
          src={url} />);
      })
    );
  }


  render() {

    console.log('ItemInfo render');

    const iconsIds = this.createIconList();

    return (
      <div className="WeaponList">
        {iconsIds}
      </div>
    );
  }
}




export default ItemInfo;





  // 4248662490-4294967296
  //-46304806 = Empty Socket
  //-2146672205


  // 2768425135


  // - Kinetic Weapon

