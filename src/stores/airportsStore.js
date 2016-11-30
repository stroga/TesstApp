import { EventEmitter } from "events";
import Dispatcher from "../dispatcher";
//change store structure to one object
var airports = [];
var suggest = {departure: [], destination: []};
var searchResult = [];
var errorMessages = [];
var isLoadingExternally = {departure: false, destination: false};

class AirportsStore extends EventEmitter {

  getAirports() {
    return airports;
  }
  getSuggest() {
    return suggest;
  }

  getSearchResult() {
    return searchResult;
  }

  getErrorMessages() {
    return errorMessages;
  }

  getLoadingState() {
    return isLoadingExternally;
  }


}
const airportsStore = new AirportsStore();

Dispatcher.register( function (action) {
  switch (action.type) {
    case "START_LIST_CREATE":
      suggest[action.value] = [];
      isLoadingExternally[action.value] = true;
      break;
    case "START_SEARCH_REQUEST":
      //needs to be done 
      break;
    case "END_SEARCH_REQUEST":
      var sortedRes = action.value.sort( (a, b)=>{
        if ( new Date( a.dateFrom.split("T") ).getTime() > new Date( b.dateFrom.split("T") ).getTime() ) {
          return 1;
        } else {
          return -1;
        }
        return 0;
      });
      searchResult = sortedRes;
      break;
    case "END_LIST_CREATE":
      suggest[action.value.inputType] = action.value.list;
      isLoadingExternally = {departure: false, destination: false};
      airports = action.value.airports;
      errorMessages = action.value.errors;
      break;
  }
  console.log(action.type);
  airportsStore.emit("change");

} );

export {airportsStore};