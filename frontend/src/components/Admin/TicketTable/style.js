import { Button, Paper, TableContainer, TableRow } from "@material-ui/core";
import styled from "styled-components";

export const PaperRootStyled = styled(Paper)`
  width: 100%;
`;

export const TableContainerStyled = styled(TableContainer)`
  max-height: 440px;
`;

export const TableRowStyled = styled(TableRow)`
  cursor: pointer;
  vertical-align: baseline !important;
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

export const BtnStyled = styled(Button)`
  margin-right: 0.5rem !important;
`;

export const CountStatusContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  box-shadow: 0px 0px 3px 0px #c5c6c0;
  border-radius: 5px;
  flex-wrap: wrap;
  padding: 0.8rem;
  background-color: #f8f8f8;
  margin: 0 0.5rem;
`;
