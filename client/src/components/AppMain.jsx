import React from 'react';
import axios from 'axios';

class AppMain extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      seasonInfo: []
    };
    this.getSeasonInfo = this.getSeasonInfo.bind(this);
  }

  componentDidMount() {
    console.log('will this be printed?');
    this.state.seasonInfo[0] = 'no data';
  }

  getSeasonInfo() {
    console.log('button clicked');
    axios.get('/getSeasons')
      .then((res) => {
        console.log('response received');
        console.log(res);
        this.setState({
          seasonInfo: res.data
        });
        console.log('state');
        console.log(this.state.seasonInfo);
      });
  }



  render() {
    return (
      <div className="main">
        App Main section
        <button onClick={this.getSeasonInfo}> Get Season Info</button>
        <div className="info" id="div_info">
          Please click the button to get update on season info.

          <p>{this.state.seasonInfo.length}</p>
        </div>
      </div>);
  }
}

export default AppMain;
