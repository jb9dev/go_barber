import styled from 'styled-components/native';

import { colors } from './styles/variables';

const { light, secondary } = colors;

export const Container = styled.View`
  flex: 1;
  background: ${secondary};
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: 30px;
  color: ${light};
`;
