import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  useHistory
} from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import api, { API_KEY } from '../services/api';
import Login from './auth/Login';
import Dashboard from './dashboard';
import AppNavbar from './shared/layouts/AppNavbar';
import AppSidebar from './shared/layouts/AppSidebar';
import Welcome from './Welcome';
const MasterComponent = React.lazy(() => import('./master'));

export const MySwal = withReactContent(Swal);

export default function App() {
  return (
    <ProvideApp>
      <BrowserRouter>
        <main>
          <AuthButton />

          <Switch>
            <Route exact path="/">
              <Welcome />
            </Route>

            <Route path="/auth/login">
              <Login />
            </Route>
            
            <PrivateRoute path="/dashboard">
              <Dashboard />
            </PrivateRoute>

            <PrivateRoute path="/master">
              <React.Suspense fallback={false}>
                <MasterComponent />
              </React.Suspense>
            </PrivateRoute>

            <Redirect to="/dashboard" />
          </Switch>
        </main>
      </BrowserRouter>
    </ProvideApp>
  )
}

const fakeAuth = {
  isAuthenticated: false,
  signin(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

const AppContext = React.createContext({});

export const useApp = () => React.useContext(AppContext);

function ProvideApp({ children }) {
  const [loadingConfig, setLoadingConfig] = React.useState(true);
  const [config, setConfig] = React.useState(null);
  const [loadingUser, setLoadingUser] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [loadingRefer, setLoadingRefer] = React.useState(false);
  const [refer, setRefer] = React.useState(null);

  const fetchConfig = async () => {
    setLoadingConfig(true);
    try {
      const { data } = await api.get(`/konfigurasi`);
      setConfig(data);
      setLoadingConfig(false);
    } catch (error) {
      setLoadingConfig(false);
      console.log(error);
    }
  }

  const fetchUser = async () => {
    setLoadingUser(true);
    try {
      const token = JSON.parse(localStorage.getItem(API_KEY));
      api.defaults.headers.Authorization = `Bearer ${token}`;

      const { data } = await api.get(`/auth/me`);
      setUser(data);
      setLoadingUser(false);
      fetchRefer();
    } catch (error) {
      setLoadingUser(false);
      localStorage.removeItem(API_KEY);
      setUser(null);
      console.log(error);
    }
  }

  const fetchRefer = async () => {
    setLoadingRefer(true);
    try {
      const { data } = await api.get(`/refer`);
      setRefer(data);
      setLoadingRefer(false);
    } catch (error) {
      setLoadingRefer(false);
      console.log(error);
    }
  }

  const signin = cb => {
    return fakeAuth.signin(() => {
      fetchUser();
      cb();
    });
  };

  const signout = cb => {
    return fakeAuth.signout(async () => {
      await api.post(`/auth/logout`, null);

      localStorage.removeItem(API_KEY);
      setUser(null);
      delete api.defaults.headers.Authorization;
      cb();
    });
  };

  React.useEffect(() => {
    fetchConfig();

    const token = !!localStorage.getItem(API_KEY);
    if (token) {
      fetchUser();
    }
  }, []);

  if (loadingConfig) {
    return <div className="fullscreen-wrapper centered">Loading config...</div>;
  }

  if (loadingUser) {
    return <div className="fullscreen-wrapper centered">Loading user...</div>;
  }

  if (loadingRefer) {
    return <div className="fullscreen-wrapper centered">Loading refers...</div>;
  }

  return (
    <AppContext.Provider 
      value={{
        config,
        user,
        refer,
        signin,
        signout
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

function AuthButton() {
  const history = useHistory();
  const { user, signout } = useApp();

  return !!user ? (
    <React.Fragment>
      <AppNavbar onLogout={() => signout(() => history.push("/"))} />
      <AppSidebar />
    </React.Fragment>
  ) : false
}

export function PrivateRoute({ children, ...rest }) {
  const { user } = useApp();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !!user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/auth/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}


if (document.getElementById('app')) {
  const container = document.getElementById('app');
  const root = createRoot(container);
  root.render(<App />);
}
