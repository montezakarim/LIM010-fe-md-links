import {
  existsPath, validateConvertPath, validateFilePath, validateDirectoryPath,
  searchPathFiles, isFileMd, readFileMd, searchLinks, linksValidate, mdLinks,
  validateOptions, statsOptions, statsValidateOptions,
} from '../src/forMdLinks.js';

import { cliMdLinks } from '../src/mdLinks.js';

const pathNode = require('path');

const relativePath = 'test-folder\\';
const absolutePath = '\\test-folder\\aaaa.md';
const noPath = 'hola';
const directoryPath = '\\test-folder\\';
const arrayLinks = [{
  href: 'https://es.wikipedia.org/wiki/Markdown',
  text: 'Markdown',
  file: pathNode.join(process.cwd(), '\\test-folder\\aaaa.md'),
},
{
  href: 'https://nodejs.org/api/x',
  text: 'node.js',
  file: pathNode.join(process.cwd(), '\\test-folder\\aaaa.md'),
},
{
  href: 'https://es.wikipedia.org/wiki/Markdown',
  text: 'Markdown',
  file: pathNode.join(process.cwd(), '\\test-folder\\bbbb.md'),
},
{
  href: 'https://es.wikipedia.org/wiki/Markdown',
  text: 'Markdown',
  file: pathNode.join(process.cwd(), '\\test-folder\\cccc.md'),
},
];
const arrayLinksValidate = [
  {
    href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    file: pathNode.join(process.cwd(), '\\test-folder\\aaaa.md'),
    status: 200,
    statusText: 'OK',
  },
  {
    href: 'https://nodejs.org/api/x',
    text: 'node.js',
    file: pathNode.join(process.cwd(), '\\test-folder\\aaaa.md'),
    status: 404,
    statusText: 'FAIL',
  },
  {
    href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    file: pathNode.join(process.cwd(), '\\test-folder\\bbbb.md'),
    status: 200,
    statusText: 'OK',
  },
  {
    href: 'https://es.wikipedia.org/wiki/Markdown',
    text: 'Markdown',
    file: pathNode.join(process.cwd(), '\\test-folder\\cccc.md'),
    status: 200,
    statusText: 'OK',
  },
];

describe('existsPath', () => {
  it('It should be a function', () => {
    expect(typeof existsPath).toEqual('function');
  });

  it('It should true if the path exists', () => {
    expect(existsPath(pathNode.join(process.cwd(), '\\test-folder\\aaaa.md'))).toBe(true);
  });

  it(' It should return false if the path exists', () => {
    expect(existsPath(noPath)).toBe(false);
  });
});

describe('validateConvertPath', () => {
  it('It should be a function', () => {
    expect(typeof validateConvertPath).toEqual('function');
  });

  it('It should return absolute path', () => {
    expect(validateConvertPath(pathNode.join(process.cwd(), absolutePath)))
      .toBe(pathNode.join(process.cwd(), absolutePath));
  });

  it('It should return absolute path of relative path', () => {
    expect(validateConvertPath(relativePath)).toBe(pathNode.join(process.cwd(), '\\test-folder'));
  });
});

describe('validateFilePath', () => {
  it('It should be a function', () => {
    expect(typeof validateFilePath).toEqual('function');
  });

  it('It should true if the file exists', () => {
    expect(validateFilePath(pathNode.join(process.cwd(), absolutePath))).toBe(true);
  });

  it('It should return false if the file does not exists', () => {
    expect(validateFilePath(pathNode.join(process.cwd(), directoryPath))).toBe(false);
  });
});

describe('validateDirectoryPath', () => {
  it('It should be a function', () => {
    expect(typeof validateDirectoryPath).toEqual('function');
  });

  it('It should true if the directory exists', () => {
    expect(validateDirectoryPath(pathNode.join(process.cwd(), directoryPath))).toBe(true);
  });

  it('It should return false if the directory does not exists', () => {
    expect(validateDirectoryPath(pathNode.join(process.cwd(), absolutePath))).toBe(false);
  });
});

describe('isFileMd', () => {
  it('It should be a function', () => {
    expect(typeof isFileMd).toEqual('function');
  });

  it('It should .md  if is file.md', () => {
    expect(isFileMd(pathNode.join(process.cwd(), absolutePath))).toBe('.md');
  });
});

describe('searchPathFiles', () => {
  it('It should be a function', () => {
    expect(typeof searchPathFiles).toEqual('function');
  });

  it('should return an array with the file name of directory', () => {
    expect(searchPathFiles(relativePath)).toEqual([pathNode.join(process.cwd(), '\\test-folder\\aaaa.md'),
      pathNode.join(process.cwd(), '\\test-folder\\bbbb.md'),
      pathNode.join(process.cwd(), '\\test-folder\\cccc.md'),
      pathNode.join(process.cwd(), '\\test-folder\\test-folder-1\\abab.md'),
      pathNode.join(process.cwd(), '\\test-folder\\test-folder-1\\bcbc.md')]);
  });
});

