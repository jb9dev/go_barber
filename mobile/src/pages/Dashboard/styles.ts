import styled from 'styled-components/native';

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
