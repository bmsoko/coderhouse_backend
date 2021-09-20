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
      let jsonIntermidiateFile;
      if(this.exists()){ // Verificamos que exista el archivo primero.
        // Existe, entonces primero lo leo, para ver su contenido.
        try{
            await fs.promises.readFile(this.pathToFile, 'utf-8')
            .then(contenido => {
                if (contenido != 0){ 
                jsonIntermidiateFile = JSON.parse(contenido)
                jsonIntermidiateFile.forEach(element => {
                this.objetoArray.push(element)
                });
                }
                // con el contenido del archivo, voy a intentar colocar el primero, o agregar si ya tiene
                this.objetoFormateado = this.formatObjeto(contenido, objeto); // Dentro
                this.objetoArray.push(this.objetoFormateado);
            })            
        }
        catch(err) {
            console.log(err)
        }
       // Ya lo modifique al objeto, ahora modifico el archivo
        try {
            await fs.promises.writeFile(this.pathToFile, JSON.stringify(this.objetoArray, null, 4));
            console.log('Agregue al archivo el id: ' + this.objetoFormateado.id)
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

    

    async getById(id){
    let found = false;
    var jsonIntermidiateFile = JSON;
        try{
            await fs.promises.readFile(this.pathToFile, 'utf-8')
            .then(contenido => {
                if (contenido.length != 0){ 
                jsonIntermidiateFile = JSON.parse(contenido)
                jsonIntermidiateFile.forEach(element => {

                    if (element.id == id){
                        console.log(`Se encontro element con id ${id} el objeto encontrado es ${JSON.stringify(element)}`)
                        found = true;
                        return element;
                    }
                });
                }
                if (!found){
                    console.log(`El objeto es ${null}, no se encontro elemento con ese id`)
                    return null;
                }
            })            
        }
        catch(err) {
            console.log(err)
        }

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


