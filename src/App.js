import React from 'react';
import './App.css';
import { withAuth } from '@okta/okta-react';
import { useAuth } from './auth';

const App = withAuth(({ auth }) => {
  const [authenticated, user] = useAuth(auth);
  return (
    <div className="App">
      <header className="App-header">
        {authenticated !== null && (
          <button
            onClick={() => authenticated ? auth.logout() : auth.login()}
            className="App-link"
          >
            Log {authenticated ? 'out' : 'in'}
          </button>
        )}
        {user !== null && (
          <p>{JSON.stringify(user)}
          </p>
        )}
      </header>
    </div>
  );
});

export default App;
