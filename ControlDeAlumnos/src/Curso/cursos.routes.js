'use strict'

const express = require('express');
const api = express.Router();
const cursosController = require('./cursos.controller');
const { ensureAuth } = require('../services/authenticated');

//rutas
api.get('/test', cursosController.test);
api.post('/save', cursosController.savecurso);
api.delete('/delete/:id', ensureAuth,cursosController.deleteCurso);
api.put('/update/:id', ensureAuth, cursosController.updateCurso);
module.exports = api;