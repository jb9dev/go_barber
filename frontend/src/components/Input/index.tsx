import React, {
   InputHTMLAttributes,
   useRef,
   useEffect,
   useState,
   useCallback
} from 'react';
import { useField } from '@unform/core';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';

import { colors } from '../../styles/variables'
import { Container, Error } from './styles';


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
}


const Input: React.FC<InputProps> = ({ name, icon: Icon,...props }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const { fieldName, defaultValue, error, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });

  }, [fieldName, registerField])

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);
  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputRef.current?.value);
  }, []);

  return (
    <Container
      className={name}
      hasError={!!error}
      isFocused={isFocused}
      isFilled={isFilled}
    >
      { Icon && <Icon /> }
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...props}
      />
      { error && <Error title={error}>
        <FiAlertCircle color={colors.red} size={20} />
      </Error> }
    </Container>
  )
};

export default Input;
