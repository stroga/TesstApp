import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';


class DatePickerRange extends Component {
  constructor(props) {
    super( props );
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
    this.state = {
      startDate: moment(),
      endDate: moment().day(3)
    };
  }

  handleChangeStart(date){
    console.log( "changed START date" );
    this.setState({
      startDate: date
    });
  }


  handleChangeEnd(date){
    console.log( "changed END date" );
   	 this.setState({
      endDate: date
    }); 
  }


  render() {
    return (
      <div className="date_range">
        
        
        <DatePicker
          selected={this.state.startDate}
          selectsStart  startDate={this.state.startDate}
          endDate={this.state.endDate}
          onChange={this.handleChangeStart} 
          dateFormat="MM-DD-YYYY"
          name="travel_date_start" />
        <DatePicker
          selected={this.state.endDate}
          selectsEnd  startDate={this.state.startDate}
          endDate={this.state.endDate}
          onChange={this.handleChangeEnd} 
          dateFormat="MM-DD-YYYY"
          name="travel_date_end"/>
      </div>
    );
  }
}

export { DatePickerRange };