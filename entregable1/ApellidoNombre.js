class ApellidoNombre{
    nombre = String;
    apellido = String;
    libros = [];
    mascotas = [];

    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    };
    
    getFullName() {
        return console.log(`El nombre completo de la persona es: ${this.nombre} ${this.apellido}`)
    };

    addMascota(nombreMascota){
        this.mascotas.push(nombreMascota)
        console.log(`Se agrego mascota: ${nombreMascota}`)
    };

    countMascotas(){
        return console.log(`La cantidad de mascotas que tiene son: ${this.mascotas.length}`)
    };

    addBook(nombre, autor){
        this.libros.push({nombreLibro: nombre, autorLibro: autor})
        console.log(`Se agrego el libro ${nombre}, del autor: ${autor}`)
    };

    getBookNames(){
        console.log(`Tiene asociado los siguientes libros: `)
        this.libros.forEach(function (item) {
            console.log(item.nombreLibro)
        })
    }

};


const persona = new ApellidoNombre('Estanislao', 'Soko', [{nombreLibro: 'Harry Potter', autorLibro: 'J.K. Rowling'}], ['Balloo', 'Pascal']);

persona.getFullName();
persona.countMascotas();
persona.addMascota('Athlon');
persona.countMascotas();
persona.addBook('El Señor de los Anillos', 'J.R.R. Tolkien');
persona.getBookNames();
