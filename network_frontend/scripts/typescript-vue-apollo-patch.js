const fs = require('fs');
const path = require('path');

const loadGeneratedPath = path.resolve(__dirname, '../src/graphql/generated/graphqlOperations.ts');

fs.writeFileSync(loadGeneratedPath, fs.readFileSync(loadGeneratedPath, 'utf8').replace(/@vue\/composition-api/m, 'vue'));
