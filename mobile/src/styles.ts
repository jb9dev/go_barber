import styled from 'styled-components';

import { colors } from './styles/variables';

const { light, secondary } = colors;

export const Container = styled.view`
  background: ${secondary};
`;

export const Title = styled.text`
  color: ${light};
`;
