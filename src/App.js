import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import {Provider} from 'react-redux';
import MainRouter from './routing';
import {store} from './redux/index';

const App = () => {
  return (
    <Provider store={store}>
      <MainRouter/>
    </Provider>
  );
};

export default App;
