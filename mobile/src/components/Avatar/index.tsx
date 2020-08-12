import React, { useCallback, useMemo } from 'react';
import Icon from 'react-native-vector-icons/Feather';

import { colors } from '../../globalVariables';
import { Container, AvatarImage } from './styles';

interface AvatarProps {
  callback?(): void;
  size: number;
  imgSrc: string;
}

const Avatar: React.FC<AvatarProps> = ({ callback, size, imgSrc }, ...rest) => {
  const handleAvatarPressed = useCallback(() => {
    callback && callback();
  }, [callback]);

  const iconSize = useMemo(() => {
    return size / 3;
  }, [size]);

  return (
    <Container onPress={handleAvatarPressed} size={size} {...rest}>
      {imgSrc ? (
        <AvatarImage source={{ uri: imgSrc }} size={size} />
      ) : (
        <Icon name="camera" size={iconSize} color={colors.darkGrey} />
      )}
    </Container>
  );
};

export default Avatar;
