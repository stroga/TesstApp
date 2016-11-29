import { EventEmitter } from "events";
import Dispatcher from "../dispatcher";

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
		case "START_AIRPORTS_REQUEST":
			isLoadingExternally[action.value] = true;
			break;
		case "END_AIRPORTS_REQUEST":
			airports = action.value;
			break;
		case "END_SEARCH_REQUEST":
			searchResult = action.value;
			break;
		case "END_SUGGESTIONS_CREATE":
			suggest[action.value.inputType] = action.value.list;
			isLoadingExternally = {departure: false, destination: false};
			break;
		case "REMOVE_SUGGESTIONS":
			suggest[action.value] = [];
			break;
		case "ADD_ERRORS":
			errorMessages = action.value;
			break;

	}
	airportsStore.emit("change");

} );

export {airportsStore}; 