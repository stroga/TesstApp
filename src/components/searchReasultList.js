import React, { Component } from 'react';

class SearchResult extends Component {
  render() {

    return (
      <div className="search_result">
        {
          this.props.result.map( (res, ind)=>{
            return (
              <div className="search_item" key={ind}>
                <div className="header_line">
                  <span>
                    From: {this.props.fromVal}
                  </span>
                  <span>
                    Price: {res.price}
                  </span>
                  <span>
                    To: {this.props.toVal}
                  </span>
                </div>
                <div className="result_content">
                  <div>
                    Departure:
                      <div>date: {res.dateFrom}</div>
                      <div>time: {res.dateFrom}</div>
                  </div>
                  <div>
                    Destination:
                    <div>date: {res.dateTo}</div>
                    <div>time: {res.dateTo}</div>
                  </div>
                </div>
              </div>
            )
          } )
        }
      </div>
    );
  }
}

export { SearchResult };