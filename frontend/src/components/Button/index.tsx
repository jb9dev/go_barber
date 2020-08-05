import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, loading, ...otherProps }) => (
  <Container
    disabled={ loading && loading}
    type="button"
    {...otherProps}
  >
    {loading ? 'carregando...' : children}
  </Container>
);

export default Button;
