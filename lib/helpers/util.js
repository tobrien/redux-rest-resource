'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var includes = exports.includes = function includes(array, key) {
  return array.indexOf(key) !== -1;
};

var isObject = exports.isObject = function isObject(maybeObject) {
  return (typeof maybeObject === 'undefined' ? 'undefined' : _typeof(maybeObject)) === 'object';
};

var pick = exports.pick = function pick(obj) {
  for (var _len = arguments.length, keys = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    keys[_key - 1] = arguments[_key];
  }

  return keys.reduce(function (soFar, key) {
    if (includes(keys, key) && obj[key]) {
      soFar[key] = obj[key]; // eslint-disable-line no-param-reassign
    }
    return soFar;
  }, {});
};

var startsWith = exports.startsWith = function startsWith(string, target) {
  return String(string).slice(0, target.length) === target;
};

var ucfirst = exports.ucfirst = function ucfirst(str) {
  return str.charAt(0).toUpperCase() + str.substr(1);
};

var upperSnakeCase = exports.upperSnakeCase = function upperSnakeCase(string) {
  return String(string.split('').reduce(function (soFar, letter, index) {
    var charCode = letter.charCodeAt(0);
    return soFar + (index && charCode < 97 ? '_' + letter : letter).toUpperCase();
  }, ''));
};
//# sourceMappingURL=util.js.map