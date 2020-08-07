import styled from 'styled-components';
import { shade } from 'polished';

import { colors, defaultTransition } from '../../styles/variables';

const { darkGrey, lightGrey, primary } = colors;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;

  header {
    width: 100%;
    height: 144px;
    background-color: ${darkGrey};

    div {
      display: flex;
      width: 100%;
      max-width: 1120px;
      height: 100%;
      margin: 0 auto;
      align-items: center;

      a {
        text-decoration: none;

        @media only screen and (max-width: 768px) {
          padding-left: 20px;
        }

        &:hover {

          svg {
            color: ${primary};
          }
        }

        svg {
          width: 24px;
          height: 24px;
          color: ${lightGrey};
          transition: color ${defaultTransition};
        }
      }
    }
  }

`;

export const Content = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    margin-top: -100px;
    margin-bottom: 60px;

    h1 {
      margin-bottom: 20px;
      font-size: 20px;
      text-align: left;
      font-weight: 500;
    }

    .old_password {
      margin-top: 24px;
    }
  }
`;

export const AvatarInput = styled.div`
  position: relative;
  width: 186px;
  margin-bottom: 32px;
  align-self: center;

  img {
    width: 186px;
    height: 186px;
    border-radius: 50%;
  }

  label {
    position: absolute;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    background-color: ${primary};
    border: 0;
    border-radius: 50%;
    transition: background-color ${defaultTransition};
    cursor: pointer;

    &:hover {
      background-color: ${shade(0.2, primary)};
    }
  }
`;
