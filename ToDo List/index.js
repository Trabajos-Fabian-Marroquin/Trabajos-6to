'use strict' //Modo estricto (VERIFICAR O VALIDAR LAS VARIABLES [QUE ESTÉN DECLARADAS ANTES DE USARLAS])
/* let palindromo = 'oso'; //(Sin modo estricto, le agrega la palaba let)
console.log(palindromo) */
require('dotenv').config();
const mongoConfig = require('./configs/mongo');
const taskController = require('./src/taks/task.controller')
const app = require('./configs/app');

mongoConfig.connect();
//taskController.addTask();
app.initServer();