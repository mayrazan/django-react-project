import { createGlobalStyle } from "styled-components";
import { colors } from "./colors";

export const GlobalStyle = createGlobalStyle`

*, body{
  margin: 0;
  padding: 0;
}

* {
  list-style: none;
  vertical-align: baseline;
  outline: 0!important;
  box-sizing: border-box;
}

body, html {
  height: 100%;
}

body {
  background-color: ${colors.white};
  color: ${colors.text};
  font-size: 16px;
  font-family: Roboto, Arial, Helvetica, sans-serif;
}

button {
  background: transparent;

  &:hover {
    cursor: pointer;
  }
}

#root {
  height: 100%;
}

a {
  text-decoration: none;
}
`;
