import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import { colors, fontFamilies } from '../../globalVariables';

export const Container = styled.View`
  flex: 1;
  margin-bottom: ${Platform.OS === 'android' ? 130 : 40}px;
  padding: 0 20px;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  margin: 40px 0 16px;
  font-family: ${fontFamilies.robotoMedium};
  font-size: 25px;
  color: ${colors.light2};
`;

export const ForgotPassword = styled.TouchableOpacity`
  margin-top: 16px;
  padding: 16px;
`;

export const ForgotPasswordText = styled.Text`
  font-family: ${fontFamilies.robotoMedium};
  font-size: 16px;
  color: ${colors.light2};
`;

export const CreateAccount = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  flex-direction: row;
  padding: 16px 0 ${16 + getBottomSpace()}px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.secondary};
  border-top-width: 1px;
  border-top-color: ${colors.dark};
`;

export const CreateAccoutText = styled.Text`
  margin-left: 16px;
  font-family: ${fontFamilies.robotoMedium};
  font-size: 16px;
  color: ${colors.primary};
`;
