import React from 'react';
import './App.css';
import { useAuth0 } from '@auth0/auth0-react';
import { useAuth } from './auth';
import Profile from './Profile';

const App = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const [, user, setUser, accessToken] = useAuth();

  return (
    <div className="App">
      <nav className="App-nav">
        <span className="App-title">Blackbook</span>
        {isAuthenticated !== undefined && (
          <button
            onClick={() => isAuthenticated
              ? logout({ logoutParams: { returnTo: window.location.origin } })
              : loginWithRedirect()}
            className="btn-nav"
          >
            Log {isAuthenticated ? 'out' : 'in'}
          </button>
        )}
      </nav>
      <main className="App-main">
        {!isAuthenticated && (
          <div className="App-welcome">
            <h1>Welcome to Blackbook</h1>
            <p>Please log in to view your profile.</p>
            <button onClick={() => loginWithRedirect()} className="btn-primary">Log in</button>
          </div>
        )}
        {isAuthenticated && !user && (
          <p className="App-loading">Loading profile...</p>
        )}
        {isAuthenticated && user && (
          <Profile user={user} accessToken={accessToken} onUpdate={setUser} />
        )}
      </main>
    </div>
  );
};

export default App;
