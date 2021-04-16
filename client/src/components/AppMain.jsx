import React from 'react';
import axios from 'axios';

// import SeasonList from './Season/SeasonList.jsx';

import CharacterList from './Equipment/CharacterList.jsx';


const bungieBaseURL = 'https://www.bungie.net';

class AppMain extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      userId: '4611686018468660527',
      WeaponInfoVisible: false,
      itemList:[]
    };

  }

  componentDidMount() {
    console.log('DDI started');
  }




  render() {


    return (
      <div className="main">
        DI menu
        <div>
          <div className="info" id="div_info">

            <CharacterList userId={this.state.userId} />

          </div>

        </div>

      </div>);
  }

}

export default AppMain;




// getWeaponInfo() {
//   console.log('Weapon Info button clicked ' + this.state.weaponInfoVisible);

//   if(!this.state.weaponInfoVisible){

//     if(this.state.weaponInfo.length === 1){
//       axios.get('/getWeapons')
//       .then((res) => {
//         // Load Equipment Info from server DB
//         this.setState({
//           weaponInfo: res.data,
//           weaponInfoVisible: true
//         });
//       });
//     } else {
//       //Toggle View - On
//       this.setState({
//         weaponInfoVisible: true
//       });
//     }
//   } else {
//     // Toggle View - Off
//     this.setState({
//       weaponInfoVisible: false
//     });
//   }

// }


{/* <button onClick={this.getWeaponDetailInfo}>
                Weapon Detail Please </button> */}

    //DIV STYLE
    //https://upmostly.com/tutorials/changing-the-background-color-in-react









/*


  //  this.getWeaponDetailInfo = this.getWeaponDetailInfo.bind(this);


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


*/







