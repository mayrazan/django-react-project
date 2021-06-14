import { Typography } from "@material-ui/core";
import { ContainerMainStyled } from "../../shared/StyleComponents/style";
import { TicketsTable } from "../TicketTable";
import { columnTickets } from "../../../mocks/tableList";

const TicketsInfo = () => {
  return (
    <>
      <Typography variant="h4" style={{ paddingBottom: "1rem" }}>
        Ticket
      </Typography>
      <ContainerMainStyled>
        <br />
        <TicketsTable arrayColumn={columnTickets} />
      </ContainerMainStyled>
    </>
  );
};

export default TicketsInfo;
