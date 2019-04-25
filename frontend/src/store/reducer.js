import moment from 'moment'

const defaultState = {
    politiciansFilter:{
        input:'',
        party:'all',
        gender:'all'
    },
    map:{
       constituency:''
    },
    date:moment()

}

export default (state=defaultState,action) =>{

    switch (action.type) {
        case "UPDATE_INPUT":
            var newState = state
            newState.politiciansFilter.input = action.value
            return newState
        case "UPDATE_PARTY":
            var newState = state
            newState.politiciansFilter.party = action.value
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
            return newState
    }
    return state;
}