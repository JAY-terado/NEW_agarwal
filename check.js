const fs = require('fs');
const content = fs.readFileSync('src/pages/Home.tsx', 'utf-8');
console.log(content.slice(0, 500));
