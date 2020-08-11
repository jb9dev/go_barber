import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

import { colors, fontFamilies } from '../../globalVariables';

export const Container = styled.View`
  flex: 1;
  padding: 0 24px;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  margin-top: 48px;
  font-family: ${fontFamilies.robotoMedium};
  font-size: 32px;
  color: ${colors.light2};
  text-align: center;
`;

export const Description = styled.Text`
  margin-top: 16px;
  font-family: ${fontFamilies.robotoMedium};
  font-size: 18px;
  color: ${colors.lightGrey};
  text-align: center;
`;

export const OkButton = styled(RectButton)`
  margin-top: 24px;
  padding: 12px 24px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: ${colors.primary};
`;

export const OkButtonText = styled.Text`
  font-family: ${fontFamilies.robotoMedium};
  font-size: 18px;
  color: ${colors.secondary};
  text-transform: uppercase;
`;
