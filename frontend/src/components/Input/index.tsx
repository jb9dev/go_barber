import React, { InputHTMLAttributes, useRef, useEffect } from 'react';
import { useField } from '@unform/core';
import { IconBaseProps } from 'react-icons';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}


const Input: React.FC<InputProps> = ({ name, icon: Icon,...props }) => {
  const inputRef = useRef(null)
  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });

  }, [fieldName, registerField])


  return (
    <Container>
      { Icon && <Icon /> }
      <input defaultValue={defaultValue} ref={inputRef} {...props} />
    </Container>
  )
};

export default Input;
