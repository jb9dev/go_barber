import styled from 'styled-components/native';

import { colors } from '../../globalVariables';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: 30px;
  color: ${colors.light};
`;
