import React from 'react';
import { BrowserRouter } from 'react-router-dom'

import GlobalStyle from './styles/global';
import Routes from './routes/index'
import ToastContainer from './components/ToastContainer'

const App: React.FC = () => (
  <React.Fragment>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
    <GlobalStyle />
  </React.Fragment>
)

export default App;
