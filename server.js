const hof = require("hof");
const config = require("./config");
const mockAPIs = require("./mock-apis");
const bodyParser = require("busboy-body-parser");

if (process.env.REDIS_URL) {
  config.redis = process.env.REDIS_URL;
}

let settings = require("./hof.settings");

settings = Object.assign({}, settings, {
  behaviours: settings.behaviours.map(require),
  routes: settings.routes.map(require),
  redis: config.redis,
  csp: {
    imgSrc: [
      'www.google-analytics.com',
      'ssl.gstatic.com',
      'www.google.co.uk/ads/ga-audiences'
    ],
    connectSrc: [
      'https://www.google-analytics.com',
      'https://region1.google-analytics.com',
      'https://region1.analytics.google.com',
    ]
  },
  getCookies: false,
  getTerms: true,
  getAccessibility: true,
});

const app = hof(settings);

app.use('/terms-and-conditions', (req, res, next) => {
  res.locals = Object.assign({}, res.locals, req.translate('terms'));
  next();
});

app.use('/cookies', (req, res, next) => {
  res.locals = Object.assign({}, res.locals, req.translate('cookies'));
  next();
});

app.use('/report', (_, res) => {
  res.redirect(301, '/');
});

if (config.useMocks) {
  app.use(mockAPIs);
}

app.use((_, res, next) => {
  res.locals.htmlLang = 'en';
  res.locals.feedbackUrl = 'http://localhost';
  res.locals.footerSupportLinks = [
    { path: '/cookies', property: 'base.cookies' },
    { path: '/terms-and-conditions', property: 'base.terms' },
    { path: '/accessibility', property: 'base.accessibility' },
  ];
  next();
});

app.use(bodyParser({ limit: config.upload.maxFileSize }));

module.exports = app;