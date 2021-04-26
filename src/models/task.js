const mongoose = require('mongoose');
/**
 * este documento nos ayuda a crear un esquema a la hora
 * de evaluar el formato en el que llegaran los datos
 * a la base de datos
 */

const Schema = mongoose.Schema;

const taskSchema = new Schema(
    {
        title: String,
        description: String,
        status: {
            type: Boolean,
            default: false
        }
    }
);

module.exports = mongoose.model( 'task', taskSchema );