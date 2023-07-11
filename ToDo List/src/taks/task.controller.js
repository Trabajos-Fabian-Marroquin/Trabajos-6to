'use strict'
const Task = require('./task.model');

exports.addTask = async (req, res) => {
    try {
        let data = req.body;

        //validar que no exista uno con el mismo nombre
        let taksExist = await Task.findOne({ name: data.name })
        if (taksExist) return res.send({ message: 'Tarea ya existente' })
        
        //validar que no se agregue una tarea con prioridad menor a 1 o mayor a 10
        if(data.priority < 1) return res.send({message:'No se puede agregar una tarea con prioridad menor a 1'})
        else if(data.priority > 10) return res.send({message:'No se puede agregar una tarea con prioridad mayor a 10'})

        let newTaks = new Task(data);
        await newTaks.save();
        return res.status(201).send({ message: 'Actividad guardada satisfactoriamente' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error en el servidor al guardar la actividad', err });
    }
}

exports.getTasks = async (req, res) => {
    try {
        let tasks = await Task.find();
        if (tasks.length == 0) return res.status(404).send({ message: ' No hay actividades aún :(' })
        return res.send({ tasks });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error al obtener las actividades' });
    }
}

exports.updateTask = async (req, res) => {
    try {
        let task = req.params.id;
        let data = req.body;
        let updatedTask = await Task.findOneAndUpdate(
            { _id: task },
            data,
            { new: true }
        )
        if (!updatedTask) return res.send({ message: 'Task not found and not updated' })
        return res.send({ message: 'Task updated: ', updatedTask })
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error al querer actualizar' });
    }
}

exports.deleteTask = async (req, res) => {
    try {
        let idTask = req.params.id;
        let deletedTask = await Task.findOneAndDelete({ _id: idTask });
        if (!deletedTask) return res.status(404).send({ message: 'Error removing task' });
        return res.send({ message: 'Task deleted sucessfully', deletedTask });
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error removing product' })
    }
}

/* Fabian Angel Samuel Marroquin Chali */
