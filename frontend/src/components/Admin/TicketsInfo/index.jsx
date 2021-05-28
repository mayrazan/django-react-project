import { Typography } from "@material-ui/core";
import { ContainerTicketStyled } from "./style";
import { TicketsTable } from "../TicketTable";
import { columnTickets } from "../../../mocks/tableList";

const TicketsInfo = () => {
  return (
    <>
      <Typography variant="h4">Ticket</Typography>
      <ContainerTicketStyled>
        <input></input>
        <TicketsTable arrayColumn={columnTickets} />
      </ContainerTicketStyled>
    </>
  );
};

export default TicketsInfo;
