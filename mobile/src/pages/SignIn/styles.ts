import styled from 'styled-components/native';

import { colors } from '../../styles/variables';

const { light } = colors;

export const Container = styled.View`
  padding-top: 20px;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 25px;
  color: ${light};
`;
