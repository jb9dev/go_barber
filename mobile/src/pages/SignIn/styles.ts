import styled from 'styled-components/native';

import { colors } from '../../styles/variables';

const { light2 } = colors;

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  margin: 64px 0 16px;
  font-family: 'RobotoSlab-Medium';
  font-size: 25px;
  color: ${light2};
`;
