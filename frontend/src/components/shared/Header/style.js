import { Typography } from "@material-ui/core";
import styled from "styled-components";

export const ContainerProfileStyled = styled.div`
  display: flex;
  align-items: center;
`;

export const TitleStyled = styled(Typography)`
  && {
    flex-grow: 1;
  }
`;

export const TextStyled = styled(Typography)`
  && {
    font-size: inherit;
  }
`;
