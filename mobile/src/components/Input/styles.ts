import styled,  { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { colors, fontFamilies } from '../../globalVariables';

interface ContainerProps {
  isFocused: boolean;
  hasError: boolean;
}

const { dark, grey, light2, primary, red } = colors;

export const Container = styled.View<ContainerProps>`
  flex-direction: row;
  width: 100%;
  height: 60px;
  margin-bottom: 8px;
  padding: 0 16px;
  justify-content: center;
  align-items: center;
  background-color: ${dark};
  border-width: 1px;
  border-color: ${dark};
  border-radius: 6px;

  ${(props) => props.hasError && css`
    border-color: ${red};
  `}

  ${(props) => props.isFocused && css`
    border-color: ${primary};
  `}
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;

export const InputText = styled.TextInput`
  flex: 1;
  font-family: ${fontFamilies.regular};
  font-size: 16px;
  color: ${light2};
`;
