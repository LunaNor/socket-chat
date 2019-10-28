class Usuarios {

    constructor() {

        // arreglo de personas que estara conectada al chat
        this.personas = [];


    }

    /* Método que permitira agregar a una persona al chat y retorna todas las personas que se han conectado al chat*/
    agregarPersonas(id, nombre, sala) {

        let persona = { id, nombre, sala };

        this.personas.push(persona);

        return this.personas;

    }

    /* Retorna una persona del arreglo de personas del chat */
    getPersona(id) {

        let persona = this.personas.filter(persona => persona.id === id)[0];

        return persona;

    }

    /* Retorna todas las personas del chat */
    getPersonas() {
        return this.personas;
    }

    getPersonasPorSala(sala) {

        let personasEnSala = this.personas.filter(persona => persona.sala === sala);
        return personasEnSala;

    }

    borrarPersona(id) {

        let personaBorrada = this.getPersona(id);

        //devuelve a las personas cuyo id sea distinto al pasado por parametro, simplemente es una condicion del metodo filter
        this.personas = this.personas.filter(persona => persona.id != id);

        return personaBorrada;

    }



}

module.exports = {

    Usuarios

}