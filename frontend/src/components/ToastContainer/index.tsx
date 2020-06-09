import React from 'react';
import { useTransition } from 'react-spring';

import { ToastMessage } from '../../hooks/toast'

import { Container } from './styles'
import Toast from './Toast';

interface ToastContainerProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const messageWithTransition = useTransition(
    messages,
    (message) => message.id,
    {
      from: { right: '-110%' },
      enter: { right: '0%' },
      leave: { right: '-110%' },
    }
  )

  return (
    <Container>
      {messageWithTransition.map(({ key, item, props }) => (
        <Toast
          key={key}
          style={props}
          message={item}
        />
      ))}
    </Container>
  );
}

export default ToastContainer;
