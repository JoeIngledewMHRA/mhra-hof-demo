"use strict";
const SummaryPageBehaviour = require("hof/components").summary;

module.exports = {
  name: 'demo-app',
  params: '/:action?',
  confirmStep: '/check-your-answers',
  pages: {
    '/accessibility': 'accessibility',
    '/cookies': 'cookies'
  },
  steps: {
    '/what-is-your-name': {
      fields: [
        'person-name'
      ],
      next: '/what-programming-language',
      behaviours: []
    },
    '/what-programming-language': {
      fields: [
        'language-radio'
      ],
      forks: [
        {
          target: '/which-build-tool',
          condition: {
            field: 'language-radio',
            value: 'java'
          }
        },
        {
          target: '/write-something',
          condition: function (req, _) {
            return req.form.values['language-radio'] !== 'java';
          }
        }
      ],
      behaviours: []
    },
    '/which-build-tool': {
      fields: [
        'build-tool-checkbox'
      ],
      next: '/check-your-answers'
    },
    '/write-something': {
      fields: [
        'textarea'
      ],
      next: '/check-your-answers'
    },
    '/check-your-answers': {
      behaviours: require("hof").components.summary,
      sections: require('./sections/summary-data-sections'),
      next: '/confirmation'
    },
    '/confirmation': {
      backLink: false
    }
  }
};
