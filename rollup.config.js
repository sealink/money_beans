import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import istanbul from 'rollup-plugin-istanbul';

let pkg = require('./package.json')

let plugins = [
  eslint(),
  istanbul({
    exclude: ['test/**/*.js']
  }),
  babel({
    exclude: 'node_modules/**',
  }),
];

export default {
  input: 'src/money.js',
  plugins: plugins,
  output: [
    {
      file: pkg.main,
      format: 'umd',
      name: 'money_beans',
    },
    {
      file: pkg.module,
      format: 'es',
    }
  ]
};
