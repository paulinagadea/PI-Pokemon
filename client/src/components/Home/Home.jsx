import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPokemons, filterByType } from '../../actions/index.js';
import SearchBar from '../SearchBar/SearchBar.jsx';
import Pokemon from '../Pokemon/Pokemon.jsx';
import Pagination from '../Pagination/Pagination.jsx';

export default function Home() {
    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons);
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12);
    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        dispatch(getPokemons());
    }, [dispatch]);

    function handleClick(e) {
        e.preventDefault();
        dispatch(getPokemons());
    };

    const handleClickPrev = (e) => {
        setCurrentPage(currentPage - 1);
    };

    const handleClickNext = (e) => {
        setCurrentPage(currentPage + 1);
    };

    function handleFilterByType(e) {
        dispatch(filterByType(e.target.value));
    };

    return (
        <div>
            
            <Link to='/pokemon'>Create Pokemon</Link>
            <h1>Proyecto numero 29872686480</h1>
            <button onClick={e => {handleClick(e)}}>Recargar pokemons</button>
            
            <div>
                <select>
                    <option>Order by name:</option>
                    <option value='asc'>A - Z</option>
                    <option value='desc'>Z - A</option>
                </select>
                <select>
                    <option>Order by attack:</option>
                    <option value=''></option>
                    <option value=''></option>
                </select>
                <select onChange={e => {handleFilterByType(e)}}>
                    {/* Filtrado por tipos */}
                    <option>Filter by type:</option>
                    <option value='all'>All</option> 
                    <option value='normal'>Normal</option> 
                    <option value='fighting'>Fighting</option> 
                    <option value='flying'>Flying</option> 
                    <option value='poison'>Poison</option> 
                    <option value='ground'>Ground</option> 
                    <option value='rock'>Rock</option> 
                    <option value='bug'>Bug</option> 
                    <option value='ghost'>Ghost</option> 
                    <option value='steel'>Steel</option> 
                    <option value='fire'>Fire</option> 
                    <option value='water'>Water</option> 
                    <option value='grass'>Grass</option> 
                    <option value='electric'>Electric</option> 
                    <option value='psychic'>Psychic</option> 
                    <option value='ice'>Ice</option> 
                    <option value='dragon'>Dragon</option> 
                    <option value='dark'>Dark</option> 
                    <option value='fairy'>Fairy</option> 
                    <option value='unknown'>Unknown</option> 
                    <option value='shadow'>Shadow</option> 
                </select>
                <select>
                    <option value='all'>All</option>
                    <option value='api'>Existent</option>
                    <option value='created'>Created</option>
                </select>
            </div>

            <SearchBar />

            <nav>
                <ul>
                    <button onClick={e => {handleClickPrev(e)}}>Prev</button>
                    <Pagination pokemonsPerPage={pokemonsPerPage} allPokemons={allPokemons.length} paginado={paginado} />
                    <button onClick={e => {handleClickNext(e)}}>Next</button>
                </ul>
            </nav>

            {currentPokemons?.map(e => {
                return (
                    <Link to={'/pokemon/ + e.id}'}>
                        <Pokemon name={e.name} type={e.type} image={e.image} key={e.id}/>
                    </Link>
                )
            })}

        </div>
    );
};