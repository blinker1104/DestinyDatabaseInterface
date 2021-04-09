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


// {/* {this.props.info ? this.props.info : ''} */}
//         {/* {info ? info.map( (s) =>
//           <SeasonInfo sData = {s} />
//           ) : 'NO DATA'
//         } */}