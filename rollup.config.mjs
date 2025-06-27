// rollup.config.mjs
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';

const env = 'production';

// React本体のビルド設定
const reactConfig = {
  // 変更点: 'react/index.js' から 'react' に修正
  input: 'react', 
  output: {
    file: 'dist/react.production.min.js',
    format: 'umd',
    name: 'React',
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env),
      preventAssignment: true,
    }),
    terser(),
  ],
};

// ReactDOMのビルド設定
const reactDOMConfig = {
  // 変更点: 'react-dom/index.js' から 'react-dom/client' に修正
  // ブラウザ環境向けのAPIは 'react-dom/client' から提供されます
  input: 'react-dom/client', 
  output: {
    file: 'dist/react-dom.production.min.js',
    format: 'umd',
    name: 'ReactDOM',
    globals: { 'react': 'React' }, // <script>でReactが先に読み込まれていることを示す
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env),
      preventAssignment: true,
    }),
    terser(),
  ],
  external: ['react'], // reactパッケージはバンドルに含めず、外部依存とする
};

export default [reactConfig, reactDOMConfig];
