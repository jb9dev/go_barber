import { createGlobalStyle } from 'styled-components';

import { colors } from './variables';

const { light, secondary } = colors;

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body, input, button {
    font-family: 'Roboto Slab', Georgia, 'Times New Roman', Times, serif;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }

  body {
    color: ${light};
    background-color: ${secondary};
    -webkit-font-smoothing: antialiased;
  }

  button {
    cursor: pointer;
  }

`;
