const express = require('express');
const bcrypt = require('bcrypt');
const app = express();
const _ = require('underscore');
//Importar el Schema de usuario
const Usuario = require('../models/usuario');
//Consultar datos //
app.get('/usuario', (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde)

    let limite = req.query.limite || 5;
    limite = Number(limite)

    Usuario.find({})
        .skip(5)
        .limit(5)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.count({}, (err, conteo) => {
                res.json({
                    ok: true,
                    registros: conteo,
                    usuarios
                });

            });


        })
});
/*crear nuevos registros */
app.post('/usuario', (req, res) => {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        tole: body.roles
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        usuarioDB.password = null;
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});
/*actualizar registros */
app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    //delete body.password;
    //delete body.google;

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        })
    });


});

/*Eliminar registros (cambiar a inactivo) */
app.delete('/usuario', (req, res) => {
    res.json('delete Usuario');
});

module.exports = app;