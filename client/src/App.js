import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import './App.css';
import ContextState from './context_state_config';
import Loading from './Loading'

// fontawesome
import initFontAwesome from "./utils/initFontAwesome";
initFontAwesome();

function App() {
  const { isLoading, error } = useAuth0();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ContextState>

    </ContextState>

  );
};

export default App;
