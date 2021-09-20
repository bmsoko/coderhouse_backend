const fs = require('fs');

class Contenedor {
    objetoArray = [];
    pathToFile = String;
    objetoFormateado = {
    };
    // elementosObjetos = JSON

    constructor(pathToFile) {
        this.pathToFile = pathToFile;
    };

    async save(objeto) {
      if(this.exists()){ // Verificamos que exista el archivo primero.
        // Existe, entonces primero lo leo, para ver su contenido.
        try{
            await fs.promises.readFile(this.pathToFile, 'utf-8')
            .then(contenido => {
                // con el contenido del archivo, voy a intentar colocar el primero, o agregar si ya tiene
                this.objetoFormateado = this.formatObjeto(contenido, objeto); // Dentro
                this.objetoArray.push(this.objetoFormateado);
                console.log("Objeto array")
                console.log(this.objetoArray)
            })            
        }
        catch(err) {
            console.log(err)
        }
       // Ya lo modifique al objeto, ahora modifico el archivo
        try {
            await fs.promises.appendFile(this.pathToFile, JSON.stringify(this.objetoArray, null, 4));
            console.log('Agregue al archivo')
            return this.objetoFormateado.id;

        } catch (err){
            console.log('Se encontro un error al agregar objeto: ' + err + this.objetoFormateado);
        }
      } else { //si el archivo no existe, lo creamos.
        try{
            this.objetoFormateado = this.formatObjeto('', objeto);
            await fs.promises.writeFile(this.pathToFile, this.objetoFormateado)
            return this.objetoFormateado.id;
        }
        catch(err) {
            console.log('Error al crear un archivo desde 0 y agregarle el objeto:' + err + this.objetoFormateado)
        }

      }
        
    };

    

    async getById(pathToFile){

    };

    async getAll(pathToFile){

    };

    async deleteById(id){

        jsonFile.forEach(element => {
            if (element.id === id)
            console.log('This is the element')
            console.log(element.id)

        });

    };

    async deleteAll(pathToFile){

    };

    async exists(){
        try {
            await fs.promises.access(this.pathToFile)
            console.log('Existe el archivo: ' + this.pathToFile)
            return true
          } catch {
            return false
          }
    }

    formatObjeto(contenido, objeto){
        if(contenido.length == 0){ // Preguntamos si el archivo tiene contenido
            objeto = {
                'id': 1,
                'title': objeto.title,
                'price': objeto.price,
                'thumbnail': objeto.thumbnail
            }           
            return objeto
            
        }else { // Sino significa que ya tiene algo
            var jsonFile = JSON
            console.log('Este es el JSON')
            jsonFile = JSON.parse(contenido)
            objeto = {
                'id': jsonFile.length + 1,
                'title': objeto.title,
                'price': objeto.price,
                'thumbnail': objeto.thumbnail
            }
            return objeto

        }
    }
};
module.exports = Contenedor;


