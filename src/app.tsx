import 'antd/dist/antd.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-quill/dist/quill.snow.css';

import Header from './common/Header';
import Footer from './common/Footer';
import styled from 'styled-components';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import ReactDOM from "react-dom";
import * as React from "react";
import { Link, BrowserRouter, Route } from 'react-router-dom'
import Index from './pages/Index';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import Register from './pages/Register';
import Login from './pages/Login';
import Job from './pages/Job';
import Post from './pages/Post';

const AppBody = styled.div`
    display:flex;
    flex-direction: column;
    min-height: 100vh;
    font-family: 'Muli', sans-serif;

    font-size: 15px;
`;

const App = () => {
  const appStore = configureStore();

  return <Provider store={appStore}>
      <ToastContainer position="bottom-right"
        autoClose={1500} />
      <AppBody>
        <BrowserRouter>
          <Header />
            <Route path="/profile" component={Profile} /> 
            <Route path="/job/:id" component={Job} /> 
            <Route path="/post" component={Post} /> 
            <Route path="/login" component={Login} /> 
            <Route path="/register" component={Register} /> 
            <Route path="/" exact component={Index} /> 
          <Footer />
        </BrowserRouter>
      </AppBody>
  </Provider>
};

ReactDOM.render(
  <App />,
  document.getElementById('app')
);