import styled from "styled-components";
import { device } from "../../../styles/medias";

export const MainContainerStyled = styled.div`
  background-color: #dfe9f5;
  width: 100%;
  height: calc(100% - 64px);
  padding: 1.563rem 0 0 15.938rem;

  @media ${device.maxXs} {
    padding: 0;
  }
`;
