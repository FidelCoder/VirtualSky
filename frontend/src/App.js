import { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import SkyVisualization from './pages/SkyVisualization';
import AuthContext from './store/auth-context';
//import Dashboard from './pages/Dashboard';

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        {!authCtx.isLoggedIn && (
          <Route path='/auth'>
            <AuthPage />
          </Route>
        )}
        <Route path='/profile'>
          {authCtx.isLoggedIn && <UserProfile />}
          {!authCtx.isLoggedIn && <Redirect to='/auth' />}
        </Route>

        {/* <Route path='/SkyVisualization'>
          {authCtx.isLoggedIn && <SkyVisualization />}
          {!authCtx.isLoggedIn && <Redirect to='/visual' />}
        </Route> */}

        <Route path='/visualization' exact>
          <SkyVisualization />
        </Route>

        {/* <Route path='*'>
          <Redirect to='/' />
        </Route> */}
      </Switch>
    </Layout>
  );
}

export default App;
