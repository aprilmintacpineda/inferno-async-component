<!-- @format -->

# inferno-async-component

Bridge between inferno-js and webpack's dynamic import. With this you can asynchronously load your components.

# install

`npm i -s inferno-async-component`.

# Usage

#### Preloaded async component / immediate loading

When you want the component to load immediately even when you are not yet using it. You can do it like this:

```jsx
import asyncComponent from 'inferno-async-component';

const MyAsyncComponent = asyncComponent(
  import(/* webpackChunkName: 'MyAsyncComponent' */ '../path/to/MyAsyncComponent')
);

// Then you can render it like a usual component
export default () => (
  <div>
    <p>Your contents goes here</p>
    <MyAsyncComponent />
    <p>Your contents goes here</p>
  </div>
);
```

#### Not-preloaded async component / on-demand loading

When you want the component to load when you used it. You can do it like this:

```jsx
import asyncComponent from 'inferno-async-component';

const MyAsyncComponent = asyncComponent(() =>
  import(/* webpackChunkName: 'MyAsyncComponent' */ '../path/to/MyAsyncComponent')
);

// Then you can render it like a usual component
export default () => (
  <div>
    <p>Your contents goes here</p>
    <MyAsyncComponent />
    <p>Your contents goes here</p>
  </div>
);
```

#### Render a placeholder while the component is loading

The component may take a while to load depending on many factors. Wwhen you want to render something to serve as a placeholder while the component hasn't rendered yet, like a spinner for example you can provide a second argument which should be the component you want to serve as the placeholder.

```jsx
import asyncComponent from 'inferno-async-component';
import SpinnerComponent from '../components/SpinnerComponent';

const MyAsyncComponent = asyncComponent(
  () => import(/* webpackChunkName: 'MyAsyncComponent' */ '../path/to/MyAsyncComponent'),
  SpinnerComponent
);

/**
 * Then you can render it like a usual component
 * Now the SpinnerComponent would be rendered while MyAsyncComponent is not ready to be rendered yet.
 */
export default () => (
  <div>
    <p>Your contents goes here</p>
    <MyAsyncComponent />
    <p>Your contents goes here</p>
  </div>
);
```

#### Async components may fail to load due to network errors

You can handler error by either providing a third argument and/or by providing a `failedCallback` prop to your component. This should be a function that would accept `error` as the only parameter. If you provide both, both would be called but `failedCallback` prop would be called first.

###### Third argument

```jsx
import asyncComponent from 'inferno-async-component';
import SpinnerComponent from '../components/SpinnerComponent';

const MyAsyncComponent = asyncComponent(
  () => import(/* webpackChunkName: 'MyAsyncComponent' */ '../path/to/MyAsyncComponent'),
  SpinnerComponent,
  err => {
    console.log(err);
    // do something!
  }
);

/**
 * Then you can render it like a usual component
 * Now the SpinnerComponent would be rendered while MyAsyncComponent is not ready to be rendered yet.
 */
export default () => (
  <div>
    <p>Your contents goes here</p>
    <MyAsyncComponent />
    <p>Your contents goes here</p>
  </div>
);
```

###### `failedCallback` component prop

```jsx
import asyncComponent from 'inferno-async-component';
import SpinnerComponent from '../components/SpinnerComponent';

const MyAsyncComponent = asyncComponent(
  () => import(/* webpackChunkName: 'MyAsyncComponent' */ '../path/to/MyAsyncComponent'),
  SpinnerComponent
);

/**
 * Then you can render it like a usual component
 * Now the SpinnerComponent would be rendered while MyAsyncComponent is not ready to be rendered yet.
 */
export default () => (
  <div>
    <p>Your contents goes here</p>
    <MyAsyncComponent
      failedCallback={err => {
        console.log(err);
        // do something!
      }}
    />
    <p>Your contents goes here</p>
  </div>
);
```

###### Both third argument and `failedCallback` prop

```jsx
import asyncComponent from 'inferno-async-component';
import SpinnerComponent from '../components/SpinnerComponent';

const MyAsyncComponent = asyncComponent(
  () => import(/* webpackChunkName: 'MyAsyncComponent' */ '../path/to/MyAsyncComponent'),
  SpinnerComponent,
  err => {
    console.log(err);
    // do something!
  }
);

/**
 * Then you can render it like a usual component
 * Now the SpinnerComponent would be rendered while MyAsyncComponent is not ready to be rendered yet.
 */
export default () => (
  <div>
    <p>Your contents goes here</p>
    <MyAsyncComponent
      failedCallback={err => {
        console.log(err);
        // do something!
      }}
    />
    <p>Your contents goes here</p>
  </div>
);
```
