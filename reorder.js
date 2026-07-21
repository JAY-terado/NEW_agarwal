const fs = require('fs');

const file = fs.readFileSync('src/data/projects.ts', 'utf-8');

// We know the structure is: export const projects: Project[] = [ ... ];
// The best way is to extract each object.

// But we can also just split by the `slug` and reconstruct, but it might be brittle.
// Actually, let's use a simple regex or AST.

