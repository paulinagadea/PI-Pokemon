const express = require('express');
const { getTypes } = require('../controllers/controllers.js');
const typesRoutes = express.Router();

// Rutas utilizadas en "/types".

// Obtengo todos los tipos desde mi base de datos.
typesRoutes.get('/', async (req, res) => {
    try {
        const types = await getTypes();
        if (types) {
            res.status(200).send(types);
        } else {
            res.status(404).send('Types not found');
        };
    } catch (error) {
        res.send(error);
    };
});

module.exports = typesRoutes;
