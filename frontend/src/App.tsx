import React from 'react';
import { BrowserRouter } from 'react-router-dom'

import AuthContext from './context/AuthContext'
import GlobalStyle from './styles/global';
import Routes from './routes/index'

const App: React.FC = () => (
  <React.Fragment>
    <AuthContext.Provider value={{
      email: 'jean@gmail.com',
      name: 'Jean'
    }}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </AuthContext.Provider>
      <GlobalStyle />
  </React.Fragment>
)

export default App;
