import React from 'react';
import axios from 'axios';

class AppMain extends React.Component {

  constructor() {
    super();
    this.state = {
      test: true
    };
  }

  componentDidMount() {
    console.log('will this be printed?');
  }

  // getAttendees() {
  //   axios.get('/attendees')
  //     .then(res => {
  //       this.setState({
  //         attendees: res.data,
  //       });
  //     });
  // }

  // addAttendee(attendee) {
  //   axios.post('/attendees', attendee)
  //     .then(() => {
  //       this.getAttendees();
  //     });
  // }

  render() {
    return (
      <div className="main">
        App Main section
        Can you see this?
      </div>);
  }
}

export default AppMain;
