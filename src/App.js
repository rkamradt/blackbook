import React from 'react';
import logo from './logo.svg';
import './App.css';
import { withAuth } from '@okta/okta-react';
import { useAuth } from './auth';

const App = withAuth(({ auth }) => {
  const [authenticated, user] = useAuth(auth);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {authenticated !== null && (
          <button
            onClick={() => authenticated ? auth.logout() : auth.login()}
            className="App-link"
          >
            Log {authenticated ? 'out' : 'in'}
          </button>
        )}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
});

export default App;
