import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
  }

  html {
    font-size: 100%; /* 16px */
  }

  body {
    font-family: 'Pretendard', sans-serif;
    line-height: 1.5;
    font-weight: 400;
    color: var(--color-white);
    background-color: var(--color-black);
    font-size: var(--font-medium);
  }

  p, h1, h2, h3, h4, div, span {
    word-break: keep-all;
  }

  a {
    cursor: pointer;
    text-decoration: none;
    color: var(--color-white);
  }

  img {
    display: block;
  }

  @media (max-width: 768px) {
    /* 데스크탑 이하 디바이스 */
    html {
      font-size: var(--font-medium);
    }
  }
`

export default GlobalStyle
