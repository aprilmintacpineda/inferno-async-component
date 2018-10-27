/** @format */

import { Component } from 'inferno';
import { createElement } from 'inferno-create-element';

export default (loader, renderWhileLoading, failedCallback) => {
  let asyncComponent = null;

  function LoadAsyncComponent (props) {
    this.props = props;
    this.state = {
      result: null
    };

    this.loadComponent = loaderCallback => {
      loaderCallback
        .then(component => {
          asyncComponent = component;

          this.setState({
            result: true
          });
        })
        .catch(err => {
          if (failedCallback) {
            failedCallback(err);
          }

          this.setState({
            result: false
          });
        });
    };

    this.resolveLoader = () => {
      if (loader.constructor === Promise) {
        this.setState(
          {
            result: null
          },
          () => {
            this.loadComponent(loader);
          }
        );
      } else {
        this.setState(
          {
            result: null
          },
          () => {
            this.loadComponent(loader());
          }
        );
      }
    };

    this.componentDidMount = () => {
      if (!asyncComponent) {
        this.resolveLoader();
      }
    };

    this.render = () => {
      if (!asyncComponent) {
        if (renderWhileLoading) {
          return <renderWhileLoading />;
        }

        return null;
      }

      return createElement(
        asyncComponent && asyncComponent.__esModule ? asyncComponent.default : asyncComponent,
        this.props
      );
    };

    return this;
  }

  LoadAsyncComponent.prototype = Component.prototype;
  LoadAsyncComponent.prototype.constructor = LoadAsyncComponent;

  return LoadAsyncComponent;
};
