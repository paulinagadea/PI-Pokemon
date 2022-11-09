const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const { Pokemon, Types } = require('../db');

// Función que trae todos los pokemones creados en la base de datos y los primeros 40 pokemones de la api externa.
const getAll = async () => {
    try {
        // Traigo la info de la API externa (solo los primeros 40 elementos) y la guardo en un array.
        const pokeApi = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40');
        const resApi = pokeApi.data.results;
        let apiPokemons = [];
        for (const pokemon of resApi) {
            let request = pokemon.url;
            let requestData = await axios.get(`${request}`);
            apiPokemons.push({
                name: requestData.data.name,
                id: requestData.data.id,
                life: requestData.data.stats[0].base_stat,
                attack: requestData.data.stats[1].base_stat,
                defense: requestData.data.stats[2].base_stat,
                speed: requestData.data.stats[5].base_stat,
                height: requestData.data.height,
                weight: requestData.data.weight,
                image: requestData.data.sprites.other.dream_world.front_default,
                type: requestData.data.types.map((e) => e.type.name),
            });
        };
        // Traigo los pokemones de mi base de datos incluyendo sus tipos.
        const dbPokemons = await Pokemon.findAll({
            include: {
                model: Types,
            },
        });
        // Si tengo pokemones creados en la base de datos los agrego a los pokemones de la api externa y los muestro.
        // Si no tengo nada creado en la base de datos muestro solamente los pokemones de la pokeapi.
        if (dbPokemons) {
            let pokemons = dbPokemons.concat(apiPokemons);
            return pokemons;
        } else {
            return apiPokemons;
        };
    } catch (error){
        console.error(error);
    };
};

// Función que trae solo un pokemon buscándolo por nombre en la base de datos y en la api externa.
const getByName = async (name) => {
    try {
        // Busco el pokemon en la api externa y lo guardo.
        const apiData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        let responseApi = {
            name: apiData.data.name,
            id: apiData.data.id,
            life: apiData.data.stats[0].base_stat,
            attack: apiData.data.stats[1].base_stat,
            defense: apiData.data.stats[2].base_stat,
            speed: apiData.data.stats[5].base_stat,
            height: apiData.data.height,
            weight: apiData.data.weight,
            image: apiData.data.sprites.other.dream_world.front_default,
            type: apiData.data.types.map((e) => e.type.name),
        };
        // Si no lo encuentro lo busco en la base de datos.
        if (!responseApi) {
            const responseDb = await Pokemon.findOne({ 
                where: {
                    name
                }, 
                include: {
                    model: {
                        Types,
                    },
                }});
            return responseDb;
        } else {
            return responseApi;
        };
    } catch (error) {
        console.error(error);
    };
};

// Función que trae solo un pokemon buscándolo por id en la base de datos y en la api externa.
const getById = async (id) => {
    try {
        // Busco el pokemon en la api externa y lo guardo.
        const apiInfo = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        let resultApi = {
            name: apiInfo.data.name,
            id: apiInfo.data.id,
            life: apiInfo.data.stats[0].base_stat,
            attack: apiInfo.data.stats[1].base_stat,
            defense: apiInfo.data.stats[2].base_stat,
            speed: apiInfo.data.stats[5].base_stat,
            height: apiInfo.data.height,
            weight: apiInfo.data.weight,
            image: apiInfo.data.sprites.other.dream_world.front_default,
            type: apiInfo.data.types.map((e) => e.type.name),
        };
        // Si no lo encuentro lo busco en la base de datos.
        if (!resultApi) {
            const resultDb = await Pokemon.findOne({ 
                where: {
                    id,
                }, 
                include: {
                    model: {
                        Types,
                    },
                }});
            return resultDb;
        } else {
            return resultApi;
        };
    } catch (error) {
        console.error(error);
    };
};

// Función que trae los resultados del formulario y crea un nuevo pokemon.
const createPokemon = async (name, life, attack, defense, speed, height, weight, image, type) => {
    try {
        // Creo el nuevo pokemon y lo guardo.
        const pokemonCreated = await Pokemon.create({
            id: uuidv4(),
            name: name.toLowerCase(),
            life,
            attack,
            defense,
            speed,
            height,
            weight,
            image,
        });
        // Busco los tipos de la base de datos y los agrego al nuevo pokemon.
        let typesDb = await Types.findAll({
            where: {
                name: type,
            }
        });
        pokemonCreated.addType(typesDb);
        return pokemonCreated;
    } catch (error) {
        console.error(error);
    };
};

// Función que trae todos los tipos de la api externa, los guarda en la base de datos y los muestra.
const getTypes = async () => {
    try {
        // Traigo los tipos y los guardo.
        const apiTypes = await axios.get('https://pokeapi.co/api/v2/type');
        let resultTypes = apiTypes.data.results;
        // Recorro el arreglo results de la api y me guardo los nombres de los tipos.
        let names = resultTypes.map(e => e.name);
        // Recorro el arreglo con los nombres y creo los tipos por cada elemento.
        if (names.length > 0) {
            names.map(e => {
                Types.findOrCreate({
                    where: {
                        name: e,
                    }
                });
            });
        };
        // Muestro los tipos.
        const typesDb = await Types.findAll();
        return typesDb;
    } catch (error) {
        console.error(error);
    };
};

module.exports = {
    getAll,
    getByName,
    getById,
    createPokemon,
    getTypes
};