import React, { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';

import { Container, Icon, InputText } from './styles';

import { colors }  from '../../styles/variables';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const { grey } = colors;

const Input: React.RefForwardingComponent<InputRef, InputProps> = ({ name, icon, placeholder, ...rest }, ref) => {
  const inputElementRef = useRef<any>(null);
  const { registerField, fieldName, defaultValue = '', error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue});

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current?.focus()
    }
  }));

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    })
  }, [registerField, fieldName])

  return (
    <Container>
      <Icon name={icon} color={grey} size={20} />
      <InputText
        ref={inputElementRef}
        onChangeText={(value) => {
          inputValueRef.current.value = value;
        }}
        defaultValue={defaultValue}
        keyboardAppearance="dark"
        placeholderTextColor={grey}
        placeholder={placeholder}
        {...rest}
      />
    </Container>
  )
};

export default forwardRef(Input);
