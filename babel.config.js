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
    [
      'module-resolver',
      {
        alias: {
          '@core': './src/core',
          '@interfaces': './src/interfaces',
          //'@routes': './src/routes',
          //'@models': './src/models',
          //'@config': './src/config',
          //'@controllers': './src/controllers',
          //'@services': './src/services',
          //'@utils': './src/utils',
          //'@middlewares': './src/middlewares'
        }
      }
    ]
  ],
  // ignore: ['**/*.spec.ts']                     //Para ignorar codigo test (si trabajamos con test)
}
