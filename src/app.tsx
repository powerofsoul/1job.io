import 'antd/dist/antd.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-quill/dist/quill.snow.css';

import Header from './common/Header';
import Footer from './common/Footer';
import styled from 'styled-components';
import { Provider, connect } from 'react-redux';
import configureStore, { IAppState } from './redux/configureStore';
import { ToastContainer } from 'react-toastify';
import ReactDOM from "react-dom";
import * as React from "react";
import { Link, BrowserRouter, Route, Switch } from 'react-router-dom'
import Index from './pages';
import Profile from './pages/profile';
import Register from './pages/register';
import Login from './pages/login';
import Job from './pages/job';
import Post from './pages/post';
import CurrentUserStore from './redux/stores/CurrentUserStore';
import { bindActionCreators } from 'redux';
import { User } from '../models/User';
import Company from './pages/company';
import Activation from './pages/token-pages/activation';
import ForgotPass from './pages/forgotpass';

const AppBody = styled.div`
    display:flex;
    flex-direction: column;
    min-height: 100vh;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
    'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
    'Noto Color Emoji';

    font-size: 15px;
`;

interface Route {
  path: string,
  component: React.ComponentType<any>,
  logged?: boolean,
}

const routes: Route[] = [
  { path: '/profile', component: Profile, logged: true },
  { path: '/job/:id', component: Job },
  { path: '/post/:id?', component: Post, logged: true },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/activation/:activationString', component: Activation},
  { path: '/forgotpass', component: ForgotPass},
  { path: '/company/:id', component: Company },
  { path: '/', component: Index }
]


interface Props {
  user: User;
  loading: boolean;
  refreshCurrentUser: () => void;
}

const App = (props: Props) => {
  const isLogged = props.loading || props.user;
  if (props.loading) props.refreshCurrentUser();

  return <BrowserRouter>
    <Header />
    <Switch>
      {routes.map(r => {
        const canAccess = isLogged || !r.logged;
        const component = canAccess ? r.component : Login;

        return <Route key={r.path} path={r.path} component={component} />
      })}
    </Switch>
    <Footer />
  </BrowserRouter>
}

const mapStateToProps = (store: IAppState): Partial<Props> => ({
  user: store.currentUserStore.user,
  loading: store.currentUserStore.loading
})

const ConnectedApp = connect(
  mapStateToProps,
  (dispatch) => bindActionCreators(CurrentUserStore.actionCreators, dispatch)
)(App);

const AppWrapper = () => {
  const appStore = configureStore();

  return <Provider store={appStore}>
    <ToastContainer position="top-right"
      autoClose={3000} />
    <AppBody>
      <ConnectedApp />
    </AppBody>
  </Provider>
};


ReactDOM.render(
  <AppWrapper />,
  document.getElementById('app')
);