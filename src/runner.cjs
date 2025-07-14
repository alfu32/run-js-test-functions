#!/usr/bin/env node
const { createRequire } = require('module');
const { pathToFileURL } = require('url');
const path = require('path');

const [,, file, fn] = process.argv;

(async () => {
  try {
    let mod;
    // 1) Try CommonJS load
    try {
      mod = require(file);
    } catch {
      // 2) Fallback to ESM import
      mod = await import(pathToFileURL(file).href);
    }

    const fnExport = mod[fn];
    if (typeof fnExport !== 'function') {
      throw new Error(`No function "${fn}" exported from ${file}`);
    }

    const result = await Promise.resolve(fnExport());
    console.log('Result:', result);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
