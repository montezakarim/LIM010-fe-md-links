#!/usr/bin/env node
const mdLinks = require('./md-links.js');
const process = require('process');
const pathNode = require('path');
const chalk = require('chalk');


let path = process.argv[2]
 // path.resolve para convertir en absoluta  
path = pathNode.resolve(path);
 // path.normalize para normalizar el path en caso se que hayan errores de semántica
path = pathNode.normalize(path);