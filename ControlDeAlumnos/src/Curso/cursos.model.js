'use strict'

const mongoose = require('mongoose');

const cursosSchema = mongoose.Schema({
    materia:{
        type: String,
        required: true
    },

    profesor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
},{
    versionKey: false
})


module.exports = mongoose.model('Curso', cursosSchema);
