const defaultState = {
    politicians:{
        input:'',
        party:'all',
        gender:'all'
    }

}

export default (state=defaultState,action) =>{

    switch (action.type) {
        case "UPDATE_INPUT":
            var newState = state
            newState.politicians.input = action.value
            return newState
            break;
    }
    return state;
}