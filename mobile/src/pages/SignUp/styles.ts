import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import { colors, fontFamilies } from '../../globalVariables';

export const Container = styled.View`
  flex: 1;
  margin-bottom: ${Platform.OS === 'android' ? 150 : 40}px;
  padding: 20px;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  margin: 64px 0 16px;
  font-family: ${fontFamilies.medium};
  font-size: 25px;
  color: ${colors.light2};
`;

export const GoBack = styled.TouchableOpacity`
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

export const GoBackText = styled.Text`
  margin-left: 16px;
  font-family: ${fontFamilies.medium};
  font-size: 16px;
  color: ${colors.light2};
`;
