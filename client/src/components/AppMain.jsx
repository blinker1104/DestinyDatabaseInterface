import React from 'react';
import axios from 'axios';

import SeasonList from './SeasonList.jsx';

import CharacterList from './CharacterList.jsx';


const bungieBaseURL = 'https://www.bungie.net';

class AppMain extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      userID: '4611686018468660527',
      seasonInfo: [],
      seasonInfoVisible: false,
      WeaponInfo: [],
      WeaponIcons_0: [],
      WeaponIcons_1: [],
      WeaponIcons_2: [],
      WeaponInfoVisible: false,
      itemList:[]
    };
    this.getSeasonInfo = this.getSeasonInfo.bind(this);
    this.getWeaponInfo = this.getWeaponInfo.bind(this);
    this.getWeaponDetailInfo = this.getWeaponDetailInfo.bind(this);

  }

  componentDidMount() {
    console.log('will this be printed?');
    this.state.seasonInfo[0] = 'no data';
    this.getWeaponDetailInfo();
  }

  getSeasonInfo() {
    console.log('Season Info button clicked ' + this.state.seasonInfoVisible);

    if(!this.state.seasonInfoVisible){

      if(this.state.seasonInfo.length === 1){
        axios.get('/getSeasons')
        .then((res) => {
          console.log('getSeason - response received' + res);
          // Load SeasonInfo from server DB
          this.setState({
            seasonInfo: res.data,
            seasonInfoVisible: true
          });
        });
      } else {
        //Toggle View - On
        this.setState({
          seasonInfoVisible: true
        });
      }
    } else {
      // Toggle View - Off
      this.setState({
        seasonInfoVisible: false
      });
    }
  }



  getWeaponInfo() {
    console.log('Weapon Info button clicked ' + this.state.weaponInfoVisible);

    if(!this.state.weaponInfoVisible){

      if(this.state.weaponInfo.length === 1){
        axios.get('/getWeapons')
        .then((res) => {
          console.log('getSeason - response received' + res);
          // Load SeasonInfo from server DB
          this.setState({
            weaponInfo: res.data,
            weaponInfoVisible: true
          });
        });
      } else {
        //Toggle View - On
        this.setState({
          weaponInfoVisible: true
        });
      }
    } else {
      // Toggle View - Off
      this.setState({
        weaponInfoVisible: false
      });
    }

  }


  //Testing
  getWeaponDetailInfo() {
    console.log('Astral Horizon Data Testing');

    let perkSample = [
      1697682876, 682617678, 4073514581, 1886251741, 1162525369, 1984731949, 3469836202, 3983457027, 1047830412, 3142289711, 3436462433, 1264398905, 4248210736, 941997506, 2697220197, 38912240
      ];

    // let perkSample =[
    //   1697682876, 682617678, 4073514581, 1886251741, 1162525369, 1984731949, 3469836202
    // ];

    let perkSample_305 =[
      1697682876, 3983457027, 1047830412, 3142289711, 3436462433, 1264398905, 4248210736, 941997506, 2697220197, 38912240
    ];

    perkSample = perkSample_305;

    let iconList = [];
    let iconSlot = 0;
    this.state.WeaponIcons_0 = iconList;
    const len = perkSample.length;
    for (let i =0; i< len; i++) {
      const p = perkSample[i];
      axios.get('/getItem/' + p)
        .then((response)=>{
          if(response.data){
            // console.log('item: ',response);
            iconList[i] = bungieBaseURL+response.data.icon;
            // console.log(this.state.WeaponIcons_0);

            this.setState({
              WeaponIcons_0 : iconList
            });
          }
        });
    }
  }


  render() {

    const icons_slot0 = this.state.WeaponIcons_0.map( (url)=>{
      return (<img  style={{
        backgroundColor: 'gray',
        width: '50px',
        height: '50px' }}
        src={url} />);
    });
    // console.log('Icons#: ', icons_slot0.length);

    //DIV STYLE
    //https://upmostly.com/tutorials/changing-the-background-color-in-react

    return (
      <div className="main">
        DI menu
        <div>
          <div className="info" id="div_info">

            <div>
              <div className="sample Item icons slot" id="item_slot_1">
                {icons_slot0};
              </div>
              {/* <button onClick={this.getWeaponDetailInfo}>
                Weapon Detail Please </button> */}
            </div>



            {/* <div>
              <div className="sample Item icons slot" id="item_slot_1">
                {this.state.itemList};
              </div>
              <button onClick={this.getWeaponDetailInfo}>
                Weapon Detail Please </button>
            </div> */}

            <CharacterList userID={this.state.userID} />



            <button onClick={this.getSeasonInfo}>
              {this.state.seasonInfoVisible ? "Hide " : "Show "} Season Info </button>

            {/* <p>{this.state.seasonInfo.length}</p> */}
            {this.state.seasonInfoVisible ?
              <SeasonList info={this.state.seasonInfo}/> : ''
            }
          </div>

          <div className="info" id="div_info">
            <button onClick={this.getWeaponInfo}>
              Show Equipped Weapons Info </button>

            {/* <p>{this.state.seasonInfo.length}</p> */}
            {this.state.WeaponInfoVisible ?
              <WeaponList info={this.state.weaponInfo}/> : ''
            }
          </div>
        </div>

      </div>);
  }
}

export default AppMain;
