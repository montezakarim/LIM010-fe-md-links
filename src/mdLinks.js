const index = require('./index.js');

const mdLinks = (path, options) => new Promise((resolve) => {
  const absolutePath = index.validateConvertPath(path);
  if (options.validate === true) {
    resolve(index.linksValidate(absolutePath));
  } else if (options.validate === false) {
    resolve(index.searchLinks(absolutePath));
  } else {
    resolve(index.searchPathFiles(absolutePath));
  }
});
// mdLinks('test-folder\\', { validate: true }).then((response) => console.log(response));
// mdLinks('test-folder\\', { validate: false }).then((response) => console.log(response));
// mdLinks('test-folder\\', { validate: 'dir' }).then((result) => console.log(result));


module.exports = {
  mdLinks,
};
