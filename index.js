// Importando módulos de node.js
// route (Módulo que proporciona utilidades para trabajar con rutas de archivos y directorios.
// fs (Módulo que proporciona una API para interactuar con el sistema de archivos)
// fileHoudmlibrería - interfaz para buscar en el sistema de archivos
const pathNode = require('path');
const fs = require('fs');
const marked = require('marked'); // permite analizar Markdown en HTML
const fetch = require('node-fetch');
// const fileHound = require('filehound');

// Validar si la ruta existe--retorna true o false
const existsroute = ((route) => fs.existsSync(route));
existsroute('C:\\Users\\Labortoria\\Documents\\laboratoria-track-fe\\markdown-links\\LIM010-fe-md-links\\test-folder\\aaaa.md');
existsroute('Hola');

// Validar si la ruta es absoluta o Relativa y convertir
const validateConvertroute = ((route) => {
  if (!pathNode.isAbsolute(route)) {
    const newAbsolute = pathNode.resolve(route);
    return newAbsolute;
  }
  return route;
});
validateConvertroute('C:\\Users\\Labortoria\\Documents\\laboratoria-track-fe\\markdown-links\\LIM010-fe-md-links\\test-folder\\aaaa.md');
validateConvertroute('test-folder\\');

// Validar si es archivo --retorna true o false
// fs.stat objeto que proporciona información de un archivo
const validateFileroute = ((route) => fs.statSync(route).isFile());
validateFileroute('C:\\Users\\Labortoria\\Documents\\laboratoria-track-fe\\markdown-links\\LIM010-fe-md-links\\test-folder\\aaaa.md\\');

// Validar si es un directorio --retorna true o false
const validateDirectoryroute = ((route) => fs.statSync(route).isDirectory());
validateDirectoryroute('C:\\Users\\Labortoria\\Documents\\laboratoria-track-fe\\markdown-links\\LIM010-fe-md-links\\test-folder\\');

// validar si es un archivo md
const isFileMd = (route) => pathNode.extname(route);
isFileMd('C:\\Users\\Labortoria\\Documents\\laboratoria-track-fe\\markdown-links\\LIM010-fe-md-links\\test-folder\\aaaa.md');

// retornar un array de los archivos md
// fs.readdirSync lee el contenido de un directorio - síncrono
const searchPathFiles = ((route) => {
  let arrayFilesMd = [];
  const fileroute = validateConvertroute(route);
  if (validateFileroute(fileroute)) {
    if (isFileMd(fileroute) === '.md') {
      arrayFilesMd.push(fileroute);
    }
  } else {
    const filesOfDirectory = fs.readdirSync(fileroute);
    for (let i = 0; i < filesOfDirectory.length; i += 1) {
      const newFileOfDirectory = searchPathFiles(pathNode.join(fileroute, filesOfDirectory[i]));
      arrayFilesMd = arrayFilesMd.concat(newFileOfDirectory);
    }
  }
  return arrayFilesMd;
});

// Leer archivos MD
const readFileMd = ((route) => fs.readFileSync(route, 'utf8'));
// console.log(readFileMd(pathNode.join(process.cwd(), '\\test-folder\\bbbb.md')));

const searchLinks = (route) => {
  const arrayLinks = [];
  const renderer = new marked.Renderer();
  const arrayFiles = searchPathFiles(route);
  arrayFiles.forEach((fileroute) => { // forEach que recorrera el array de as rutas de archivos .md
    const files = readFileMd(fileroute); // almacenar en una constante  la funcion leer el archivo
    // buscar los link del archivo y solicitar los argumentos
    renderer.link = (hrefFile, titleFile, textFile) => {
      arrayLinks.push({ // ir añadiendo los objetos al array
        href: hrefFile, // URL encontrada
        text: textFile, // Texto que aparece en el link
        file: fileroute, // Ruta del archivo donde se encontró el link
      });
    };
    marked(files, {
      renderer,
    });
  });
  return arrayLinks;
};
// console.log(searchLinks('test-folder\\'));

// Validar si la url es válido o está rota
const linksValidate = (route) => {
  const links = searchLinks(route);
  const urlFileMd = links.map((link) => new Promise((resolve, reject) => {
    const linkobj = link;
    fetch(link.href)
      .then((result) => {
        if (result.status > 399) {
          linkobj.status = result.status;
          linkobj.statusText = 'FAIL';
        } else {
          linkobj.status = result.status;
          linkobj.statusText = 'OK';
        }
        resolve(linkobj);
      })
      .catch((error) => {
        reject(error);
      });
  }));
  return Promise.all(urlFileMd);
};
linksValidate('test-folder\\');

// Función que entrega estadísticas del archivo
const statsLinks = (route) => new Promise((resolve) => {
  const links = searchLinks(route);
  const uniqueLinks = new Set(links.map((element) => element.href));
  resolve(`total:${links.length} Unique: ${uniqueLinks.size}`);
});
statsLinks('test-folder\\').then((result) => console.log(result));
