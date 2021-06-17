import { Paper, TableContainer, TableRow } from "@material-ui/core";
import styled from "styled-components";

export const PaperContainer = styled(Paper)`
  width: 100%;
`;

export const TableContainerStyled = styled(TableContainer)`
  max-height: 440px;
`;

export const TableRowStyled = styled(TableRow)`
  cursor: pointer;
`;

export const BtnContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  .link-btn {
    color: white;
  }
`;
