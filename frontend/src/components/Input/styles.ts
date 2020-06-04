import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

import { colors } from '../../styles/variables';

const { dark, grey, light, primary, red } = colors;

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  hasError: boolean;
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

  ${ ({hasError}) => hasError && css`
    border-color: ${red};
  `}

  ${ ({ isFocused }) => isFocused && css`
    border-color: ${primary};
  `}

  ${ ({ isFilled, isFocused }) => (isFocused || isFilled) && css`
    color: ${primary};
  `}

  + div {
    margin-top: 10px;
  }

  svg {
    margin-right: 16px;
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

`;

export const Error = styled(Tooltip)`
  height: 20px;

  svg {
    margin: 0;
  }

  span, span::after {
    background: ${red};
  }

  span {
    color: ${light};
  }
`;
