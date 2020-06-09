import styled, { css } from 'styled-components';
import { animated } from 'react-spring';

import { colors } from '../../../styles/variables';

interface ContainerProps {
  type: 'info' | 'success' | 'error';
}

const {
  blackHighTransparence,
  blue,
  green,
  lightestBlue,
  lightestGreen,
  lightestRed,
  red,
} = colors;

const toastTypeStyle = {
  info: css`
    color: ${blue};
    background: ${lightestBlue};
  `,
  success: css`
    color: ${green};
    background: ${lightestGreen};
  `,
  error: css`
    color: ${red};
    background: ${lightestRed};
  `,
}

export const Container = styled(animated.div)<ContainerProps>`
  position: relative;
  display: flex;
  width: 360px;
  padding: 16px;
  padding-right: 30px;
  border-radius: 10px;
  box-shadow: 2px 2px 8px ${blackHighTransparence};

  ${props => toastTypeStyle[props.type || 'info']}

  & + div {
    margin-top: 8px;
  }

  > svg {
    margin-right: 10px;
  }

  div {
    flex: 1;

    p {
      margin-top: 4px;
      font-size: 14px;
      line-height: 20px;
      opacity: 0.8;
    }
  }

  button {
    position: absolute;
    top: 50%;
    right: 8px;
    color: inherit;
    background: transparent;
    border: 0;
    transform: translateY(-50%);
  }
`;
