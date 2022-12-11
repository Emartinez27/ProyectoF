const { Router } = require('express');
const { validationResult, check } = require('express-validator');
const Usuario = require('../models/Usuario');
const bycript = require('bcryptjs');// para incriptar la contraseña
const { validarJWT } = require( '../middleware/validar-jwt');//validar los token de los usuarios creados
const { validarRolAdmin } = require( '../middleware/validar-rol-admin');//validar si el usuario tiene rol de administrador
const { validarCreacionUsuario, validarUsuario } = require('../helpers/validacion-usuario');

const router = Router();

router.get('/',  validarJWT, 


async function (req, res) {
    // console.log('get users')
    const usuarios = await Usuario.find()
        .then(users => {
            if(users){
                res.status(200).json({code:'find user', usuarios:users})
            }else{
                res.status(401).json({code:'no find user'});
            }
        })
        .catch(err => {
            console.log(err)
        })
});


router.post('/', validarJWT, validarRolAdmin, 
[ 
    check('nombre', 'nombre.requerido').not().isEmpty(),
    check('email', 'email.requerido').isEmail(),
    check('estado', 'estado.requerido').isIn(['Activo', 'Inactivo']),
    check('contrasena', 'contrasena.requerido').not().isEmpty(),
    check('rol', 'rol.requerido').isIn(['Administrador', 'Docente']),
    
],
async function (req, res) {

    try {
        const validar = validarUsuario(req);
        if (validar.length > 0) {
            return res.status(400).json({
                codigo: "letra mínima 0",
                resp: validar
            });
        }
        const existeUsuario = await Usuario.findOne({ email: req.body.email });

        if (existeUsuario) {
            return res.status(400).json({ mensaje: "Emai existe" }) ;
            }

        let usuario = new Usuario();
            usuario.nombre = req.body.nombre,
            usuario.email = req.body.email,
            usuario.estado = req.body.estado,
            usuario.rol = req.body.rol;
            
            const salt = bycript.genSaltSync();
            const contrasena = bycript.hashSync(req.body.contrasena, salt);
            usuario.contrasena = contrasena;

            usuario.fechaCreacion = new Date(),
            usuario.fechaActualizacion = new Date(),
        

        usuario = await usuario.save() //Guardando usuario en Base de Datos

 //       res.status(200).json({
 //           codigo: "Usuario guardado",
   //         resp: "El usuario ha sido creado satisfactoriamente",
     //       usuario: newUsuario

            res.send(usuario);
  //      }); // para mostrarlo como respuesta 

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un Error');
    }


});




router.get('/:usuarioId', [ validarJWT, validarRolAdmin ], async function (req, res) {
    try {
        const usuario = await Usuario.findById(req.params.usuarioId);
        if(usuario){
            return res.status(200).json({
                code: 'Usuario encontrado',
                usuario: usuario
            })
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({code:'Ocurrio un error'});
    }
});



router.patch('/:usuarioId/put', 
[
    check('nombre', 'nombre.requerido').not().isEmpty(),
    check('email', 'email.requerido').isEmail(),
    check('estado', 'estado.requerido').isIn(['Activo', 'Inactivo']),
    check('contrasena', 'contrasena.requerido').not().isEmpty(),
    check('rol', 'rol.requerido').isIn(['Administrador', 'Docente'])

],
async function (req, res) {
    try {

        let usuario = await Usuario.findById(req.params.usuarioId); // se obtiene el usuario por medio del id

        if (!usuario) {
            return res.status(401).send('El Ususario no existe');
        }else{
            //console.log(req.body)
            await Usuario.findByIdAndUpdate(req.params.usuarioId, {
                nombre: req.body.nombre,
                email: req.body.email,
                estado: req.body.estado,
                fechaActualizacion: new Date()
            })
                .then(
                    res.status(200).json({code: 'usuario actualizado'})
                )
                .catch(err => console.log(err))
        }

        //usuario = await usuario.save(); // lo guarda en la base de datos

    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un Error');
    }
});

router.delete('/:usuarioId/delete', 
[
    check('nombre', 'nombre.requerido').not().isEmpty(),
    check('email', 'email.requerido').isEmail(),
    check('estado', 'estado.requerido').isIn(['Activo', 'Inactivo']),
    check('contrasena', 'contrasena.requerido').not().isEmpty(),
    check('rol', 'rol.requerido').isIn(['Administrador', 'Docente'])

],
async function (req, res) {
    try {
        let usuario = await Usuario.findById(req.params.usuarioId)
        if (usuario) {
            await Usuario.findByIdAndDelete(req.params.usuarioId)
            return res.status(200).json({
                codigo: "Usuario eliminado",
                resp: "El usuario fue eliminado satisfactoriamente"
            })

        }
        else {
            return res.status(200).json({
                codigo: "Usuario no existe",
                resp: "El usuario que intenta eliminar no está registrado"
            })
        }
    }
    catch (error) {
        console.log(error)
    }
})

module.exports = router