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
        if (this.exists()) { // Verificamos que exista el archivo primero.
            // Existe, entonces primero lo leo, para ver su contenido.
            try {
                await fs.promises.readFile(this.pathToFile, 'utf-8')
                    .then(contenido => {
                        // Saco el contenido existente del archivo y lo agrego a un array si es que tiene algun elemento
                        if (contenido != 0) {
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
            catch (err) {
                console.log(err)
            }
            // Ya lo modifique al objeto, ahora modifico el archivo
            try {
                await fs.promises.writeFile(this.pathToFile, JSON.stringify(this.objetoArray, null, 4));
                console.log('Agregue al archivo el id: ' + this.objetoFormateado.id)
                return this.objetoFormateado.id;

            } catch (err) {
                console.log('Se encontro un error al agregar objeto: ' + err + this.objetoFormateado);
            }
        } else { //si el archivo no existe, lo creamos.
            try {
                this.objetoFormateado = this.formatObjeto('', objeto);
                await fs.promises.writeFile(this.pathToFile, this.objetoFormateado)
                return this.objetoFormateado.id;
            }
            catch (err) {
                console.log('Error al crear un archivo desde 0 y agregarle el objeto:' + err + this.objetoFormateado)
            }

        }

    };


    async getById(numero) {
        try {
            const readJSON = JSON.parse(await fs.promises.readFile(this.pathToFile, "utf-8"));
            const objId = readJSON.find(({ id }) => id == numero);
            if (!objId) return null;
            return objId;
        }
        catch (err) {
            console.log(err)
        }

    };


    async getAllJSON() {
        try {
            const contenido = await fs.promises.readFile(this.pathToFile, 'utf-8');
            const listadoProductos = JSON.parse(contenido)

            return listadoProductos

        }
        catch (err) {
            console.log(err)
        }
    };
    async getAllArray() {
        // consigna dice devolver en formato de array.
        let jsonIntermidiateFile = JSON;
        let arrayElements = []
        try {
            await fs.promises.readFile(this.pathToFile, 'utf-8')
                .then(contenido => {
                    if (contenido.length != 0) {
                        jsonIntermidiateFile = JSON.parse(contenido)
                        jsonIntermidiateFile.forEach(element => {
                            arrayElements.push(JSON.stringify(element))
                        });
                        console.log(`Se creo el array: ${arrayElements}`)
                        console.log(typeof JSON.parse([arrayElements]))
                        return arrayElements
                    }
                })
        }
        catch (err) {
            console.log(err)
        }
    };


    async deleteById(id) {
        let jsonIntermidiateFile = JSON;
        let arrayIntermediate = [];
        try {
            await fs.promises.readFile(this.pathToFile, 'utf-8')
                .then(contenido => {
                    if (contenido != 0) {
                        jsonIntermidiateFile = JSON.parse(contenido)
                        jsonIntermidiateFile.forEach(element => {
                            if (element.id != id) {
                                arrayIntermediate.push(element)
                            }
                        });
                    }
                })
        }
        catch (err) {
            console.log(err)
            return null
        }

        // Ya lo encontre al objeto a eliminar, ahora modifico el archivo
        try {
            await fs.promises.writeFile(this.pathToFile, JSON.stringify(arrayIntermediate, null, 4));
            console.log(`Borre del archivo el id: ${id}`);
            // return id              

        } catch (err) {
            console.log('Se encontro un error al agregar objeto: ' + err + this.objetoFormateado);
        }
    };

    async deleteAll() {
        // De acuero a la consigna, dice eliminar todos los elementos presentes en el archivo, pero no dice eliminar el archivo.
        let arrayIntermediate = []
        try {
            await fs.promises.writeFile(this.pathToFile, JSON.stringify(arrayIntermediate, null, 4));
            console.log(`Borre todos los elements del archivo el id: ${this.pathToFile}`);

        } catch (err) {
            console.log('Se encontro un error al agregar objeto: ' + err);
        }

    };

    async updateById(id, element) {
        // obtenemos la lista entera de elementos
        const list = await this.getAllJSON();

        // buscamos el elemento por id a actualizar y tambien indice en la lista
        const elementSaved = list.find((item) => item.id === parseInt(id));
        const indexElementSaved = list.findIndex((item) => item.id === parseInt(id));

        // checkeamos que existe el elemento, sino exite devolvemos null y mostramos error
        if (!elementSaved) {
            console.error(`Elemento con el id: '${id}' no fue encontrado`);
            return null;
        }

        // armamos el elemento actualizado con lo guardado y lo nuevo
        // ... spread operator
        const elementUpdated = {
            ...elementSaved, // copio todos los atributo de elementSaved en elementUpdated
            ...element // copio y piso todos los atributo de element en elementUpdated
        };
        console.log("elementUpdated")
        console.log(elementUpdated)
        console.log("elementSaved")
        console.log(elementSaved)
        console.log("element")
        console.log(element)


        // ponemos el elemento nuevo en la lista 
        list[indexElementSaved] = elementUpdated;
        console.log('list[indexElementSaved]')
        console.log(list[indexElementSaved])

        // guardamos la lista
        const elementsString = JSON.stringify(list, null, 4);
        await fs.promises.writeFile(`./${this.pathToFile}`, elementsString);

        // retornamos el elemento actualizado
        return elementUpdated;
    };

    async exists() {
        try {
            await fs.promises.access(this.pathToFile)
            return true
        } catch {
            return false
        }
    }

    formatObjeto(contenido, objeto) {
        if (contenido.length == 0) { // Preguntamos si el archivo tiene contenido
            objeto = {
                'id': 1,
                'title': objeto.title,
                'price': objeto.price,
                'thumbnail': objeto.thumbnail
            }
            return objeto

        } else { // Sino significa que ya tiene algo 
            var jsonFile = JSON
            jsonFile = JSON.parse(contenido)
            objeto = {
                // y en base a la cantidad de elementos sumamos 1
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


