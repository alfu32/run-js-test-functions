#!/usr/bin/env node
import { createRequire } from 'module';
import { pathToFileURL } from 'url';
import path from 'path';

const [,, file, fn] = process.argv;

;(async () => {
  try {
    // set up a CJS-style require inside ESM
    const require = createRequire(import.meta.url);
    let mod;

    // 1) first try loading as CommonJS
    try {
      mod = require(file);
    } catch {
      // 2) fallback to ESM import
      mod = await import(pathToFileURL(file).href);
    }

    // support both named exports and default-exported objects
    let fnExport = mod[fn];
    if (fnExport === undefined && mod.default) {
      // if they did `export default { test_xxx: ... }`
      fnExport = mod.default[fn] || mod.default;
    }

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
