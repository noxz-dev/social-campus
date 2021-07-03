/**
 * fixes issues with the vue apollo package
 */
const fs = require('fs');
const path = require('path');

//if youre using node 14 uncomment this
// fs.rmdirSync(path.resolve(__dirname, '../node_modules/.vite_opt_cache'), {
//   recursive: true,
// });

const useQueryPath = path.resolve(__dirname, '../node_modules/@vue/apollo-composable/dist/useQuery.js');

const vueApolloComposablePath = path.resolve(
  __dirname,
  '../node_modules/@vue/apollo-composable/dist/vue-apollo-composable.js'
);

fs.writeFileSync(useQueryPath, fs.readFileSync(useQueryPath, 'utf8').replace(/^onServerPrefetch, /mu, ''));

fs.writeFileSync(
  useQueryPath,
  fs.readFileSync(useQueryPath, 'utf8').replace(/onServerPrefetch === null.*?\}\);/msu, '')
);

fs.writeFileSync(
  vueApolloComposablePath,
  fs.readFileSync(vueApolloComposablePath, 'utf8').replace(/vue_demi_5.onServerPrefetch === null.*?\}\);/msu, '')
);
