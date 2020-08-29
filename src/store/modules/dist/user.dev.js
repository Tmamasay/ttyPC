"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _cache = require("@/core/services/cache");

var _commonInteractor = _interopRequireDefault(require("@/core/interactors/common-interactor"));

var _index = require("@/utils/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var state = {
  token: (0, _cache.getToken)()
};
var mutations = {
  SET_TOKEN: function SET_TOKEN(state, token) {
    state.token = token;
  }
};
var actions = {
  userLogin: function userLogin(_ref, info) {
    var commit = _ref.commit,
        state = _ref.state;
    var username = info.username,
        password = info.password;
    return new Promise(function (resolve, reject) {
      var data = {
        param: {
          username: username.trim(),
          password: (0, _index.ttyMD5)(password),
          sysName: 'tyteen',
          loginType: 'tyteen',
          clientPassword: 'nfjkMaHiO4Wz42Fb1jNVWlilUzBXxwqD'
        }
      };

      _commonInteractor["default"].userLogin(data).then(function (res) {
        if (res.access_token) {
          // setToken(res.access_token)
          (0, _cache.setToken)("Bearer ".concat(res.access_token));
          (0, _cache.setRefreshToken)(res.refresh_token);
          commit('SET_TOKEN', res.access_token);
          console.log(res.access_token);

          _commonInteractor["default"].getCompanyOne().then(function (info) {
            (0, _cache.setUserInfo)(info);
            resolve(info);
          })["catch"](function (error) {
            reject(error);
          });
        }
      });
    });
  },
  getInfo: function getInfo(_ref2) {
    var commit = _ref2.commit,
        state = _ref2.state;
  },
  logout: function logout(_ref3) {
    var commit = _ref3.commit,
        state = _ref3.state,
        dispatch = _ref3.dispatch;
    commit('SET_TOKEN', '');
    (0, _cache.removeToken)();
    (0, _cache.removeUserInfo)();
    (0, _cache.removeRefreshToken)();
  },
  resetToken: function resetToken(_ref4) {
    var commit = _ref4.commit;
    return new Promise(function (resolve) {
      commit('SET_TOKEN', '');
      (0, _cache.removeToken)();
      (0, _cache.removeUserInfo)();
      (0, _cache.removeRefreshToken)();
      resolve();
    });
  }
};
var _default = {
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions
};
exports["default"] = _default;