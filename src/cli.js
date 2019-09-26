#!/usr/bin/env node

// const [,, ...args] = process.argv;
// console.log(`Hola Mundo ${args}`);

const mdLinks = require('./mdLinks.js');

const path = process.argv[2];

const options = {
  stats: false,
  validate: false,
};

process.argv.forEach((element) => {
  if (element === '--stats' || element === '--s' || element === 's') {
    options.stats = true;
  }
  if (element === '--validate' || element === '--v' || element === 'v') {
    options.validate = true;
  }
});

// const cliMdLinks =

mdLinks.mdLinks(path, options).then((links) => {
  if (links.length === 0) {
    console.log('La ruta ingresada no contiene Links');
  } else if (options.validate && options.stats) {
    mdLinks.statsValidateOptions(path).then((result) => console.log(result));
  } else if (options.validate) {
    mdLinks.validateOptions(path).then((result) => console.log(result));
  } else if (options.stats) {
    mdLinks.statsOptions(path).then((result) => console.log(result));
  } else {
    const stringLinks = links.map((link) => `${link.file}  ${link.href}  ${link.text}`);
    return console.log(stringLinks.join('\n '));
  }
}).catch((err) => {
  console.log(err.message);
});
