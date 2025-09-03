import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    font-family: sans-serif;
    background-color: #f4f7f6;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  #root {
    max-width: 960px;
    margin: 0 auto;
    padding: 2rem;
  }
`;