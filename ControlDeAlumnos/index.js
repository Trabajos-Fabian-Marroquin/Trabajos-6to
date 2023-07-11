'use strict'

require('dotenv').config();
const mongoConfig = require('./configs/mongo')
const app = require('./configs/app')
const userController = require('./src/user/user.controller')
const cursoController = require('./src/Curso/cursos.controller')

mongoConfig.connect();
app.initServer();
userController.defaultProfesor();
userController.defaultAlumno();
cursoController.defaultCurso();