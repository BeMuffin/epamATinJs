exports.config = {
  specs: ['./test/specs/*.spec.js'],
  exclude: [],

  maxInstances: 1,

  capabilities: [
    {
      maxInstances: 1,

      browserName: 'chrome',
      acceptInsecureCerts: true,
    },
  ],

  logLevel: 'info',

  bail: 0,

  baseUrl: 'http://localhost',

  waitforTimeout: 10000,

  connectionRetryTimeout: 120000,

  connectionRetryCount: 3,

  services: ['chromedriver'],

  framework: 'mocha',

  reporters: ['spec'],

  mochaOpts: {
    require: './test/config/mocha.config.js',
    ui: 'bdd',
    timeout: 1000000,
  },
};
