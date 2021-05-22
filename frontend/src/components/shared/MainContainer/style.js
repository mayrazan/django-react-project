import styled from "styled-components";
import { device } from "../../../styles/medias";
import { colors } from "../../../styles/colors";

export const MainContainerStyled = styled.div`
  background-color: ${colors.background};
  width: 100%;
  height: calc(100% - 64px);
  padding: 1.563rem 1rem 0 15.938rem;

  @media ${device.maxXs} {
    padding: 0;
  }
`;
