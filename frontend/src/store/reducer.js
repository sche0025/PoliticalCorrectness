const defaultState = {
    politiciansFilter:{
        input:'',
        party:'all',
        gender:'all'
    }

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
    }
    return state;
}