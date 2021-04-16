import React from 'react';


import SeasonInfo from './SeasonInfo.jsx';




class SeasonList extends React.Component {

  constructor(props) {
    super(props);
    this.state = { };

  }

  render() {
    const info = this.props.info.sort(
      (a,b) => (a.seasonNumber > b.seasonNumber) ? 1 : -1);
    return (
      <div className="SeasonList">
        <h3>Season Info</h3>
        {info ? info.map( (s) =>
          <SeasonInfo sData = {s} />
          ) : 'NO DATA'
        }
      </div>
    );
  }
}

export default SeasonList;



  // getSeasonInfo() {
  //   console.log('Season Info button clicked ' + this.state.seasonInfoVisible);

  //   if(!this.state.seasonInfoVisible){

  //     if(this.state.seasonInfo.length === 1){
  //       axios.get('/getSeasons')
  //       .then((res) => {
  //         console.log('getSeason - response received' + res);
  //         // Load SeasonInfo from server DB
  //         this.setState({
  //           seasonInfo: res.data,
  //           seasonInfoVisible: true
  //         });
  //       });
  //     } else {
  //       //Toggle View - On
  //       this.setState({
  //         seasonInfoVisible: true
  //       });
  //     }
  //   } else {
  //     // Toggle View - Off
  //     this.setState({
  //       seasonInfoVisible: false
  //     });
  //   }
  // }




// {/* {this.props.info ? this.props.info : ''} */}
//         {/* {info ? info.map( (s) =>
//           <SeasonInfo sData = {s} />
//           ) : 'NO DATA'
//         } */}