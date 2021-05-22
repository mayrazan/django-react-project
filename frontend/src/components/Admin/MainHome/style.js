import styled from "styled-components";
import { colors } from "../../../styles/colors";
import { device } from "../../../styles/medias";

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

export const ContainerUsersStyled = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${colors.white};
  display: flex;
  align-items: center;
  margin-right: 1.9rem;
`;

export const ContainerDisplayStyled = styled.div`
  // height: 20%;
  // width: 50%;
  display: flex;
  padding-top: 2.5rem;
  box-sizing: border-box;
  justify-content: space-between;

  @media ${device.maxXs} {
    width: 100%;
  }

  @media ${device.maxSm} {
    flex-direction: column;
  }
`;
