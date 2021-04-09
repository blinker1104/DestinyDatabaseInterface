import React from 'react';

import moment from 'moment';

const decodeSeasonData = (data) => {
  console.log(data.displayProperties.name);
  const d = {};
  d.name = data.displayProperties.name;
  d.desc = data.displayProperties.description;
  d.seasonNumber = data.seasonNumber;
  d.stDate = data.startDate;
  d.endDate = data.endDate;
  console.log('decode ' + d);
  return d;
}



const SeasonInfo = ( {sData} ) => {
  console.log('SeasonTab ' + sData);
  const s = sData ? decodeSeasonData(sData) :
    {name:'', desc:'', stDate:'', endDate:''};

  return (
    <div className="SeasonList">
      <h2> {s.seasonNumber} / {s.name} </h2>
      <p> {s.desc} </p>
      <div className = "SeasonTimestamp" >
        {s.stDate ? (

          <div className="SeasonDate">
            <div>Start Time: {moment(s.stDate).format('l')}</div>
            <div>End Time: {moment(s.endDate).format('l')}</div>
            <div> Unlock Time : {moment(s.stDate).fromNow()}</div>
          </div>) : "No Date Info"}
      </div>
    </div>
  );

  // return (
  //   <div className="SeasonInfo">
  //     <h2> {sData.displayProperties.name} </h2>
  //   </div>
  // );
};

export default SeasonInfo;