describe('readFileMd', () => {
  it('It should be a function', () => {
    expect(typeof readFileMd).toEqual('function');
  });
  it('It should read the file', () => {
    expect(readFileMd(pathNode.join(process.cwd(), '\\test-folder\\bbbb.md'))).toEqual('[Markdown](https://es.wikipedia.org/wiki/Markdown)');
  });
});

describe('searchLinks', () => {
  it('It should be a function', () => {
    expect(typeof searchLinks).toEqual('function');
  });

  it('It Should return an array of links from a file', () => {
    expect(searchLinks(relativePath)).toStrictEqual(arrayLinks);
  });
});

describe('linksValidate', () => {
  it('It should be a function', () => {
    expect(typeof linksValidate).toEqual('function');
  });

  it('It should return a promise', () => linksValidate(relativePath)
    .then((result) => {
      expect(result).toStrictEqual(arrayLinksValidate);
    }));
});

describe('mdLinks', () => {
  it('It should be a function', () => {
    expect(typeof mdLinks).toBe('function');
  });

  it('It should return an array of validated links', () => mdLinks(relativePath, { validate: true })
    .then((result) => {
      expect(result).toStrictEqual(arrayLinksValidate);
    }));

  it('It should return an array of links', () => mdLinks(relativePath, { validate: false })
    .then((result) => {
      expect(result).toStrictEqual(arrayLinks);
    }));
  it('It should return a message: path does not exist', () => mdLinks(noPath)
    .catch((err) => {
      expect(err.message).toEqual('La ruta no existe. Ingrese una ruta válida');
    }));
});

describe('validateOptions', () => {
  it('It should be a function', () => {
    expect(typeof validateOptions).toEqual('function');
  });
  it('It should return an array ', () => validateOptions(relativePath)
    .then((result) => {
      expect(result).toStrictEqual('C:\\Users\\Labortoria\\Documents\\laboratoria-track-fe\\markdown-links\\LIM010-fe-md-links\\test-folder\\aaaa.md https://es.wikipedia.org/wiki/Markdown Markdown 200 OK\nC:\\Users\\Labortoria\\Documents\\laboratoria-track-fe\\markdown-links\\LIM010-fe-md-links\\test-folder\\aaaa.md https://nodejs.org/api/x node.js 404 FAIL\nC:\\Users\\Labortoria\\Documents\\laboratoria-track-fe\\markdown-links\\LIM010-fe-md-links\\test-folder\\bbbb.md https://es.wikipedia.org/wiki/Markdown Markdown 200 OK\nC:\\Users\\Labortoria\\Documents\\laboratoria-track-fe\\markdown-links\\LIM010-fe-md-links\\test-folder\\cccc.md https://es.wikipedia.org/wiki/Markdown Markdown 200 OK');
    }));
});

describe('statsOptions', () => {
  it('It should be a function', () => {
    expect(typeof statsOptions).toEqual('function');
  });
  it('It should return the stats of the link in a string ', () => statsOptions(relativePath)
    .then((result) => {
      expect(result).toEqual('Total: 4\nUnique: 2');
    }));
});

describe('statsValidateOptions', () => {
  it('It should be a function', () => {
    expect(typeof statsValidateOptions).toBe('function');
  });

  it('It should return tha stats and validate of the link in a string', () => statsValidateOptions(relativePath)
    .then((result) => {
      expect(result).toEqual('Total: 4\nUnique: 2\nBroken: 1');
    }));
});

describe('cliMdLinks', () => {
  it('It should be a function', () => {
    expect(typeof cliMdLinks).toBe('function');
  });

  it('Promise: It should return a message: La ruta ingresada no contiene Links ', () => cliMdLinks('test-folder\\test-folder-1\\abab.md')
    .then((result) => {
      expect(result).toEqual('La ruta ingresada no contiene Links');
    }));

  it('Promise: It should return a string of links validate/stats ', () => cliMdLinks(relativePath, { validate: true, stats: true })
    .then((result) => {
      expect(typeof result).toBe('string');
    }));


  it('Promise: It should return a string of links validate ', () => cliMdLinks(relativePath, { validate: true })
    .then((result) => {
      expect(typeof result).toBe('string');
    }));

  it('Promise: It should return a string of links ', () => cliMdLinks(relativePath, {})
    .then((result) => {
      expect(typeof result).toBe('string');
    }));

  it('Promise: It should return a string of links stats ', () => cliMdLinks(relativePath, { stats: true })
    .then((result) => {
      expect(typeof result).toBe('string');
    }));

  it('Promise: It should return a message: La ruta no existe. Ingrese una ruta válida', () => cliMdLinks('')
    .catch((err) => {
      expect(err.message).toEqual('La ruta no existe. Ingrese una ruta válida');
    }));
});
