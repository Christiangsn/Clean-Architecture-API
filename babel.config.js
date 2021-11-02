module.exports = {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            node: 'current'
          }
        }
      ],
      '@babel/preset-typescript'
    ],
    plugins: [
      ['module-resolver', {
        alias: {
          '@config': '',
          '@domain': './src/models',
          '@infra': './src/controllers',
          '@presentation': './src/views',
          '@util': './src/util',
          '@data': './src/data',
          '@damin': './src/main'
        }
      }]
    ],
    ignore: [
      '**/*.spec.ts'
    ]
  }