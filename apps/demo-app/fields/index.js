"use strict";

module.exports = {
  'person-name': {
    isPageHeading: true,
    validate: ['required', { type: 'maxlength', arguments: 50 }]
  },
  'language-radio': {
    isPageHeading: true,
    validate: ['required'],
    mixin: 'radio-group',
    options: [
      'javascript',
      'typescript',
      'java',
      'rust',
      'go'
    ]
  },
  'build-tool-checkbox': {
    isPageHeading: true,
    mixin: 'checkbox-group',
    validate: ['required'],
    options: [
      'make',
      'gradle',
      'maven',
      'ant'
    ]
  },
  textarea: {
    isPageHeading: true,
    mixin: 'textarea',
    attributes: [{
      attribute: 'rows',
      value: 10
    }],
    validate: [
      'required',
      { type: 'maxword', arguments: 50 }
    ]
  }
}