import styled from 'styled-components';

import { colors } from '../../styles/variables';

const { lightGrey, light2, dark2, primary } = colors;

export const Container = styled.div`
  background-color: ${dark2};
`;

export const Header = styled.header`
  display: flex;
  max-width: 1120px;
  margin: 0 auto;
  padding: 32px 0;
  align-items: center;

  > img {
    height: 80px;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 80px;
  justify-content: center;
  align-items: center;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  div {
    display: flex;
    margin-left: 15px;
    flex-direction: column;
    line-height: 24px;

    span {
      color: ${light2};
    }

    strong {
      color: ${primary};
    }
  }
`;

export const Logout = styled.button`
  margin-left: auto;
  color: ${lightGrey};
  background: transparent;
  border: 0;
  transition: color 200ms ease-out;

  &:hover {
    color: ${primary};
  }
`;
