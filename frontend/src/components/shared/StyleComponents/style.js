import styled from "styled-components";

import { colors } from "../../../styles/colors";

export const ContainerStyled = styled.div`
  background-color: ${colors.white};
  width: 100%;
`;

export const HeaderFooterContainer = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const ContainerBtnStyled = styled.div`
  display: flex;
  width: fit-content;
`;

export const ContainerHomeStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

export const ContainerWelcomeStyled = styled.div`
  width: 100%;
  height: 25%;
  background-color: ${colors.white};
  display: flex;
  align-items: center;
`;

export const ContainerMainStyled = styled.div`
  background-color: ${colors.white};
  width: 100%;
`;
