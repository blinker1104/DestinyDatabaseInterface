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
// const perk_component = '?components=305'; // Plug
const perk_component = '?components=302'; // Perk


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
      // const perks = res.data.Response.sockets.data ?
      //   res.data.Response.sockets.data.sockets : [];

        const perks = res.data.Response.perks.data ?
        res.data.Response.perks.data.perks : [];

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

    const disabledTrackerIconHash = 2285418970;
    const iconOrder = [0,6,7,1,2,3,4];
    const iconOrder_exotic = [0,-1,10,1,2,3,4];
    const itemId = this.state.itemId;

    let iconUrls=  [];



    //Perk Setting
    console.log('# of Perks: ' , this.state.perks.length);
    console.log(this.state.perks);
    for(let o of this.state.perks){
      if(o.iconPath !== ''){
        iconUrls.push(bungieBaseURL + o.iconPath);
      }
    }
    this.setState({
      itemReady: true,
      iconUrls: iconUrls
    });
    return ;




    iconUrls.push(itemId);  // Add Weapon Icon at [0]
    console.log('ITEM ID: ', itemId);
    if(this.state.perks){
      const isExotic = this.state.perks[5].isEnabled ? !this.state.perks[5].isEnabled : false; // Shader is not applicable in Exotics.

      console.log('Perks : ');
      console.log(this.state.perks);

      const detailVersion = true;
      if(detailVersion){
        for(let i=0; i<this.state.perks.length; i++) {
          iconUrls[i+1] = this.state.perks[i].isEnabled ?
            this.state.perks[i].plugHash : 0;
          // iconUrls[i+1] = this.state.perks[i].isEnabled ?
          //   this.state.perks[i].perkHash : 0;
        }
      } else if(isExotic){
        for(let o of iconOrder_exotic){
          if(o > this.state.perks.length) continue;
          if(o < 0){ iconUrls.push(disabledTrackerIconHash); continue;}
          iconUrls.push(this.state.perks[o].isEnabled ?
            this.state.perks[o].plugHash : 0);
        }
      } else {
        for(let o of iconOrder){
          if(o > this.state.perks.length) continue;
          iconUrls.push(this.state.perks[o].isEnabled ?
            this.state.perks[o].plugHash : 0);
        }
      }
    }
    const icons = iconUrls.join();
    // console.log(`icons ${iconUrls.length}: ${iconUrls}`);

    axios.get('/getItems/' + icons)
      .then((response)=>{
        if(response.data){
          iconUrls = [];
          for(let i=0; i<response.data.length; i++){
            const url = response.data[i].icon;
            iconUrls.push(url ? bungieBaseURL + url : 'x');
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
      this.state.iconUrls.map( (url, i) => {
        // console.log(url);
        if(!url || url === hash_emptySocket) return('x');
        return (<span><img style={{
          backgroundColor: 'gray',
          width: '50px',
          height: '50px' }}
          src={url}/> {i}</span> );
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




      // //2415517654 // Bastion
      // 2415517654 - WEAPON
      // 1186480754 - Intrinsic P
      // 3250034553 - P1
      // 1687452232 - P2
      // 4190643473 - P3
      // 3465198467 - P4
      // 0 - 5th - Shader
      // 2931483505 - Ornament
      // 0
      // 0,
      // 2285418970 - Tracker - Disabled
      // 1498917124 - Catalyst

