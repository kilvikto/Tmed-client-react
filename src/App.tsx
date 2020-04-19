import React from 'react';
import RouteContainer from 'routes/RouteContainer';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    min-height: 100vh;
    padding: 0;
    margin: 0;
    font-family: Arial, Helvetica, sans-serif;
  }

  #root {
    box-sizing: border-box;
    min-height: 100vh;
  }
`;

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle/>
      <RouteContainer />
    </>
  );
};

export default App;
