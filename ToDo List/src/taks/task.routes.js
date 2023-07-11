'use strict'

const express = require('express'); //importar express
const api = express.Router(); //Crear una instancia del enrutador de express
const { addTask, getTasks, updateTask, deleteTask } = require('./task.controller');

api.post('/add', addTask);//post: el usuario envía datos mediante la solicitud (Body)
api.get('/get', getTasks);
api.put('/update/:id', updateTask)
api.delete('/delete/:id', deleteTask)

module.exports = api;