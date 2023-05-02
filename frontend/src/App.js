import { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import Home from './pages/Home';
//import SkyVisualization from './pages/SkyVisualization';
//import SkyVisualization from './pages/trial';
import ObjectInfoModal from './pages/ObjectInfoModal'
import AuthContext from './store/auth-context';
import About from './pages/About';
import Contact from './pages/Contact';

import InterestSelectionPage from './pages/InterestSelectionPage';

const myCache = createCache({ key: 'my-prefix-key' });

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <CacheProvider value={myCache}>
      <Layout>
        <Switch>
          <Route path='/' exact>
            <Home />
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

          <Route path='/infomodal'>
            {authCtx.isLoggedIn && <ObjectInfoModal />}
            {!authCtx.isLoggedIn && <Redirect to='/auth' />}
          </Route>

          {/* <Route path='/visualization' exact>
            <SkyVisualization />
          </Route> */}
          {/*  */}
          <Route path='/about' component={About} />
          <Route path='/contact' component={Contact} />

          <Route path="/interest-selection" component={InterestSelectionPage} />

          <Route path='*'>
            <Redirect to='/' />
          </Route>
        </Switch>
      </Layout>
    </CacheProvider>
  );
}

export default App;
