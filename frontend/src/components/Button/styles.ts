import styled from 'styled-components';
import { shade } from 'polished';

import { colors } from '../../styles/variables';

const { primary, secondary, grey } = colors;

export const Container = styled.button`
  width: 100%;
  height: 47px;
  margin-top: 20px;
  padding: 0 16px;
  color: ${secondary};
  font-weight: 500;
  background-color: ${primary};
  border: 0;
  border-radius: 6px;
  transition: background-color 200ms ease-in;

  &:hover {
    background-color: ${shade(0.2, primary)};
  }

  &:disabled {
    background-color: ${grey};
  }
`;
