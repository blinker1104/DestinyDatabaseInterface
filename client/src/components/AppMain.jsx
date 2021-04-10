import React from 'react';
import axios from 'axios';

import SeasonList from './SeasonList.jsx';

class AppMain extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      seasonInfo: [],
      seasonInfoVisible: false,
      WeaponInfo: [],
      WeaponInfoVisible: false
    };
    this.getSeasonInfo = this.getSeasonInfo.bind(this);
    this.getWeaponInfo = this.getWeaponInfo.bind(this);
  }

  componentDidMount() {
    console.log('will this be printed?');
    this.state.seasonInfo[0] = 'no data';
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



  render() {
    return (
      <div className="main">
        DI menu
        <div>
          <div className="info" id="div_info">
            <button onClick={this.getSeasonInfo}>
              {this.state.seasonInfoVisible ? "Show " : "Hide "} Season Info </button>

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
