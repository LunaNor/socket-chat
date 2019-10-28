const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const { crearMensaje } = require('../utilidades/utilidades');

const usuarios = new Usuarios();

/*=================================================================================================================================*/
// Escucha conexiones de los clientes
/*=================================================================================================================================*/
io.on('connection', (client) => {

    client.on('entrarChat', (data, callback) => {

        /* Validamos que venga el nombre y la sala */
        if (!data.nombre || !data.sala) {
            return callback({
                error: true,
                mensaje: 'El nombre/sala es necesario'
            });
        }

        client.join(data.sala);

        usuarios.agregarPersonas(client.id, data.nombre, data.sala); //retorna arreglo de personas conectadas al chat

        // Emite todas las personas que están conectadas a la sala especifica del chat
        client.broadcast.to(data.sala).emit('listaPersonas', usuarios.getPersonasPorSala(data.sala));

        callback(usuarios.getPersonasPorSala(data.sala));

    });

    /* Recibe un mensaje que es creado por el cliente, luego lo emito a todos los demás de la sala */
    client.on('crearMensaje', (data) => {

        let persona = usuarios.getPersona(client.id);

        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);


    });

    client.on('disconnect', () => {

        let personaBorrada = usuarios.borrarPersona(client.id); // retorna la persona borrada

        //emito a toodos los usuarios de la sala que dicho usuario se ha desconectado
        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', ` ${ personaBorrada.nombre} salió`));
        // Emite todas las personas que están conectadas a la sala especifica del chat
        client.broadcast.to(personaBorrada.sala).emit('listaPersonas', usuarios.getPersonasPorSala(personaBorrada.sala));
    });

    /* Mensajes Privados */
    client.on('mensajePrivado', data => {

        let persona = usuarios.getPersona(client.id);
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));

    });



});