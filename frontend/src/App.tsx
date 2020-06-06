import React from 'react';
import { BrowserRouter } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext'
import GlobalStyle from './styles/global';
import Routes from './routes/index'

const App: React.FC = () => (
  <React.Fragment>
    <AuthProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </AuthProvider>
      <GlobalStyle />
  </React.Fragment>
)

export default App;
