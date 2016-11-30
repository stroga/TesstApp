import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';



var CustomInput = React.createClass({

  render() {
    return (
      <input readOnly="readonly" 
            className={"custom_input " + this.props.name}
            name={this.props.name}
            onClick={this.props.onClick} 
            value={this.props.value}/>
    );
  }
});

class DatePickerRange extends Component {
  constructor(props) {
    super( props );
    this.state = {
      startDate: moment(),
      endDate: moment().day(3)
    };
  }

  handleChange(dateType,date){
    this.setState({
      [dateType]: date
    });
  }

  render() {
    return (
      <div className="date_range">
        
        
        <DatePicker
          selected={this.state.startDate}
          selectsStart  startDate={this.state.startDate}
          endDate={this.state.endDate}
          onChange={this.handleChange.bind(this, "startDate")} 
          dateFormat="MM-DD-YYYY"
          customInput={<CustomInput />}
          name="travel_date_start"
        />
          

        <DatePicker
          selected={this.state.endDate}
          selectsEnd  startDate={this.state.startDate}
          endDate={this.state.endDate}
          onChange={this.handleChange.bind(this, "endDate")} 
          dateFormat="MM-DD-YYYY"
          customInput={<CustomInput />}
          name="travel_date_end"/>
      </div>
    );
  }
}

export { DatePickerRange };