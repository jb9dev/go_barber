import React from 'react';
import { FiAlertCircle, FiXCircle } from 'react-icons/fi';

import { Container, Toast } from './styles'

const ToastContainer: React.FC = () => (
  <Container>
    <Toast>
      <FiAlertCircle size={20} />
      <div>
        <strong>Login inválido</strong>
        <p>Ocorreu um erro ao efetuar o login</p>
      </div>
      <button>
        <FiXCircle size={18} />
      </button>
    </Toast>
    <Toast type="success">
      <FiAlertCircle size={20} />
      <div>
        <strong>Login inválido</strong>
        <p>Ocorreu um erro ao efetuar o login</p>
      </div>
      <button>
        <FiXCircle size={18} />
      </button>
    </Toast>
    <Toast type="error">
      <FiAlertCircle size={20} />
      <div>
        <strong>Login inválido</strong>
        <p>Ocorreu um erro ao efetuar o login</p>
      </div>
      <button>
        <FiXCircle size={18} />
      </button>
    </Toast>
  </Container>
);

export default ToastContainer;
