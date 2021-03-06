import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

import { colors, fontFamilies } from '../../globalVariables';

export const Container = styled(RectButton)`
  width: 100%;
  height: 60px;
  margin-top: 8px;
  padding: 0 16px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.primary};
  border-radius: 6px;
`;

export const ButtonText = styled.Text`
  font-family: ${fontFamilies.robotoMedium};
  font-size: 18px;
  color: ${colors.secondary};
`;
