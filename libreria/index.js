const mdLinks = require('./mdlinks.js');//importando mi propio archivo
const process = require('process');//objeto global informacion y control soobre el prceso actual de node.js
const pathNode = require('path');// proporciona utilidades para trabajar con ruts de archivos y módulos.

//validar si la ruta es absoluta o Relativa
export const validatePath = (stringPath) => {
  if (pathNode.isAbsolute(stringPath) === false) {
    return pathNode.resolve(stringPath);
  }
return stringPath;
};
  