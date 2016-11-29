import React, { Component } from 'react';
import { airportsStore } from './stores/airportsStore';

import { SearchResult } from './components/searchReasultList';
import { ActionsForm } from './actionsForm';
import { DatePickerRange } from './components/datePicker'
import { debounce } from 'lodash';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';

import Select from 'react-select';
import 'react-select/dist/react-select.css';



//var throttledPrepareSuggestionList = throttle( ActionsForm.prepareSuggestionList, 500 );
var debouncedPrepareSuggestionList = debounce( ActionsForm.prepareSuggestionList, 250 );

class App extends Component {
  constructor(props) {
    super(props);
    this.onChangeValueDest = this.onChangeValueDest.bind(this);
    this.onChangeStoreHandler = this.onChangeStoreHandler.bind(this);
    this.onSubmitSearch = this.onSubmitSearch.bind( this );
    this.onChangeValueDep = this.onChangeValueDep.bind(this);
    this.onChangeSelectedValueDep = this.onChangeSelectedValueDep.bind(this);
    this.onChangeSelectedValueDest = this.onChangeSelectedValueDest.bind(this);
    this.state = {result: [], 
                  suggest: {departure: [], destination: []}, 
                  airports: [], 
                  errors: [], 
                  isLoadingExternally: {departure: false, destination: false}, 
                  fromVal: "",
                  toVal: ""
                };

  }

  onChangeStoreHandler() {

    this.setState({
        airports: airportsStore.getAirports(),
        suggest: airportsStore.getSuggest(),
        result: airportsStore.getSearchResult(),
        errors: airportsStore.getErrorMessages(),
        isLoadingExternally: airportsStore.getLoadingState(),

      });
  }

  componentWillMount() {
    ActionsForm.initRequest();
    airportsStore.on("change", this.onChangeStoreHandler);
  }

  componentWillUnmount() {
    airportsStore.off( "change", this.onChangeStoreHandler );
  }

  onSubmitSearch(e){

    e.preventDefault();

    var errors = [];
    var data = {};
    var inputs = [].slice.call(e.target.getElementsByTagName('input'));
    inputs.map(input => {
      data[input.name] = input.value;
      
    });

    if ( !!errors.length ) {
      //ADD ERROR HANDLER!!!!!!
      console.log( errors );
      return;
    }
    ActionsForm.findFlights(data);
    console.log("SUBMITTED!!!!");

  }


  onChangeValueDest(val) {
    this.setState({
      isLoadingExternally: {destination: true}
    });
    ActionsForm.removeSuggestions( "destination" );
    if ( !!val  && val.length ) {
      debouncedPrepareSuggestionList({value: val, inputType: "destination"});
      return;
    }
  }

  onChangeValueDep(val) {
    this.setState({
      isLoadingExternally:{departure: true}
    });
    ActionsForm.removeSuggestions("departure");
    if ( !!val  && val.length ) {
      debouncedPrepareSuggestionList({value: val, inputType: "departure"});
      return;
    }
  }
  

  onChangeSelectedValueDep( val ) {
    this.setState({
      fromVal: val.value
    });
  }
  
  onChangeSelectedValueDest( val ) {
    this.setState({
      toVal: val.value
    });
  }

  arrowFunc(classParam) {
    return (<svg className={classParam} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 495.526 495.525">
    <path d="M425.475,221.694h-78.287H220.093H75.674L7.381,153.396c-1.47-1.464-3.769-1.688-5.486-0.518    c-1.722,1.166-2.364,3.385-1.536,5.289l34.755,80.184c-1.107,1.765-2.06,3.649-2.845,5.622l-0.022,4.979    c-5.655,0.267-10.175,4.895-10.175,10.624c0,5.746,4.55,10.397,10.235,10.639c0.752,1.882,1.631,3.698,2.678,5.422l39.246,16.859    h172.862l-69.422,33.418c-2.404,5.482-0.56,11.924,4.386,15.3c2.128,1.466,4.593,2.167,7.025,2.183l184.265-50.905h52.127    c19.555,0,70.051-15.847,70.051-35.41C495.531,237.532,445.03,221.694,425.475,221.694z" fill="#0a0a8c"/>
    <path d="M204.454,215.626h85.024l-87.526-24.174c-2.439,0-4.893,0.717-7.03,2.173c-4.947,3.385-6.791,9.822-4.386,15.303    L204.454,215.626z" fill="#0a0a8c"/>
</svg>
)
;  }


  
  render() {
    return (
      <div className="travel_form">

        <form onSubmit={this.onSubmitSearch}>
          <label htmlFor="departure"><span>from</span>
            <Select
              arrowRenderer={this.arrowFunc.bind(this,"plane_from")}
              placeholder="Departure"
              noResultsText={false}
              className="dep"
              value={this.state.fromVal}
              name="form-field-name-departure"
              options={this.state.suggest.departure}
              onInputChange={this.onChangeValueDep}
              isLoading={this.state.isLoadingExternally.departure}
              onChange={this.onChangeSelectedValueDep}
            />
          </label>
          
          <label htmlFor="destination"><span>to</span>
            <Select
              arrowRenderer={this.arrowFunc.bind(this,"plane_to")}
              placeholder="Destination"
              noResultsText={false}
              className="dest"
              value={this.state.toVal}
              name="form-field-name-destination"
              options={this.state.suggest.destination}
              onInputChange={this.onChangeValueDest}
              isLoading={this.state.isLoadingExternally.destination}
              onChange={this.onChangeSelectedValueDest}
            />
          </label>

         
          <div className="datepicker_wrapper">
            <span className="label_date">dates</span>
            <DatePickerRange />  
          </div>
          
          
          
          <br/>
          
          <button className="submit_search">Search</button>
           
        </form>
        {this.state.result ? <SearchResult result={this.state.result} {...this.state}/> : null}
      </div>
    );
  }
}

export default App;