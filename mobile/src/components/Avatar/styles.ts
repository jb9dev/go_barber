import styled from 'styled-components/native';
import { colors } from '../../globalVariables';

interface AvatarProps {
  size: number;
}

export const Container = styled.TouchableOpacity<AvatarProps>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  border-radius: ${(props) => props.size / 2}px;
  background-color: ${colors.lightGrey};
`;

export const AvatarImage = styled.Image<AvatarProps>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: ${(props) => props.size / 2}px;
`;
