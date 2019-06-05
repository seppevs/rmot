# rmot
Remove Older Than

An async function that removes all files of a directory older than a given date

✨ [![Build Status](http://img.shields.io/travis/seppevs/rmot.svg?style=flat)](https://travis-ci.org/seppevs/rmot) [![Coverage Status](https://coveralls.io/repos/github/seppevs/rmot/badge.svg?branch=master)](https://coveralls.io/r/seppevs/rmot) [![NPM](http://img.shields.io/npm/v/rmot.svg?style=flat)](https://www.npmjs.org/package/rmot) [![Downloads](http://img.shields.io/npm/dm/rmot.svg?style=flat)](https://www.npmjs.org/package/rmot) [![Dependencies](https://david-dm.org/seppevs/rmot.svg)](https://david-dm.org/seppevs/rmot) [![Known Vulnerabilities](https://snyk.io/test/github/seppevs/rmot/badge.svg)](https://snyk.io/test/github/seppevs/rmot) ✨


## Installation
```bash
$ npm install rmot --save
```

## Example
```javascript
const rmot = require('rmot');

(async () => {
  // Removes all files in `/path/to/some/dir` that were created before '2019-06-05T19:48:48.049Z'
  const result = await rmot('/path/to/some/dir', new Date('2019-06-05T19:48:48.049Z'));
  
  // The resolved value will contain a list of fileNames that were removed
  console.log(result);
})();

```
