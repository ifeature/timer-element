const fs = require('fs-extra');
const concat = require('concat');

(async function build() {
  const files = [
    './dist/timer-element/runtime.js',
    './dist/timer-element/polyfills.js',
    './dist/timer-element/scripts.js',
    './dist/timer-element/main.js',
  ];

  await fs.ensureDir('elements');

  await concat(files, 'elements/timer.js');

  await fs.copyFile('./dist/timer-element/styles.css', 'elements/styles.css');

  await fs.copy('./dist/timer-element/assets/', 'elements/assets/' );

})();

