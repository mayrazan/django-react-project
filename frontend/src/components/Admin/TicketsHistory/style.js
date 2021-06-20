import { Paper, TableContainer, TableRow } from "@material-ui/core";
import styled from "styled-components";

export const TableRowStyled = styled(TableRow)`
  cursor: pointer;
`;

export const PaperRootStyled = styled(Paper)`
  width: 100%;
`;

export const TableContainerStyled = styled(TableContainer)`
  max-height: 440px;
`;

export const BtnContainerStyled = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  .link {
    color: white;
    text-decoration: none;
  }
`;

export const SearchContainerStyled = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;
