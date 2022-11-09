import axios from 'axios';

export function getPokemons(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/pokemons');
        console.log(json)
        return dispatch({
            type: 'GET_POKEMONS',
            payload: json.data
        });
    };
};

export function filterByType(payload){
    return {
        type: 'FILTER_BY_TYPE',
        payload
    };
};