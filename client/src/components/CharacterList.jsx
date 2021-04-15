import React from 'react';
import axios from 'axios';

import WeaponList from './WeaponList.jsx';

const APIkey = require('../API/BungieAPI.js');
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
    const idSet = {
      cid : this.state.characterIds[2],
      uid :this.state.userId
    };
    return (
      <div>
        CharacterList
        {this.state.idReady ?
          <WeaponList
            ids = {idSet}
            /> : ''
        }

      </div>
    );
  }
}


export default CharacterList;