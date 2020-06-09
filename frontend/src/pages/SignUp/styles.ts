import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

import { colors } from '../../styles/variables';

import SignUpBackground from '../../assets/sign-up-background.png';

const { light2 } = colors;

const appearFromRight = keyframes`
  from {
    transform: translateX(50px);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

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
`;

export const AnimationContainer = styled.div`
  display: flex;
  width: 80%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${appearFromRight} 1s ease-out;

  form {
  margin: 60px 0;

  @media (min-width: 768px) {
    width: 50%;
  }

  h1 {
    margin-bottom: 20px;
    font-size: 24px;
    text-align: center;
    font-weight: 500;
  }

  a.forgot-password {
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

a.back-to-logon {
  display: flex;
  margin: 0 auto;
  align-items: center;
  color: ${light2};
  text-decoration: none;
  transition: color 200ms ease-in;

  &:hover {
    color: ${shade(0.2, light2)};
  }

  svg {
    margin-right: 16px;
  }
}
`;

export const BackgroundImg = styled.div`
  display: flex;
  flex: 1;
  background: url(${SignUpBackground}) no-repeat;
  background-size: cover;
`;
