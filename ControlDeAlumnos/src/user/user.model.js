'use strict'

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    nombres:{
        type: String,
        required: true
    },

    apellidos: {
        type: String,
        required: true
    },

    carnet:{
        type: String,
    },

    grado:{
        type: String
    },

    titulo:{
        type: String,
    },

    correo: {
        type: String,
        required: true,
        unique: true
    },

    password:{
        type: String,
        required: true
    },

    clase1:{
        type: String
    },

    clase2:{
        type: String
    },

    clase3:{
        type: String
    },

    role:{
        type: String,
        uppercase: true
    }
},
{
    versionKey: false
}
);

module.exports = mongoose.model('User', userSchema);