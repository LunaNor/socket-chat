var socket = io();

/*=================================================================================================================================*/
// Extracción de parametros del URL (nombre)
/*=================================================================================================================================*/
var params = new URLSearchParams(window.location.search);
if (!params.has('nombre') || !params.has('sala')) {

    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios')

}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};

/*=================================================================================================================================*/
// Escucha conexión con el servidor
/*=================================================================================================================================*/
socket.on('connect', function() {

    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function(resp) {

        console.log('Usuarios conectados', resp);

    });
});

/*=================================================================================================================================*/
// Escucha desconexión con el servidor
/*=================================================================================================================================*/
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
/* socket.emit('crearMensajeMensaje', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, function(resp) {
    console.log('respuesta server: ', resp);
});
 */
/*=================================================================================================================================*/
// Escucha el mensaje que emite el servidor a todos los usuarios cuando se desconecta uno
/*=================================================================================================================================*/
socket.on('crearMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});

/*=================================================================================================================================*/
// Escucha cambios de usuarios, cuando un usuario entra o sale del chat
/*=================================================================================================================================*/
socket.on('listaPersonas', function(personas) {

    console.log(personas);

});

/*=================================================================================================================================*/
// Mensajes Privados
/*=================================================================================================================================*/
socket.on('mensajePrivado', function(mensaje) {

    console.log('Mensaje Privado: ', mensaje);

});