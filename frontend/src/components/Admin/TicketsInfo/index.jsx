import { Typography } from "@material-ui/core";
import { ContainerTicketStyled } from "./style";
import TableContent from "../../shared/TableContent";

const TicketsInfo = () => {
  return (
    <>
      <Typography variant="h4">Ticket</Typography>
      <ContainerTicketStyled>
        <input></input>
        <TableContent type={1} />
      </ContainerTicketStyled>
    </>
  );
};

export default TicketsInfo;
