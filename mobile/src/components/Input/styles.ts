import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { colors, fontFamilies } from '../../styles/variables';

const { dark, grey, light2 } = colors;

export const Container = styled.View`
  flex-direction: row;
  width: 100%;
  height: 60px;
  margin-bottom: 8px;
  padding: 0 16px;
  justify-content: center;
  align-items: center;
  background-color: ${dark};
  border-radius: 6px;
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
  color: ${grey};
`;

export const InputText = styled.TextInput`
  flex: 1;
  font-family: ${fontFamilies.regular};
  font-size: 16px;
  color: ${light2};
`;
