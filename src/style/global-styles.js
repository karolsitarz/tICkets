import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Work+Sans:400,600&display=swap&subset=latin-ext');

  *,
  ::after,
  ::before {
    box-sizing: border-box;
    position: relative;
    font-family: 'Work Sans', 'Helvetica', 'Helvetica Neue', sans-serif;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    -webkit-tap-highlight-color: transparent;
  }
  *:not(input) {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  html, body, #root {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    overscroll-behavior: contain;
  }
  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    padding: 0;
  }
  p, th, td, li, dd, dt, ul, ol, blockquote, q, acronym, abbr, a, input, select, textarea {
    margin: 0;
    padding: 0;
  }
  :focus {
    outline: none;
  }
  #container {
    width: 100%;
    height: 100%;
  }
  svg {
    width: 100%;
    height: 100%;
  }

  ::-webkit-scrollbar {
    width: 0 !important;
    height: 0 !important;
  }
  :root {
    letter-spacing: -.05em;
    color: #333;
  }
`;
