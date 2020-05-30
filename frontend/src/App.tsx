import React from 'react';
import { BrowserRouter } from 'react-router-dom'

import GlobalStyle from './styles/global';
import Routes from './routes/index'

const App: React.FC = () => (
  <React.Fragment>
    <BrowserRouter>
      <Routes />
      <GlobalStyle />
    </BrowserRouter>
  </React.Fragment>
)

export default App;
