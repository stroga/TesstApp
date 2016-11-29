import Dispatcher from "./dispatcher";
import fetch from 'react-native-cancelable-fetch';

const AIRPORTS_URL = "https://murmuring-ocean-10826.herokuapp.com/en/api/2/forms/flight-booking-selector/";
var currentRequest;

function getAirports() {
	fetch.abort( currentRequest );
	currentRequest = Date.now();
	var p = fetch(AIRPORTS_URL, null, currentRequest)
		.then(response => {
		
			return response.json();
		})
		.then(json => {

			return json;
		})
		.catch(ex => console.log('parsing failed', ex));
	return p;
}

function getFlights(queryObj) {
  var discounts = "https://murmuring-ocean-10826.herokuapp.com/en/api/2/flights/from/" + 
  								queryObj.departure + "/to/" + queryObj.arive + "/" + queryObj.travel_date_start + " /" + 
  								queryObj.travel_date_end + "/250/unique/?limit=15&offset-0";
  var p = fetch(discounts)
    .then(response => response.json())
    .then(json => json.flights)
    .catch(ex => console.log('parsing failed', ex));
  
  return p;
}

var ActionsForm = {
	findFlights(val) {
		getFlights( val ).then((searchResult)=>{
			Dispatcher.dispatch({
				type: "END_SEARCH_REQUEST",
				value: searchResult
			});
		});
	},

	findAirports(val) {
		getAirports().then( (response)=>{
			Dispatcher.dispatch({
				type: "END_AIRPORTS_REQUEST",
				value: response.airports
			});
		} );
	},

	prepareSuggestionList(obj) {
		Dispatcher.dispatch({
				type: "START_AIRPORTS_REQUEST",
				value: obj.inputType
			});
		getAirports().then( (response)=>{
			Dispatcher.dispatch({
				type: "END_AIRPORTS_REQUEST",
				value: response.airports
			});
			Dispatcher.dispatch({
				type: "ADD_ERRORS",
				value: response.messages
			});

			var text = obj.value;
			var newList = [];
	    response.airports.map( (airport)=>{
	    	if ( ( airport.name + airport.country.name + airport.iataCode ).toLowerCase().indexOf(text) > -1 )  {
	    		var o = {
	    			value: airport.name,
	    			label: airport.name+": "+airport.country.name+" ("+airport.iataCode+")"
	    		};
	    		newList.push(o);
	    	}
	    } );

	    Dispatcher.dispatch({
				type: "END_SUGGESTIONS_CREATE",
				value: {list: newList, inputType: obj.inputType}
			});
		} );
	},

	removeSuggestions(inputType) {
		Dispatcher.dispatch({
			type: "REMOVE_SUGGESTIONS",
			value: inputType
		});
	},

	initRequest() {
		Dispatcher.dispatch({
			type: "INIT_REQUEST_START",
			value: []
		});
		getAirports().then( (response)=>{
			Dispatcher.dispatch({
				type: "END_AIRPORTS_REQUEST",
				value: response.airports
			});
			Dispatcher.dispatch({
				type: "ADD_ERRORS",
				value: response.messages
			});
		} );
	}
};

export { ActionsForm };