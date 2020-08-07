import React, { useEffect } from 'react';
import {
  FiAlertCircle,
  FiInfo,
  FiCheckCircle,
  FiXCircle
} from 'react-icons/fi';

import { Container } from './styles';
import { ToastMessage, useToast } from '../../../hooks/toast'

interface ToastProps {
  message: ToastMessage;
  toastTimeout?: number;
  style: object;
}

const Toast: React.FC<ToastProps> = ({
  message: { id, type, title, description, timeout },
  toastTimeout = timeout || 3000,
  style,
}) => {
  const { removeToast } = useToast();

  const icons = {
    info: <FiInfo size={24} />,
    success: <FiCheckCircle size={24} />,
    error: <FiAlertCircle size={24} />,
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(id)
    }, toastTimeout)

    return () => clearTimeout(timer);
  },[removeToast, id, toastTimeout]);


  return (
    <Container style={style} type={type || 'info'}>
      {icons[type || 'info']}
      <div>
        <strong>{title}</strong>
        {description && <p>{description}</p>}
      </div>
      <button onClick={() => removeToast(id)}>
        <FiXCircle size={18} />
      </button>
    </Container>
  )
};

export default Toast;
