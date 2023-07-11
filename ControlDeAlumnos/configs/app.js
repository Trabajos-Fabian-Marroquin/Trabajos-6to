'use strict'

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const app = express();
const userRoutes = require('../src/user/user.routes')
const cursosRoutes = require('../src/Curso/cursos.routes')

const port = process.env.PORT || 3100;

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use('/user', userRoutes);
app.use('/curso', cursosRoutes);


exports.initServer = ()=>{
    app.listen(port)
    console.log(`Server http running in port ${port}`);
}
