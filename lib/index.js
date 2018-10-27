"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _inferno = require("inferno");

var _infernoCreateElement = require("inferno-create-element");

/** @format */
var _default = function _default(loader, renderWhileLoading, failedCallback) {
  var asyncComponent = null;

  function LoadAsyncComponent(props) {
    var _this = this;

    this.props = props;
    this.state = {
      result: null
    };

    this.loadComponent = function (loaderCallback) {
      loaderCallback.then(function (component) {
        asyncComponent = component;

        _this.setState({
          result: true
        });
      }).catch(function (err) {
        if (failedCallback) {
          failedCallback(err);
        }

        _this.setState({
          result: false
        });
      });
    };

    this.resolveLoader = function () {
      if (loader.constructor === Promise) {
        _this.setState({
          result: null
        }, function () {
          _this.loadComponent(loader);
        });
      } else {
        _this.setState({
          result: null
        }, function () {
          _this.loadComponent(loader());
        });
      }
    };

    this.componentDidMount = function () {
      if (!asyncComponent) {
        _this.resolveLoader();
      }
    };

    this.render = function () {
      if (!asyncComponent) {
        if (renderWhileLoading) {
          return (0, _inferno.createVNode)(1, "renderWhileLoading");
        }

        return null;
      }

      return (0, _infernoCreateElement.createElement)(asyncComponent && asyncComponent.__esModule ? asyncComponent.default : asyncComponent, _this.props);
    };

    return this;
  }

  LoadAsyncComponent.prototype = _inferno.Component.prototype;
  LoadAsyncComponent.prototype.constructor = LoadAsyncComponent;
  return LoadAsyncComponent;
};

exports.default = _default;