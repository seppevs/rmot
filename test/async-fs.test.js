'use strict';

const tempy = require('tempy/index');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const open = promisify(fs.open);
const close = promisify(fs.close);
const access = promisify(fs.access);

const asyncFs = require('../src/async-fs');

describe('async-fs', () => {
  describe('readdir()', () => {
    it('should list all files of a directory', async () => {
      const dirPath = tempy.directory();
      const filePath = path.join(dirPath, 'tempFile.txt');
      const file = await open(filePath, 'w');
      await close(file);

      const dirContent = await asyncFs.readdir(dirPath);
      expect(dirContent).toEqual(['tempFile.txt']);
    });
  });

  describe('stat()', () => {
    it('should return the stats of a file', async () => {
      const filePath = tempy.file();
      const file = await open(filePath, 'w');
      await close(file);

      const fileStat = await asyncFs.stat(filePath);
      expect(fileStat.size).toEqual(0);
    });
  });

  describe('unlink()', () => {
    it('should remove a file', async () => {
      const filePath = tempy.file();
      const file = await open(filePath, 'w');
      await close(file);
      await expect(access(filePath, fs.constants.F_OK)).resolves;
      await asyncFs.unlink(filePath);
      await expect(access(filePath, fs.constants.F_OK)).rejects.toThrow();
    });
  });
});
