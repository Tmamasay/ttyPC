"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = get;
exports.createRandomNum = exports.initPlatform = exports.ttyMD5 = void 0;

var _jsMd = _interopRequireDefault(require("js-md5"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// md5加密
var ttyMD5 = function ttyMD5(passworld) {
  return (0, _jsMd["default"])(passworld).toUpperCase();
};

exports.ttyMD5 = ttyMD5;

var initPlatform = function initPlatform() {
  var UA = navigator.userAgent;
  var info = UA.match(/\s{1}DSBRIDGE[\w\.]+$/g);

  if (info && info.length > 0) {
    var infoArray = info[0].split('_');
    window.$appVersion = infoArray[1];
    window.$systemVersion = infoArray[2];
    window.$platform = infoArray[3];
  } else {
    window.$appVersion = undefined;
    window.$systemVersion = undefined;
    window.$platform = 'browser';
  }
};

exports.initPlatform = initPlatform;

var createRandomNum = function createRandomNum(n) {
  var rnd = '';

  for (var i = 0; i < n; i++) {
    rnd += Math.floor(Math.random() * 10);
  }

  return parseInt(rnd, 10);
};

exports.createRandomNum = createRandomNum;

function get(object, path) {
  var keys = path.split('.');
  var result = object;
  keys.forEach(function (key) {
    result = isDef(result[key]) ? result[key] : '';
  });
  return result;
}