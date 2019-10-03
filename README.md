# Markdown Links

## Preámbulo

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado que facilita la aplicación de formato a un texto, empleando una serie de caracteres de una forma especial. En principio, fue pensado para elaborar textos cuyo destino iba a ser la web cn más rapidez y sencillez que si estuviésemos empleando directamente HTML. Y si bien ese suele ser el mejor uso que podemos darle, también podemos emplearlo para cualquier tipo de texto, independientemente de cual vaya ser su destino. Es muy popular entre developers. Es usado en muchísimas plataformas que manejan texto plano (GitHub, foros, blogs, ...), y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

`md-links` es una herramienta que se crea con la finalidad de leer y analizar archivos en formato `Markdown`, para verificar los _links_ que contiene y reportar estadísticas. 
Esta librería se ha implentado usando [Node.js](https://nodejs.org/).

![md-links](https://github.com/montezakarim/LIM010-fe-md-links/blob/master/md/markdown.png?raw=true)

## Objetivos

El objetivo de este proyecto es aprender a crear nuestra propia **librería** (o biblioteca - _library_) en JavaScript.

## Objetivos de aprendizaje
Los objetivos de aprendizaje a reforzar son: 

### Javascript
- Uso de callbacks
- Consumo de Promesas

### Node
- Sistema de archivos
- package.json
- crear modules
- Instalar y usar modules
- npm scripts
- CLI (Command Line Interface - Interfaz de Línea de Comando)

### Testing
- Testeo de tus funciones
- Testeo asíncrono
- Testeo para multiples Sistemas Operativos

## Diagrama de Flujo

![Diagrama de Flujo mdLinks](https://github.com/montezakarim/LIM010-fe-md-links/blob/master/md/mdLinks-diagrama.jpg?raw=true)

## Consideraciones generales

- La librería está implementada en JavaScript para ser ejecutada con
Node.js. 
- El módulo es instalable desde `npm install montezakarim/md-links`. 
- Los tests unitarios: [Jest](https://jestjs.io/) para tus pruebas unitarias.

## Instalación
 `npm install montezakarim/md-links`

## Modo de uso

#### `mdLinks(path, options)`

##### Argumentos

- `path`: Ruta absoluta o relativa al archivo o directorio. Si la ruta pasada es
  relativa, se resuelve como relativa al directorio desde donde se invoca
  node - _current working directory_).
- `options`: Un objeto con las siguientes propiedades:
  * `validate`: Booleano que determina si se desea validar los links
    encontrados.

#### Ejemplo

```js
const mdLinks = require("md-links");

mdLinks("./some/example.md")
  .then(links => {
    // => [{ href, text, file }]
  })
  .catch(console.error);

mdLinks("./some/example.md", { validate: true })
  .then(links => {
    // => [{ href, text, file, status, ok }]
  })
  .catch(console.error);

mdLinks("./some/dir")
  .then(links => {
    // => [{ href, text, file }]
  })
  .catch(console.error);
```

### CLI (Command Line Interface - Interfaz de Línea de Comando)

El ejecutable de nuestra aplicación se ejecuta de la siguiente
manera a través de la terminal:

`md-links <path-to-file> [options]`


![ruta es un directorio](https://github.com/montezakarim/LIM010-fe-md-links/blob/master/md/directorio.JPG?raw=true)


#### Options

##### `--validate`

Si pasamos la opción `--validate`, el módulo debe hacer una petición HTTP para
averiguar si el link funciona o no. Si el link resulta en una redirección a una
URL que responde ok, entonces consideraremos el link como ok.

![validate](https://github.com/montezakarim/LIM010-fe-md-links/blob/master/md/validate.JPG?raw=true)

##### `--stats`

Si pasamos la opción `--stats` el output (salida) será un texto con estadísticas
básicas sobre los links.

![stats](https://github.com/montezakarim/LIM010-fe-md-links/blob/master/md/stats.JPG?raw=true)

También podemos combinar `--stats` y `--validate` para obtener estadísticas que
necesiten de los resultados de la validación.

![validate stats](https://github.com/montezakarim/LIM010-fe-md-links/blob/master/md/validate-stats.JPG?raw=true)

Vista `si no hay ruta` y ` ruta invalida` 

![no paths](https://github.com/montezakarim/LIM010-fe-md-links/blob/master/md/no-path-1.JPG?raw=true)

![no paths](https://github.com/montezakarim/LIM010-fe-md-links/blob/master/md/no-path.JPG?raw=true)

