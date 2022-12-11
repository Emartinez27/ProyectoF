const { Router } = require('express');
const EstadoEquipo = require('../models/EstadoEquipo');
const { validarEstadoEquipo } = require('../helpers/validar-estadoEquipo');
const { validationResult, check } = require('express-validator');
const { validarJWT } = require('../middleware/validar-jwt');
const { validarRolAdmin } = require('../middleware/validar-rol-admin');


const router = Router();

router.post('/',
    [
        check('nombre', 'nombre.requerido').not().isEmpty(),
        check('estado', 'estado.requerido').isIn(['Activo', 'Inactivo']),
        validarJWT,
        validarRolAdmin
    ],
    async function (req, res) {

        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ messages: errors.array() });
            }

            let estadoEquipo = new EstadoEquipo();
            estadoEquipo.nombre = req.body.nombre;
            estadoEquipo.estado = req.body.estado;
            estadoEquipo.fechaCreacion = new Date();
            estadoEquipo.fechaActualizacion = new Date();
            estadoEquipo = await estadoEquipo.save();
            res.send(estadoEquipo);
        } catch (error) {
            console.log(error);
            res.status(500).send('Ocurrió un error');
        }
    });

router.get('/', [validarJWT], async function (req, res) {

    try {
        const tipos = await EstadoEquipo.find();
        res.send(tipos);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrió un error');
    }
});

router.put('/:estadoEquipoId',
    [
        check('nombre', 'nombre.requerido').not().isEmpty(),
        check('estado', 'estado.requerido').isIn(['Activo', 'Inactivo']),
    ],
    async function (req, res) {
        try {
            let estadoEquipo = await EstadoEquipo.findById(req.params.estadoEquipoId);
            if (!estadoEquipo) {
                return res.send('No existado estado');
            }

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ messages: errors.array() });
            }

            estadoEquipo.nombre = req.body.nombre;
            estadoEquipo.estado = req.body.estado;
            estadoEquipo.fechaActualizacion = new Date();

            estadoEquipo = await estadoEquipo.save();

            res.send(estadoEquipo);
        } catch (error) {
            console.log(error);
            res.status(500).send('Ocurrió un error');
        }
    });

router.patch('/:estadoEquipoId',
    [
        check('nombre', 'nombre.requerido').not().isEmpty(),
        check('estado', 'estado.requerido').isIn(['Activo', 'Inactivo']),
    ],
    async function (req, res) {
        try {
            let estadoEquipo = await EstadoEquipo.findById(req.params.estadoEquipoId);

            if (!estadoEquipo) {
                return res.status(400).send('El estado no existe');
            }

            await EstadoEquipo.findByIdAndUpdate(req.params.estadoEquipoId, {
                nombre: req.body.nombre,
                estado: req.body.estado,
                fechaActualizacion: new Date()
            }).then(estado => {
                res.status(200).json({ code: 'estado actualizado', estadoEquipo: estado })
            }).catch(err => console.log(err))


        } catch (error) {
            console.log(error)
            res.status(500).send('Ocurrio un error');
        }
    });

router.delete('/:estadoEquipoId/delete', 
[
    check('nombre', 'nombre.requerido').not().isEmpty(),
    check('estado', 'estado.requerido').isIn(['Activo', 'Inactivo']),
],
async (req, res) => {
    let getEstadoEquipo = await EstadoEquipo.findOne({ _id: req.params.estadoEquipoId })
    if (getEstadoEquipo) {
        await EstadoEquipo.findByIdAndRemove(req.params.estadoEquipoId)
        res.status(200).json({ code: 'Tipo de equipo eliminada' })
    } else {
        res.status(401).json({ code: 'El tipo de equipo no existe' })
    }
})

module.exports = router