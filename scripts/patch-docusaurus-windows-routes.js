const fs = require('fs');
const path = require('path');

const target = path.join(__dirname, '..', 'node_modules', '@docusaurus', 'core', 'lib', 'server', 'routes.js');
const marker = 'const NotFoundRoutePath = \'/404.html\';';
const originalNeedle = `function getRoutesPaths(routeConfigs, baseUrl) {
    return [
        (0, utils_1.normalizeUrl)([baseUrl, NotFoundRoutePath]),
        ...(0, utils_1.flattenRoutes)(routeConfigs).map((r) => r.path),
    ];
}`;
const replacement = `function getRoutesPaths(routeConfigs, baseUrl) {
    return [
        (0, utils_1.normalizeUrl)([baseUrl, NotFoundRoutePath]),
        ...(0, utils_1.flattenRoutes)(routeConfigs)
            .map((r) => r.path)
            .filter((routePath) => !routePath.includes('*')),
    ];
}`;

if (!fs.existsSync(target)) {
  console.error(`Docusaurus routes.js not found: ${target}`);
  process.exit(1);
}

const content = fs.readFileSync(target, 'utf8');
if (!content.includes(marker)) {
  console.error('Unexpected Docusaurus routes.js format; aborting patch.');
  process.exit(1);
}

if (content.includes("filter((routePath) => !routePath.includes('*'))")) {
  console.log('Wildcard SSG patch already present.');
  process.exit(0);
}

if (!content.includes(originalNeedle)) {
  console.error('Could not find expected getRoutesPaths implementation; aborting patch.');
  process.exit(1);
}

fs.writeFileSync(target, content.replace(originalNeedle, replacement));
console.log('Patched Docusaurus SSG route filtering to skip wildcard routes.');
