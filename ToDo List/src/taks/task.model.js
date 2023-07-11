'use strict'

const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    name: {
        type: String,
        required: true //esto es para que sea obligatorio
    },
    description: {
        type: String,
        required: true,
        maxLength: 120
    },
    date: {
        type: Date,
        required: true
    },
    priority: {
        type: Number,
        required: true,
        min: 1,
        max: 10,
        default: 1
    }
},{
    versionKey: false //Quitar el valor __v
})

module.exports = mongoose.model('Task', taskSchema);