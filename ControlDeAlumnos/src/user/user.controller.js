'use strict'
const User = require('./user.model');
const Curso = require('../Curso/cursos.model');
const { validateDate, encrypt, checkPassword } = require('../utils/validate');
const { createToken } = require('../services/jwt')

exports.test = (req, res)=>{
    res.send({messege: 'Test funciona'})
};

//Profesor por default
exports.defaultProfesor = async(req, res)=>{
    try {
        let defaultProfesor = {
            nombres: 'Angel',
            apellidos: 'Chali',
            titulo: 'Ingeniero',
            correo: 'achali@kinal.edu.gt',
            password: '123',
            role: 'PROFESOR'
        }
        defaultProfesor.password = await encrypt(defaultProfesor.password)
        let existProfesor = await User.findOne({nombres: 'Angel'});
        if(existProfesor) return console.log('Profesor ya ha sido creado');
        let defProfesor = new User(defaultProfesor);
        await defProfesor.save();
        return console.log('Profesor por default creado');
    } catch (err) {
        return console.error(err);
    }
}

//Alumno por default
exports.defaultAlumno = async(req, res)=>{
    try {
        let defaultAlumno = {
            nombres: 'Fabian',
            apellidos: 'Marroquin',
            carnet: '2018482',
            grado: '6to',
            correo: 'fmarroquin@kinal.edu.gt',
            password: '123',
            role: 'ALUMNO'
        }
        defaultAlumno.password = await encrypt(defaultAlumno.password)
        let existAlumn = await User.findOne({nombres: 'Angel'});
        if(existAlumn) return console.log('Alumno ya ha sido creado');
        let defAlumn = new User(defaultAlumno);
        await defAlumn.save();
        return console.log('Alumno por default creado');
    } catch (err) {
        return console.error(err);
    }
}

//login
exports.login = async(req, res)=>{
    try {
        let data = req.body;
        let credentials = {
            correo : data.correo,
            password : data.password
        }
        let msg = validateDate(credentials);
        if(msg) return res.status(400).send(msg)
        let user = await User.findOne({correo: data.correo})
        /* if(!user || user.role != 'PROFESOR') return res.status(404).send({message: 'User not found or you dont have permission'}); */
        if(user && await checkPassword(data.password, user.password)) {
            let token = await createToken(user)
            return res.send({massage: 'User logged sucessfully', token});
        }
        return res.status(401).send({message: 'invalidad credentials',})
    } catch (err) {
        console.error(err)
    }
}

//Hacer profesores o alumnos
exports.save = async(req, res)=>{
    try{
        let data = req.body;
        let params = {
            password: data.password
        }
        let validate = validateDate(params)
        if(validate) return res.status(400).send(validate)
        data.password = await encrypt(data.password);
        let user = new User(data);
        await user.save();
        return res.send({message: 'Cuenta creada'})
    }catch(err) {
        console.error(err);
        return res.status(500).send({messgae: 'Error al crear la cuenta', err: err.message});
    }
}

//agregarse a cursos
exports.updatecurso = async(req, res)=>{
    try {
        let idUser = req.params.id;

        let data = req.body;
        let userUpdate = await User.findOneAndUpdate(
            {_id: idUser},
            {
                clase1: data.clase1,
                clase2: data.clase2,
                clase3: data.clase3
            },
            {new: true}
        )
        if(!userUpdate) return res.status(404).send({message: 'Usuario no encontrado y por ende no actualizado'});
        return res.send({message: 'Usuario actualizado', userUpdate});
    } catch (err) {
        console.error(err);
        return res.status(500).send({message: 'Erro al actualizar datos'})
    }
}

//ver cursos
exports.cursosAlumno = async(req, res)=>{
    try {
        let idUser = req.params.id;
        let user = await User.find({_id: idUser})
        if(!user) return res.send({message: 'Alumno no encontrado'});
        return res.send({message:'Usuario encontrado',user});
    } catch (err) {
        console.error(err);
    }
}

//editar alumno
exports.updateAlumno = async(req, res)=>{

    try{
        let idUser = req.params.id;
        let data = req.body;
        let token = req.user.sub
        if(idUser != token) return res.status(401).send({message: 'No tiene permiso para realizar esta acción'});
        if(data.password || Object.entries(data).length === 0 || data.role || data.title) return res.status(400).send({message: 'No se puede cambiar esta dato'});
        let updateAlumnooooo = await User.findOneAndUpdate(
            {_id: req.user.sub},
            data,
            {new: true}
        )
        if(!updateAlumnooooo) return res.status(404).send({message: 'Usuario no encontrado y por ende no eliminado'});
        return res.send({message: 'User updated', updateAlumnooooo})
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Erro actualizando la data'});
    }

    /* try {
        let idUser = req.params.id;
        let data = req.body;
        let token = req.user.sub
        if(idUser != token) return res.status(401).send({messege: 'No tiene permiso para hacer esta acción'});
        if(data.password || Object.entries(data).length === 0 || data.role) return res.status(400).send({message: 'No se puede cambiar esta dato'});
        let updateAlu = await User.findOneAndUpdate(
            {_id: req.user.sub},
            data,
            {new: true}
        )
        if(!updateAlu) return res.status(404).send({message: 'Alumno no encontrado y por ende no actualizado'})
        return res.send({message:'Cuenta editada', updateAlu})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error updatind data'});
    } */
}

//eliminar alumno
exports.deleteAlumno = async(req, res)=>{
    try {
        let idUser = req.params.id;
        if(idUser != req.user.sub) return res.status(401).send({messege: 'No tiene permiso para hacer esta acción'});
        let deleteAlumno = await User.findOneAndDelete({_id: req.user.sub});
        if(!deleteAlumno) return res.send({messege: 'Alumno no encontrado y por ende no eliminado'});
        return res.send({message: `Alumno ${deleteAlumno.nombres} eliminado`})
    } catch (err) {
        console.error(err);
    }
    
}



// PROFESOR
//ver cursos del profesor
exports.cursosProfesor = async(req,res)=>{
    try{
/*         const populates = {path:'profesor', select: 'clase1 clase2 clasqe3'} */

        let idUser = req.params.id;
        if(idUser != req.user.sub) return res.status(401).send({message: 'No tienes permiso para realizar esta acción'});
        let cursos = await Curso.find({profesor: idUser})/* .populate(populates); */
        if(!cursos) return res.status(404).send({message: 'Cursos no encontrados'});
        return res.send({message: 'Cursos encontrados' , cursos}); 
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error al obtener los cursos'});
    }
}