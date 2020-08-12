import { FlatList } from 'react-native';
import styled, { css } from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { RectButton } from 'react-native-gesture-handler';
import Provider from '../../interfaces/Provider';

import { colors, fontFamilies } from '../../globalVariables';

interface ProviderContainerProps {
  selected: boolean;
}
interface ProviderNameProps {
  selected: boolean;
}

interface HourProps {
  available: boolean;
  selected: boolean;
}

export const Container = styled.View``;

export const Header = styled.View`
  flex-direction: row;
  padding: 20px;
  padding-top: ${getStatusBarHeight() + 24}px;
  justify-content: space-between;
  align-items: center;
  background-color: ${colors.dark2};
`;

export const BackButton = styled.TouchableOpacity``;

export const HeaderTitle = styled.Text`
  margin-left: 16px;
  font-family: ${fontFamilies.robotoMedium};
  font-size: 20px;
  color: ${colors.light2};
`;

export const UserAvatarContainer = styled.TouchableOpacity`
  width: 58px;
  height: 58px;
  margin-left: auto;
  align-items: center;
  justify-content: center;
  background-color: ${colors.lightGrey};
  border-radius: 29px;
`;

export const UserAvatar = styled.Image`
  width: 58px;
  height: 58px;
  border-radius: 29px;
`;

export const Content = styled.ScrollView``;

export const ProvidersListContainer = styled.View`
  flex-direction: row;
  height: 112px;
`;

export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)`
  padding: 32px 24px;
`;

export const ProviderContainer = styled(RectButton)<ProviderContainerProps>`
  flex-direction: row;
  margin-right: 32px;
  padding: 10px;
  align-items: center;
  background-color: ${(props) =>
    props.selected ? colors.primary : colors.dark2};
  border-radius: 10px;
`;
export const ProviderAvatarContainer = styled.View`
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  background-color: ${colors.lightGrey};
  border-radius: 16px;
`;
export const ProviderAvatar = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`;
export const ProviderName = styled.Text<ProviderNameProps>`
  margin-left: 8px;
  font-family: ${fontFamilies.robotoMedium};
  font-size: 16px;
  color: ${(props) => (props.selected ? colors.dark : colors.light2)};
`;

export const Calendar = styled.View``;

export const Title = styled.Text`
  margin: 0 24px 24px 24px;
  font-family: ${fontFamilies.robotoMedium};
  font-size: 24px;
  color: ${colors.light2};
`;

export const OpenDatePickerButton = styled(RectButton)`
  height: 46px;
  margin: 0 24px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.primary};
  border-radius: 10px;
`;

export const OpenDatePickerButtonText = styled.Text`
  font-family: ${fontFamilies.robotoMedium};
  font-size: 16px;
  color: ${colors.dark};
`;

export const Schedule = styled.View`
  padding: 24px 0 16px 0;
`;

export const Section = styled.View`
  margin-bottom: 16px;
`;

export const SectionTitle = styled.Text`
  margin: 0 24px 12px 24px;
  font-family: ${fontFamilies.robotoMedium};
  font-size: 18px;
  color: ${colors.lightGrey};
`;

export const SectionContent = styled.ScrollView.attrs({
  contentContainerStyle: { paddingHorizontal: 24 },
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})``;

export const Hour = styled(RectButton)<HourProps>`
  margin-right: 8px;
  padding: 12px;
  background-color: ${(props) =>
    props.selected && props.available ? colors.primary : colors.darkGrey};
  border-radius: 10px;
  opacity: ${(props) => (props.available ? 1 : 0.3)};
`;

export const HourText = styled.Text<HourProps>`
  font-family: ${fontFamilies.robotoRegular};
  color: ${(props) =>
    props.selected && props.available ? colors.dark : colors.light2};
`;

export const CreateAppointmentButton = styled(RectButton)`
  height: 50px;
  margin: 0 24px 24px 24px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.primary};
  border-radius: 10px;
`;

export const CreateAppointmentButtonText = styled.Text`
  font-family: ${fontFamilies.robotoMedium};
  font-size: 18px;
  color: ${colors.dark};
`;
