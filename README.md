<!-- @format -->

# inferno-async-component

Bridge between inferno-js and webpack's dynamic import. With this you can asynchronously load your components.

# install

`npm i -s inferno-async-component`.

# Usage

#### Preloaded async component

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

#### Not-preloaded async component

When you want the component to load when you start to render it. You can do it like this:

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

The component may take a while to load, when you want to render something there, like a spinner of some sort or a ny placeholder.

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

# Async components may fail to load due to network errors

You can handle failure by giving a third parameter like so:

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

When the loading fails, the third argument you provided would be called with the error.
