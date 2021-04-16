import React from 'react';
import axios from 'axios';

import EquipmentList from './EquipmentList.jsx';

const APIkey = require('../../API/BungieAPI.js');
//https://www.bungie.net/platform/Destiny2/3/Profile/~/?components=100
// APIKEY, MYID in API.js

const profile_url = `https://www.bungie.net/platform/Destiny2/3/Profile/${APIkey.myID}?components=100`;  // My Account
const bungieBaseURL = 'https://www.bungie.net';
const bungieCharURL = 'https://www.bungie.net/platform/Destiny2/';
const profile_xbox  = '1/Profile/';
const profile_psn   = '2/Profile/';
const profile_steam = '3/Profile/';
const profile_component = '?components=100';
//https://bungie-net.github.io/multi/operation_get_Destiny2-GetProfile.html#operation_get_Destiny2-GetProfile


class CharacterList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      userId: props.userId,
      characterIds: [],
      idReady: false
    };
    this.getCharacterInfo = this.getCharacterInfo.bind(this);

  }


  componentDidMount() {
    console.log('Character List');
    console.log(APIkey);

    this.setState({
      characterIds :
        ["2305843009359234351",
        "2305843009390224534",
        "2305843009691294507"],
      idReady : true
    });

    // this.getCharacterInfo();
  }


  getCharacterInfo() {
    console.log('get character info');
    const id = this.state.userId;
    const URL =  bungieCharURL+profile_steam+id+profile_component;

    axios({
        method : 'get',
        url : URL,
        headers : {'X-API-Key' :  APIkey.value}
      })
      .then((res) => {
        // console.log(res.data.Response.profile.data.characterIds);
        const ids = res.data.Response.profile.data.characterIds;
        this.setState({
          characterIds : ids,
          idReady: true
        });
      })
      .catch(function (error) {
        console.log('Error', error.message);
        console.log(error.config);
      });
  }


  render() {

    console.log('CharacterList render');

    const displayIds = [2];  // Character ids to display [0,1,2]
    const WeaponSets = displayIds.map(id => {
      const idSet = {
        cid : this.state.characterIds[id],
        uid : this.state.userId
      };

      return ( <EquipmentList ids = {idSet} />);
    });
    return (
      <div>
        CharacterList
        {this.state.idReady ?
          WeaponSets
           : ''
        }

      </div>
    );
  }
}


export default CharacterList;



///1432514322 Attunement of Grace
//https://d2.destinygamewiki.com/wiki/Dawnblade


// 718603205 / Prime Attunement
// 4169856988 / Prime Attunement
// 3159199769 / Attunement of Fission
// 3400906385 / Attunement of Hunger
// 3400906386 / Attunement of Chaos
// 3577450252 / Attunement of Flame
// 3577450255 / Attunement of Sky
// 4072386847 / Attunement of Control
// 1432514322 / Attunement of Grace
// 1577040049 / Attunement of the Elements
// 1577040050 / Attunement of Conduction