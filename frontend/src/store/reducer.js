import moment from 'moment'
import config from "../config";

const defaultState = {
    politiciansFilter:{
        input:'',
        party:'',
        order:'popularity'
    },
    partyFilter:{
        input:'',
        order:'popularity'
    },
    map:{
       constituency:''
    },
    // date:moment().format(config.dateFormat),
    date:(moment().subtract(1, "days")).format(config.dateFormat),
    count:0,
    politiciansDate:[]

}

export default (state=defaultState,action) =>{
    console.log("action",action.type)
    switch (action.type) {
        // case "REFRESH_DASHBOARD":
        //     var newState = state
        //     newState.count =  newState.count+1
        //     return newState

        case "UPDATE_POLITICIAN_INPUT":
            var newState = state
            newState.politiciansFilter.input = action.value
            return newState
        case "UPDATE_POLITICIAN_PARTY":
            var newState = state
            newState.politiciansFilter.party = action.value
            return newState
        case "UPDATE_POLITICIAN_ORDER":
            var newState = state
            newState.politiciansFilter.order = action.value
            return newState
        case "UPDATE_POLITICIAN_RESET":
            var newState = state
            newState.politiciansFilter.order = "popularity"
            newState.politiciansFilter.input = ""
            newState.politiciansFilter.party = "all"
        case "UPDATE_POLITICIAN_FILTERING":
            var newState = state
            newState.politiciansFilter.order = action.value.order
            newState.politiciansFilter.input = action.value.input
            newState.politiciansFilter.party = action.value.party
            return newState
        case "UPDATE_PARTY_FILTERING":
            var newState = state
            newState.partyFilter.order = action.value.order
            newState.partyFilter.input = action.value.input
            newState.partyFilter.party = action.value.party

            return newState
        case "SAVE_MAP":
            var newState = state
            newState.map.loadedMap = action.value
            newState.map.mapHasLoaded = true
            return newState
        case "MAP_UPDATE_DETAIL":
            var newState = state
            newState.map.constituency = action.value
            return newState
        case "CHANGE_DATE":
            var newState = state
            newState.date = action.value
            console.log(action.value)
            // console.log(newState)
            return newState
        case "GET_POLITICIAN_DATA_SUCCESS":
            var newState = state
            state.politiciansDate = action.value
            console.log(newState)
            return newState
    }
    return state;
}