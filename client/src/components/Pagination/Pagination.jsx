import React from 'react';

export default function Pagination({ pokemonsPerPage, allPokemons,  paginado }) {
    const pageNumber = [];

    for (let i = 1; i <= Math.ceil(allPokemons/pokemonsPerPage); i++) {
        pageNumber.push(i);
    };

    return (
        <>
            { pageNumber?.map(number => (
                <button key={number} onClick={() => paginado(number)}>{number}</button>
            ))}
        </>
        
    );
};