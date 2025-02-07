const colors = require('colors');
const mdLinks = require('./forMdLinks.js');

const cliMdLinks = (path, options) => new Promise((resolve, reject) => {
  mdLinks.mdLinks(path, options).then((links) => {
    if (links.length === 0) {
      resolve(colors.red('La ruta ingresada no contiene Links'));
    } else if (options.validate && options.stats) {
      resolve(mdLinks.statsValidateOptions(path));
    } else if (options.validate) {
      resolve(mdLinks.validateOptions(path));
    } else if (options.stats) {
      resolve(mdLinks.statsOptions(path));
    } else {
      const stringLinks = links.map((link) => `${link.file} ${link.href} ${link.text}`);
      resolve(colors.blue(stringLinks.join('\n')));
    }
  }).catch((err) => {
    reject(err);
  });
});

module.exports = {
  cliMdLinks,
};
