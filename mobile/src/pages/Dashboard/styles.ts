import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { colors, fontFamilies } from '../../globalVariables';
import Provider from '../../interfaces/Provider';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 24px;
  padding-top: ${getStatusBarHeight() + 24}px;
  background-color: ${colors.dark2};
`;

export const HeaderTitle = styled.Text`
  font-family: ${fontFamilies.robotoRegular};
  font-size: 20px;
  color: ${colors.light2};
  line-height: 28px;
`;

export const UserName = styled.Text`
  font-family: ${fontFamilies.robotoMedium};
  color: ${colors.primary};
`;

export const ProfileButton = styled.TouchableOpacity``;

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
`;

export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)`
  padding: 32px 24px 16px 24px;
`;

export const ProvidersListTitle = styled.Text`
  margin-bottom: 24px;
  font-family: ${fontFamilies.robotoMedium};
  font-size: 24px;
  color: ${colors.light2};
`;

export const ProviderContent = styled(RectButton)`
  flex-direction: row;
  margin-top: 20px;
  margin-bottom: 16px;
  padding: 20px;
  align-items: center;
  background-color: ${colors.darkGrey};
  border-radius: 10px;
`;

export const ProviderAvatarContainer = styled.View`
  width: 72px;
  height: 72px;
  align-items: center;
  justify-content: center;
  border-radius: 36px;
  background-color: ${colors.lightGrey};
`;

export const ProviderAvatar = styled.Image`
  width: 72px;
  height: 72px;
  border-radius: 36px;
`;

export const ProviderInfo = styled.View`
  flex: 1;
  margin-left: 20px;
`;

export const ProviderName = styled.Text`
  font-family: ${fontFamilies.robotoMedium};
  font-size: 20px;
  color: ${colors.light2};
`;

export const ProviderMeta = styled.View`
  flex-direction: row;
  margin-top: 8px;
  align-items: center;
`;

export const ProviderMetaText = styled.Text`
  margin-left: 8px;
  font-family: ${fontFamilies.robotoRegular};
  color: ${colors.lightGrey};
`;
