import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { colors, fontFamilies } from '../../globalVariables';

const { dark2, light2, primary } = colors;

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 24px;
  padding-top: ${getStatusBarHeight() + 24}px;
  background-color: ${dark2};
`;

export const HeaderTitle = styled.Text`
  font-family: ${fontFamilies.regular};
  font-size: 20px;
  color: ${light2};
  line-height: 28px;
`;

export const UserName = styled.Text`
  font-family: ${fontFamilies.medium};
  color: ${primary};
`;

export const ProfileButton = styled.TouchableOpacity``;

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
`;
