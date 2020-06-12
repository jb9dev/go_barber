import styled from 'styled-components/native';

import { colors, fontFamilies } from '../../styles/variables';

const { light2 } = colors;

export const Container = styled.View`
  padding-top: 20px;
  align-items: center;
`;

export const Title = styled.Text`
  font-family: ${fontFamilies.medium};
  font-size: 25px;
  color: ${light2};
`;
