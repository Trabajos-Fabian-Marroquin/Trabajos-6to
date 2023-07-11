'use strict'

const Curso = require('./cursos.model');
const User = require('../user/user.model');
const { validate } = require('../user/user.model');

exports.test = (req, res)=>{
    res.send({message: 'Test esta funcionando'});
}

exports.defaultCurso = async(req, res)=>{
    try {
        let defaultCurso = {
            materia: 'Clase Guia',
        }
        let existCurso = await Curso.findOne({materia: 'Clase Guia'});
        if(existCurso) return console.log('Clase Guia ya ha sido creado');
        let defCurso = new Curso(defaultCurso);
        await defCurso.save();
        return console.log('Clase Guia ha sido creada');
    } catch (err) {
        return console.error(err);
    }
}

exports.savecurso = async(req, res)=>{
    try {
        let data = req.body;
        let user = await User.findOne({_id: data.profesor})
        if(!user || user.role != "PROFESOR") return res.status(400).send({message: 'Su usuaro no tiene persimo para realizar esta acción'});
        let curso = new Curso(data);
        await curso.save()
        return res.send({message: 'se guardo la materia'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error al guardar curso', error: err.error})
    }

}

exports.updateCurso = async(req, res)=>{
    try {
        let idCurso = req.params.id;
        let data = req.body;
        let token = req.user.sub;

        let idProf = await Curso.findOne({_id: idCurso});
        if(!idProf) return res.send({message: 'Curso no encontrado'})
        if(idProf.profesor != token) return res.status(401).send({message: 'No tienes permiso para esta acción'})
        let cursoUpdate = await Curso.findOneAndUpdate(
            {_id: idCurso},
            data,
            {new: true}
        )
        if(!cursoUpdate) return res.send({message: 'Curson no encontraod'});
        return res.send({message: 'Clase encontrada', cursoUpdate});
    } catch (err) {
        console.error(err)
    }
}

exports.deleteCurso = async(req, res)=>{
    try {
        let idCurso = req.params.id;
        let cursoDefault = await Curso.findOne({materia: 'Clase Guia'});
        let idProf = await Curso.findOne({_id: idCurso});
        let token = req.user.sub;

        if(!idProf) return res.send({message: 'Curso no encontrado'});
        if(idProf.profesor != token) return res.status(401).send({message: 'No tienes permiso para esta acción'});
        let alums = await User.find({role: 'ALUMNO'});


        for(let user of alums){
            if(user.clase1 == idCurso){
                user.clase1 = cursoDefault._id;
                await User.findByIdAndUpdate(
                    {_id: user._id},
                    {clase1: user.clase1}
                )
            }

            if(user.clase2 == idCurso){
                user.clase2 = cursoDefault._id;
                await User.findByIdAndUpdate(
                    {_id: user._id},
                    {clase2: user.clase2}
                )
            }

            if(user.clase3 == idCurso){
                user.clase3 = cursoDefault._id;
                await User.findByIdAndUpdate(
                    {_id: user._id},
                    {clase3: user.clase3}
                )
            }

        }
        let cursoElim = await Curso.findOneAndDelete({_id: idCurso});
        if(!cursoElim) return res.send({message: 'Curso no encontrado y por ende no eliminado'});
        return res.send({message: 'Curso eliminado'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Erro al eliminar'});
    }

}