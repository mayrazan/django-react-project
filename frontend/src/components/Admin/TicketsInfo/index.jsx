import { Typography } from "@material-ui/core";
import { ContainerTicketStyled } from "./style";
import TicketsTable from "./TicketsTable";

const TicketsInfo = () => {
  return (
    <>
      <Typography variant="h4">Ticket</Typography>
      <ContainerTicketStyled>
        <input></input>
        <TicketsTable />
      </ContainerTicketStyled>
    </>
  );
};

export default TicketsInfo;
