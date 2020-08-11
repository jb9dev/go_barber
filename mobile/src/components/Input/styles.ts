import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { colors, fontFamilies } from '../../globalVariables';

interface ContainerProps {
  isFocused: boolean;
  hasError: boolean;
}

export const Container = styled.View<ContainerProps>`
  flex-direction: row;
  width: 100%;
  height: 60px;
  margin-bottom: 8px;
  padding: 0 16px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.dark};
  border-width: 1px;
  border-color: ${colors.dark};
  border-radius: 6px;

  ${(props) =>
    props.hasError &&
    css`
      border-color: ${colors.red};
    `}

  ${(props) =>
    props.isFocused &&
    css`
      border-color: ${colors.primary};
    `}
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;

export const InputText = styled.TextInput`
  flex: 1;
  font-family: ${fontFamilies.robotoRegular};
  font-size: 16px;
  color: ${colors.light2};
`;
