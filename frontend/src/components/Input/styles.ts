import styled, { css } from 'styled-components';

import { colors } from '../../styles/variables';

const { dark, grey, light, primary } = colors;

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  width: 100%;
  padding: 12px;
  justify-content: center;
  align-items: center;
  color: ${grey};
  background-color: ${dark};
  border: 1px solid ${dark};
  border-radius: 6px;

  ${ ({ isFocused }) => isFocused && css`
    border-color: ${primary};
  `}

  ${ ({ isFilled, isFocused }) => (isFocused || isFilled) && css`
    color: ${primary};
  `}

  + div {
    margin-top: 10px;
  }

  input {
    display: flex;
    flex: 1;
    color: ${light};
    background-color: transparent;
    border: 0;

    &::placeholder {
      color: ${grey};
    }
  }

  svg {
    margin-right: 16px;
  }

`;
