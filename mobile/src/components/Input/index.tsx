import React from 'react';
import { TextInputProps } from 'react-native';

import { Container, Icon, InputText } from './styles';

import { colors }  from '../../styles/variables';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

const { grey } = colors;

const Input: React.FC<InputProps> = ({ name, icon, placeholder, ...rest }) => {

  return (
    <Container>
      <Icon name={icon} color={grey} size={20} />
      <InputText
        keyboardAppearance="dark"
        placeholderTextColor={grey}
        placeholder={placeholder}
        {...rest}
      />
    </Container>
  )
};

export default Input;
