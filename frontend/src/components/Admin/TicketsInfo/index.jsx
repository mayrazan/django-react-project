import { Typography } from "@material-ui/core";
import { ContainerTicketStyled } from "./style";
import { TicketsTable } from "../TicketTable";
import { columnTickets } from "../../../mocks/tableList";

const TicketsInfo = () => {
  return (
    <>
      <Typography variant="h4" style={{ paddingBottom: "1rem" }}>
        Ticket
      </Typography>
      <ContainerTicketStyled>
        <TicketsTable arrayColumn={columnTickets} />
      </ContainerTicketStyled>
    </>
  );
};

export default TicketsInfo;
