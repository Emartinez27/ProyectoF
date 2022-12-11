const { Router } = require('express');
const Marca = require('../models/Marca');
const { validationResult, check } = require('express-validator');
const { validarJWT } = require('../middleware/validar-jwt');
const { validarRolAdmin } = require('../middleware/validar-rol-admin');


const router  = Router();

router.post('/',validarJWT,validarRolAdmin,
    [
        check('nombre', 'nombre.requerido').not().isEmpty(),
        check('estado', 'estado.requerido').isIn(['Activo', 'Inactivo']),
        validarJWT,
        validarRolAdmin
    ],
    async function(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ messages: errors.array() });
            }

            let marca = new Marca();
            marca.nombre = req.body.nombre;
            marca.estado = req.body.estado;
            marca.fechaCreacion = new Date();
            marca.fechaActualizacion = new Date();
            
            marca = await marca.save();

            res.send(marca);
        } catch(error) {
            console.log(error);
            res.send('Ocurrio un error');
        }
});

router.get('/', [ validarJWT ], async function(req, res) {
    try {
        const marcas = await Marca.find();
        res.send(marcas);
    } catch(error) {
        console.log(error);
        res.send('Ocurrio un error');
    }
});

router.get('/:marcaId', async function(req, res){
    try {
        const getMarca = await Marca.findOne({_id:req.params.marcaId})
        if(getMarca){
            res.status(200).json({code: 'marca encontrada', marca:getMarca})
        }
        else{
            res.status(401).json({code: 'marca no encontrada'})
        }

    } catch (error) {
        console.log(error)
        res.status(500).send('Ocurrio un error');
    }
});

router.patch('/:marcaId',
[
    check('nombre', 'nombre.requerido').not().isEmpty(),
    check('estado', 'estado.requerido').isIn(['Activo', 'Inactivo']),
],
async function(req, res){
    
    try {
        let marca = await Marca.findById(req.params.marcaId);
        
        if (!marca) {
            return res.status(400).send('La marca no existe');
        }

        await Marca.findByIdAndUpdate(req.params.marcaId,{
            nombre: req.body.nombre,
            estado: req.body.estado,
            fechaActualizacion: new Date()
        })
    
        res.json({code: 'marca actualizada'})

        
    } catch (error) {
        console.log(error)
        res.status(500).send('Ocurrio un error');
    }

});

router.delete('/:marcaId/delete', 
[
    check('nombre', 'nombre.requerido').not().isEmpty(),
    check('estado', 'estado.requerido').isIn(['Activo', 'Inactivo']),
],
async(req, res)=>{
    let getmarca = await Marca.findOne({_id: req.params.marcaId})
    if(getmarca){
        await Marca.findByIdAndRemove(req.params.marcaId)
        res.status(200).json({code: 'marca eliminada'})
    }
})

module.exports = router