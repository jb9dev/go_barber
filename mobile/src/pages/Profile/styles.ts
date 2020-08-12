import styled from 'styled-components/native';
import { Platform } from 'react-native';

import { colors, fontFamilies } from '../../globalVariables';

export const Container = styled.View`
  flex: 1;
  margin-bottom: ${Platform.OS === 'android' ? 150 : 40}px;
  padding: 20px;
  justify-content: center;
`;

export const BackButton = styled.TouchableOpacity`
  margin-top: 40px;
`;

export const AvatarImageButton = styled.TouchableOpacity``;

export const AvatarImage = styled.Image`
  width: 186px;
  height: 186px;
  margin-top: 32px;
  align-self: center;
  border-radius: 98px;
`;

export const Title = styled.Text`
  margin: 24px 0;
  font-family: ${fontFamilies.robotoMedium};
  font-size: 20px;
  color: ${colors.light2};
`;
