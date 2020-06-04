import styled from 'styled-components';

import { colors } from '../../styles/variables'

const { primary, secondary } = colors;

export const Container = styled.div`
  position: relative;

  span {
    position: absolute;
    width: 160px;
    padding: 10px;
    bottom: 30px;
    left: 50%;
    font-size: 12px;
    color: ${secondary};
    background: ${primary};
    border-radius: 6px;
    opacity: 0;
    visibility: hidden;
    transform: translateX(-50%);
    transition: opacity 400ms ease-in;

    &::after {
      content: '';
      display: block;
      position: absolute;
      top: calc(100% - 2px);
      left: 50%;
      width: 10px;
      height: 10px;
      background: ${primary};
      transform: rotate(45deg) translateX(-50%);
    }
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;
