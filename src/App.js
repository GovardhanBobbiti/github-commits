import React, { useState } from 'react';
import CommitsPage from './components/commits';
import TokenInput from './components/tokeninput';
import './App.css';

function App() {

  const token = localStorage.getItem('access-token');
  const [accessToken, setAccessToken] = useState(token);

  const handleToken = (token) => {
    setAccessToken(token);
    localStorage.setItem('access-token', token);
  }

  return (
    <div className="App">
      {
        accessToken ? <CommitsPage accessToken={accessToken} /> : <TokenInput handleToken={handleToken} />
      }
    </div>
  );
}

export default App;
