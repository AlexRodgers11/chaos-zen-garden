import React from 'react';
import './App.css';

import Garden from './Garden';
import useToggle from './hooks/useToggle';

function App() {
  const [loggedIn, toggleLoggedIn] = useToggle(false);

  return (
    <div className="App">
      <Garden loggedIn={loggedIn} toggleLoggedIn={toggleLoggedIn} />
    </div>
  );
}

export default App;
