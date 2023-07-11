'use strict'

//archivo para creacion de tokens
const jwt = require('jsonwebtoken');

exports.createToken = async(user)=>{
    try {
        let payload = {
            sub: user._id,
            nombres: user.nombres,
            apellidos: user.apellidos,
            correo: user.correo,
            role: user.role,
            iat: Math.floor(Date.now() / 1000), //Fecha Actual en Formato UNI
            exp: Math.floor(Date.now() / 1000) + (60 * 120)
        }
        return jwt.sign(payload, `${process.env.SECRET_KEY}`)
    }catch(err) {
        console.error(err)
        return err;
    }
}