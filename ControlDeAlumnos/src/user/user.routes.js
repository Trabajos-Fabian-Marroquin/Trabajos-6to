'use strict'

const express = require('express');
const api = express.Router();
const { ensureAuth } = require('../services/authenticated')
const userController = require('./user.controller');


//Rutas
//test normal
api.get('/test', userController.test);
//registrar alumno o profesor
api.post('/register', userController.save);
//agregar cursos a alumno
api.put('/update/:id', userController.updatecurso);
//login
api.post('/login', userController.login)
//Mirar los cursos de una lumno
api.get('/cursosAlum/:id', userController.cursosAlumno)
//eliminar alumno
api.delete('/delete/:id', ensureAuth, userController.deleteAlumno)
//actualizar alumno
api.put('/updateAlumnos/:id', ensureAuth, userController.updateAlumno)
//mirar los cursos que da un profesor
api.get('/cursosProfe/:id', ensureAuth, userController.cursosProfesor)
module.exports = api;