const express = require('express');
const { getAll, getByName,  getById, createPokemon } = require('../controllers/controllers.js');
const pokemonsRoutes = express.Router();

// Rutas utilizadas en "/pokemons".

// Obtengo los pokemones que coinciden con la query.
pokemonsRoutes.get('/', async (req, res) => {
    const { name } = req.query;
    try {
        // Si no recibo un nombre por query traigo todos los pokemones y los muestro.
        if (!name) {
            let pokemones = await getAll();
            res.status(200).send(pokemones);
        } else {
            let pokemon = await getByName(name);
            if (pokemon) {
                res.status(200).send(pokemon);
            } else {
                res.status(404).send('Pokemon not found');
            };
        };
    } catch (error) {
        res.send(error);
    };
});

// Obtengo los pokemones que coinciden con la id.
pokemonsRoutes.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // Busco el pokemon por id, si lo encuentro lo guardo y lo muestro.
        let result = await getById(id);
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(404).send('Pokemon not found');
        };
    } catch (error) {
        res.send(error);
    };
});

// Obtengo los datos del formulario y creo un nuevo pokemon.
pokemonsRoutes.post('/', async (req, res) => {
    const { name, id, life, attack, defense, speed, height, weight, image, type } = req.body;
    try {
        // Si logro crear el nuevo pokemon lo muestro.
        let newPokemon = await createPokemon(name, id, life, attack, defense, speed, height, weight, image, type);
        if (newPokemon) {
            res.status(200).send(newPokemon);
        } else {
            res.status(404).send('Could not create a new pokemon');
        };
    } catch (error) {
        res.send(error);
    };
});

module.exports = pokemonsRoutes;
