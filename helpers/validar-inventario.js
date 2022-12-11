const validarInventario = (req) => {

    const validacion = [];

    if (!req.body.serial) {
        validacion.push('Serial requerido')
    }

    if (!req.body.modelo) {
        validacion.push('Modelo requerido')
    }

    if (!req.body.descripcion) {
        validacion.push('la Descripcion es requerida')
    }

    if (!req.body.foto) {
        validacion.push('La foto es requerida')
    }

    if (!req.body.color) {
        validacion.push('Color requerido')
    }

    if (!req.body.fechaCompra) {
        validacion.push('Fecha compra es requerida')
    }

    if (!req.body.precio) {
        validacion.push('Precio requerido')
    }

    if (!req.body.usuario) {
        validacion.push('Usuario requerido')
    }

    if (!req.body.marca) {
        validacion.push('Marca requerida')
    }

    if (!req.body.tipoEquipo) {
        validacion.push('Tipo de equipo requerido')
    }

    if (!req.body.estadoEquipo) {
        validacion.push('Estado de equipo requerido')
    }


    return validacion;

}






module.exports = { validarInventario };