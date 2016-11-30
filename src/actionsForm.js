import Dispatcher from "./dispatcher";
import fetch from 'react-native-cancelable-fetch';
const AIRPORTS_URL = "https://murmuring-ocean-10826.herokuapp.com/en/api/2/forms/flight-booking-selector/";
var currentRequest;

function getAirports() {
  fetch.abort( currentRequest );
  currentRequest = Date.now();
  return fetch(AIRPORTS_URL, null, currentRequest)
    .then(response => response.json())
    .then(json => json)
    .catch(ex => console.log('parsing failed', ex));
}

function getFlights(queryObj) {
  var discounts = "https://murmuring-ocean-10826.herokuapp.com/en/api/2/flights/from/" + 
                  queryObj.searchedFrom + "/to/" + queryObj.searchedTo + 
                  "/" + queryObj.searchDateFrom + " /" + 
                  queryObj.searchDateTo + "/250/unique/?limit=15&offset-0";
  return fetch(discounts)
    .then(response => response.json())
    .then(json => json.flights)
    .catch(ex => console.log('parsing failed', ex));
}

var ActionsForm = {
  findFlights(val) {
    Dispatcher.dispatch({
        type: "START_SEARCH_REQUEST",
        value: ""
      });
    getFlights(val).then((searchResult)=>{
      Dispatcher.dispatch({
        type: "END_SEARCH_REQUEST",
        value: searchResult
      });
    });
  },

  prepareSuggestionList(obj) {
    Dispatcher.dispatch({
      type: "START_LIST_CREATE",
      value: obj.inputType
    });
    getAirports().then(({ airports, messages }) => {
      var text = obj.value;
      var newList = airports.reduce((prev, { name, country, iataCode }) => {
         if ((name + country.name + iataCode ).toLowerCase().indexOf(text.toLowerCase()) > -1 )  {
          var o = {
            value: name,
            label: name+": "+country.name+" ("+iataCode+")"
          };
          prev.push(o);
        }
        return prev;
      }, []);

      Dispatcher.dispatch({
        type: "END_LIST_CREATE",
        value: {list: newList, inputType: obj.inputType, airports, errors: messages }
      });
    });
  }
};

export { ActionsForm };