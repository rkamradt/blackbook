import React from 'react';
import './App.css';
import { useAuth0 } from '@auth0/auth0-react';
import { useAuth } from './auth';

const App = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const [authenticated, user] = useAuth();
  return (
    <div className="App">
      <header className="App-header">
        {isAuthenticated !== undefined && (
          <button
            onClick={() => isAuthenticated
              ? logout({ logoutParams: { returnTo: window.location.origin } })
              : loginWithRedirect()}
            className="App-link"
          >
            Log {isAuthenticated ? 'out' : 'in'}
          </button>
        )}
        {user !== null && (
          <p>{JSON.stringify(user)}
          </p>
        )}
      </header>
    </div>
  );
};

export default App;
