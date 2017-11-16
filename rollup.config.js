import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import istanbul from 'rollup-plugin-istanbul';

let pkg = require('./package.json')

let plugins = [
  eslint(),
  babel({
    exclude: 'node_modules/**',
  }),
];

if (process.env.BUILD !== 'production') {
  plugins.push(istanbul({
    exclude: ['test/**/*', 'node_modules/**/*']
  }));
}

export default {
  input: 'src/money.js',
  plugins: plugins,
  output: [
    {
      file: pkg.main,
      format: 'umd',
      name: 'money_beans',
      sourceMap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      sourceMap: true,
    }
  ]
};
