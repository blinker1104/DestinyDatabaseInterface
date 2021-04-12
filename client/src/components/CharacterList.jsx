import React from 'react';
import axios from 'axios';

import SeasonList from './SeasonList.jsx';

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
      userID: props.userID,
      characterID: [],
    };
    this.getCharacterInfo = this.getCharacterInfo.bind(this);

  }


  componentDidMount() {
    console.log('Character List');
    console.log(APIkey);
    this.getCharacterInfo();
  }


  getCharacterInfo() {
    console.log('get character info');
    const id = this.state.userID;
    const URL =  bungieCharURL+profile_steam+id+profile_component;

    axios(
      {
        method : 'get',
        url : URL,
        headers : {
          'X-API-Key' :  APIkey.value
          // ,'OriginHeaderDoesNotMatchKey' : '*'
        }

      })
      .then((res) => {
        console.log(res.data);
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  }


  render() {
    return (
      <div>
        CharacterList : {'Hello'}
      </div>
    );
  }
}


export default CharacterList;