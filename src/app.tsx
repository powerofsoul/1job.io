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
import Profile from './pages/profile/profile';
import Register from './pages/register/register';
import Login from './pages/login';
import Job from './pages/job';
import Post from './pages/post/post';
import CurrentUserStore from './redux/stores/CurrentUserStore';
import { bindActionCreators } from 'redux';
import { User, UserType } from '../models/User';
import Company from './pages/company';
import Activation from './pages/token-pages/activation';
import ForgotPass from './pages/forgotpass';
import ChangePassword from './pages/changePassword';
import { useHistory } from 'react-router';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements
} from '@stripe/react-stripe-js';
import EditJob from './pages/post/editJob';
import ChangeEmail from './pages/token-pages/changeEmail';
import JobApply from './pages/jobApply';
import Applicants from './pages/applicants';

const AppBody = styled.div`
    display:flex;
    flex-direction: column;
    min-height: 100vh;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
    'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
    'Noto Color Emoji';

    font-size: 17px;
`;

interface Route {
  path: string,
  component: React.ComponentType<any>,
  logged?: boolean,
  userType?: typeof UserType[number][]
}

const routes: Route[] = [
  { path: '/profile', component: Profile, logged: true },
  { path: '/job/:id/edit', component: EditJob, userType: ["Employer"] },
  { path: '/job/:id/apply', component: JobApply, userType: ["Employee"] },
  { path: '/job/:id/applicants', component: Applicants, userType: ["Employer"] },
  { path: '/post/:id?', component: Post, logged: true, userType: ["Employer"] },
  { path: '/job/:id', component: Job},
  { path: '/company/:id', component: Company },

  { path: '/login', component: Login},
  { path: '/register', component: Register },
  { path: '/change-password/:token?', component: ChangePassword },
  { path: '/activation/:activationString', component: Activation },
  { path: '/forgotpass', component: ForgotPass },
  { path: '/change-email/:hash', component: ChangeEmail },
  { path: '/', component: Index,}
]


interface Props {
  user: User;
  loading: boolean;
  refreshCurrentUser: () => void;
}

let historyEventsAreDefined = false;
const defineHistoryEvents = (history) => {
  if (!historyEventsAreDefined) {
    history.listen((location) => {
      if (window.ga) {
        window.ga.getAll()[0].set('page', location.pathname);
        window.ga.getAll()[0].send('pageview')
      }
    });

    historyEventsAreDefined = true;
  }
}

//@ts-ignore
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);
const Routes = (props: Props) => {
  const history = useHistory();
  defineHistoryEvents(history);

  return <Switch>
    {routes.map(r => {
      const validRouteForUser = props.loading || !r.userType || r.userType.includes(props.user?.__t);
      const canAccess = !r.logged || validRouteForUser;
      const component = canAccess ? r.component : r.logged ? Index : Login;
      

      return <Route key={r.path} path={r.path} component={component} />
    })}
  </Switch>
}

const App = (props: Props) => {
  if (props.loading) props.refreshCurrentUser();

  return <BrowserRouter>
    <Elements stripe={stripePromise}>
      <Header />
      <Routes {...props} />
      <Footer />
    </Elements>
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