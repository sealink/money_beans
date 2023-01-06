import { eslint } from "rollup-plugin-eslint";
import istanbul from "rollup-plugin-istanbul";
import { babel } from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";

let plugins = [
  eslint(),
  babel({
    babelHelpers: "bundled",
    exclude: "node_modules/**",
  }),
  nodeResolve(),
];

if (process.env.BUILD !== "production") {
  plugins.push(
    istanbul({
      exclude: ["test/**/*", "node_modules/**/*"],
    })
  );
}

export default {
  input: "src/money.js",
  plugins: plugins,
  output: [
    {
      file: "./dist/money.js",
      format: "umd",
      name: "money_beans",
      sourcemap: true,
    },
    {
      file: "./dist/money.esm.js",
      format: "es",
      sourcemap: true,
    },
  ],
};
