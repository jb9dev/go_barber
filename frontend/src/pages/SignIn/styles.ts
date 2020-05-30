import styled from 'styled-components';
import { shade } from 'polished';

import { colors } from '../../styles/variables';

import SignInBackground from '../../assets/sign-in-background.png';

const { primary, secondary, dark, grey, light, light2 } = colors;

export const Container = styled.div`
  display: flex;
  height: 100vh;
`;

export const Content = styled.div`
  display: flex;
  width: 100%;
  max-width: 700px;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    margin: 80px 0;

    @media (min-width: 768px) {
      width: 50%;
    }

    h1 {
      margin-bottom: 20px;
      font-size: 24px;
      text-align: center;
      font-weight: 500;
    }

    input, button {
      border-radius: 6px;
    }

    input {
      display: block;
      width: 100%;
      padding: 12px;
      color: ${light};
      background-color: ${dark};
      border: 1px solid ${dark};

      &::placeholder {
        color: ${grey};
      }

      + input {
        margin-top: 10px;
      }
    }

    button {
      width: 100%;
      height: 47px;
      margin-top: 20px;
      padding: 0 16px;
      color: ${secondary};
      font-weight: 500;
      background-color: ${primary};
      border: 0;
      transition: background-color 200ms ease-in;

      &:hover {
        background-color: ${shade(0.2, primary)};
      }
    }

    a[href="forgot-password"] {
      display: block;
      margin-top: 30px;
      color: ${light2};
      text-align: center;
      text-decoration: none;
      transition: color 200ms ease-in;

      &:hover {
        color: ${shade(0.2, light2)};
      }
    }
  }

  a[href="register"] {
    display: flex;
    margin: 0 auto;
    align-items: center;
    color: ${primary};
    text-decoration: none;
    transition: color 200ms ease-in;

    &:hover {
      color: ${shade(0.2, primary)};
    }

    svg {
      margin-right: 16px;
    }
  }
`;

export const BackgroundImg = styled.div`
  display: flex;
  flex: 1;
  background: url(${SignInBackground}) no-repeat;
  background-size: cover;
`;
