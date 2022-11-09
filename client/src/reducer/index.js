const initalState = {
    pokemons: []
};

function rootReducer(state = initalState, action) {
    switch(action.type) {
        case 'GET_POKEMONS':
            return {
                ...state,
                pokemons: action.payload
            };
        case 'FILTER_BY_TYPE':
            const allPokemons = state.pokemons;
            const filteredPokemons = allPokemons.filter((pokemon) => pokemon.type.includes(action.payload));
            
            return {
                ...state,
                pokemons: filteredPokemons
            };
        default:
            return state;
    };
};

export default rootReducer;