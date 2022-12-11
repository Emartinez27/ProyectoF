const {Schema, model} = require('mongoose');

const inventarioSchema = Schema({

    serial: {
        type: String,
        required: true,
        unique: true
    },

    modelo: {
        type: String,
        required: true
    },

    descripcion: {
        type: String,
        required: true
    },

    color: {
        type: String,
        required: true
    },

    foto: {
        type: String,
        required: true
    },

    fechaCompra: {
        type: String,
        required: true
    },

    precio: {
        type: Number,
        required:true
    },

    usuario: {  // <- este es el atributo que se usa en el path para hacer el join en el router-inventario
        type: Schema.Types.ObjectId, // se usa para relacionar por medio del id 
        ref: 'Usuario',              // se usa para hacer referencia hacia la tabla de la cual queremos el id
        required: false              // tambien es el mismo que exportamos desde el modelo
    },

    marca: {
        type: Schema.Types.ObjectId,
        ref: 'Marca',
        required: true
    },

    tipoEquipo: {
        type: Schema.Types.ObjectId,
        ref: 'TipoEquipo',
        required: true

    },

    estadoEquipo: {
        type: Schema.Types.ObjectId,
        ref: 'EstadoEquipo',
        required: true
    },

    fechaCreacion: {
        type: Date,
        required: true
    },

    fechaActualizacion: {
        type: Date,
        required: true
    },
    estado: {
        type: String,
        default: 'Activo'
    }

});

module.exports = model('Inventario', inventarioSchema);