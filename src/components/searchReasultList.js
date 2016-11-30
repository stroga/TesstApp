import React, { Component } from 'react';

function formatTime(time) {
  var timeSplited = time.split(":");
  var hours = timeSplited[0]-0;
  var minutes = timeSplited[1];
  hours = (hours>9) ? hours : "0"+hours;
  return hours +":"+minutes;
}

function calculateMinutes( date, time ) {
  return ( new Date(date + " " + time).getTime()/(1000*60) );
}

function SearchResultItem(props) {
  var splitedDateFrom = props.item.dateFrom.split("T");
  var splitedDateTo = props.item.dateTo.split("T");

  var formattedTimeFrom = formatTime(splitedDateFrom[1]);
  var formattedTimeTo = formatTime(splitedDateTo[1]);

  var minutesTo = calculateMinutes(splitedDateTo[0], formattedTimeTo);
  var minutesFrom = calculateMinutes(splitedDateFrom[0], formattedTimeFrom);

  var durationTimeHours = Math.floor( (minutesTo - minutesFrom)/60 );
  var durationTimeMinutes = (minutesTo - minutesFrom)%60;
  var durationTime = durationTimeHours + (durationTimeHours > 1 ? "hrs " : "hr ")  + durationTimeMinutes + "mins";

  return (
    <div className="search_item">
      <div className="header_line">
        <span className="dep_info">
          <strong>From:</strong>
          {props.from}
        </span>
        <span className="result_duration">
          {durationTime}
        </span>
        <span className="dest_info">
          <strong>To:</strong> {props.to}
        </span>
      </div>
      <div className="result_content">
        <div className="result_from">
            <div className="result_date">{splitedDateFrom[0]}</div>
            <div className="result_time"> {formattedTimeFrom}</div>
        </div>
        
         <div className="price_info">
          
          <strong>{props.item.currency} {(Math.round(props.item.price * 100)/100).toFixed(2)}</strong>
          <button className="book_flight">BOOK</button>
        </div>
        <div className="result_to">
          <div className="result_date">{splitedDateTo[0]}</div>
          <div className="result_time"> {formattedTimeTo}</div>
        </div>
      </div>
    </div>
  )
} 

class SearchResult extends Component {
  render() {
    return (
      <div className="search_result">
        {this.props.result.map((item, key) => <SearchResultItem item={item} key={key} {...this.props}/>)}
      </div>
    );
  }
}

export { SearchResult };