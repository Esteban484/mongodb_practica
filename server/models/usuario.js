const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un  rol valido'
}
const uniqueValidator = require('mongoose-unique-validator');

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'Elnombre es requerido']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El email es requerido']
    },
    password: {
        type: String,
        required: [true, 'El password es requerido']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        deafult: false
    }
});

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' });

usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}
module.exports = mongoose.model('Usuario', usuarioSchema);