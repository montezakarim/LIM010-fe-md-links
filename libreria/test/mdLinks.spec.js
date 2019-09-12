import { validatePath } from "../index.js";

describe('validatePath', () => {
  it('debería ser una función', () => {
    expect(typeof validatePath).toEqual('function');
  });

  it('return absolute path', () => {
    expect(validatePath('C:\\Users\\Labortoria\\Documents\\laboratoria-track-fe\\markdown-links\\LIM010-fe-md-links\\prueba\\prueba.md')). toBe('C:\\Users\\Labortoria\\Documents\\laboratoria-track-fe\\markdown-links\\LIM010-fe-md-links\\prueba\\prueba.md');
  });

  it('return absolute path', () => {
    expect(validatePath('prueba\\prueba.md')). toBe('C:\\Users\\Labortoria\\Documents\\laboratoria-track-fe\\markdown-links\\LIM010-fe-md-links\\prueba\\prueba.md');
  })
});

