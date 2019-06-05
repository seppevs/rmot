const path = require('path');
const asyncFs = require('./async-fs');
const pFilter = require('p-filter');

module.exports = async (dirPath, date) => {

  const fullPathOf = (fileName) => path.join(dirPath, fileName);

  const filterer = async (fileName) => {
    const stat = await asyncFs.stat(fullPathOf(fileName));
    return stat.isFile() && stat.birthtimeMs < date.getTime();
  };

  const dirPathChilds = await asyncFs.readdir(dirPath);
  const matchingFileNames = await pFilter(dirPathChilds, filterer);

  await Promise.all(matchingFileNames.map((fileName) => asyncFs.unlink(fullPathOf(fileName))));

  return matchingFileNames;
};
