import styled from 'styled-components';

import { colors } from '../../styles/variables';

const { light, red } = colors;

export const Container = styled.div`
  display: flex;
  padding-top: 20px;
  align-items: center;
  justify-content: space-around;

  button {
    color: ${light};
    background: transparent;
    border: 0;
    transition: color 200ms ease-out;

    &:hover {
      color: ${red};
    }
  }
`;
