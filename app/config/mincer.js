var express = require('express');
var ConnectMincer = require('connect-mincer');
var env = process.env.NODE_ENV;

var mincer = new ConnectMincer({
  root: __dirname + "/../../",
  production: env == 'production' || env == 'staging',

  // uncomment to have view helpers generate urls of the form: //assets.example.com/assets/...
  // assetHost: '//assets.example.com',

  // you'll probably want to get this from a environment-specific config, e.g:
  // assetHost: config.get('asset_host')

  mountPoint: '/assets',
  manifestFile: __dirname + "/../../public/assets/manifest.json",
  paths: [
    'app/assets/images',
    'app/assets/stylesheets',
    'app/assets/javascripts',
    'vendor'
  ],
  // precompiling can take a long time: when testing, you may want to turn it off
  precompile: env != 'test'
});

function Config(app) {
  app.use(mincer.assets());

  if (env == 'production' || env == 'staging') {
    // in production, use the connect static() middleware to serve resources. In a real deployment
    // you'd probably not want this, and would use nginx (or similar) instead
    app.use(express.static(__dirname + '/public'));
  } else {
    // in dev, just use the normal server which recompiles assets as needed
    app.use('/assets', mincer.createServer());
  }
}

module.exports = Config;
