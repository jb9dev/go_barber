import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';

import { colors, fontFamilies } from '../../globalVariables';

const { light2 } = colors;

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-family: ${fontFamilies.medium};
  font-size: 30px;
  color: ${light2};
`;

export const Logout = styled(Icon)`
  margin-top: 15px;
  color: ${light2};
`;
