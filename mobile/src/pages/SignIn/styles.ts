import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import { colors, fontFamilies } from '../../styles/variables';

const { dark, light2, primary, secondary } = colors;

export const Container = styled.View`
  flex: 1;
  margin-bottom: ${Platform.OS === 'android' ? 150 : 40}px;
  padding: 0 20px;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  margin: 64px 0 16px;
  font-family: ${fontFamilies.medium};
  font-size: 25px;
  color: ${light2};
`;

export const ForgotPassword = styled.TouchableOpacity`
  margin-top: 16px;
  padding: 16px;
`;

export const ForgotPasswordText = styled.Text`
  font-family: ${fontFamilies.medium};
  font-size: 16px;
  color: ${light2};
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
  background-color: ${secondary};
  border-top-width: 1px;
  border-top-color: ${dark};
`;

export const CreateAccoutText = styled.Text`
  margin-left: 16px;
  font-family: ${fontFamilies.medium};
  font-size: 16px;
  color: ${primary};
`;
