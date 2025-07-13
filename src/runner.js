#!/usr/bin/env node
const [,, file, fn] = process.argv;
(async ()=> {
  try {
    const mod = require(file);
    if (typeof mod[fn] !== 'function') throw new Error(`No function ${fn}`);
    const result = await Promise.resolve(mod[fn]());
    console.log('Result:', result);
  } catch(e) {
    console.error(e);
    process.exit(1);
  }
})();
