import React, { useRef, useEffect, useCallback, useState, useImperativeHandle, forwardRef } from 'react';
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

const { grey, primary } = colors;

const Input: React.RefForwardingComponent<InputRef, InputProps> = ({ name, icon, placeholder, ...rest }, ref) => {
  const inputElementRef = useRef<any>(null);
  const { registerField, fieldName, defaultValue = '', error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue});
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, [])

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputValueRef.current.value);
  }, [])

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
    <Container isFocused={isFocused} hasError={!!error}>
      <Icon
        name={icon}
        size={20}
        color={isFocused || isFilled ? primary : grey}
      />
      <InputText
        ref={inputElementRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
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
