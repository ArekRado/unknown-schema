import babel from 'rollup-plugin-babel'
import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'

export default {
  input: './src/index.ts',
  output: {
    format: 'umd',
    name: 'R',
    exports: 'named',
  },
  plugins: [
    typescript({ useTsconfigDeclarationDir: true, tsconfig: 'tsconfig.json' }),
    babel({
      extensions: ['.ts'],
      exclude: ['dist/**', 'node_modules/**'],
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              browsers: ['last 2 versions', '> 1%', 'not dead'],
            },
          },
        ],
      ],
    }),
  ],
  output: [
    { file: pkg.main, format: 'cjs', name: 'unknown-schema', exports: 'named' },
    { file: pkg.module, format: 'es', exports: 'named' },
  ],
}
