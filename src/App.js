import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension';
import Root from './components/Root';
import './App.css';


const store = createStore(reducer, composeWithDevTools());

function App() {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
}

export default App;
