const fs = require('fs');
let content;

try {
  content = fs.readFileSync('README.md', 'utf-8');
} catch (ex) {
  console.log(ex);
}
console.log(content);
