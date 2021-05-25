import { Typography } from "@material-ui/core";
import { ContainerTicketStyled } from "./style";
// import TableContent from "../../shared/TableContent";
import { NewTable } from "../../shared/NewTable";
// import { chooseTable } from "../../../mocks/chooseTable";
import { useEffect, useState } from "react";
import { getDataApi } from "../../../services/infoApi";
import Loading from "../../shared/Loading";
import { columnTickets } from "../../../mocks/tableList";
// import DataTable from "../../shared/NewTable";

const TicketsInfo = () => {
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const response = await getDataApi("tickets");
      setRows(response);
      setTimeout(() => setIsLoading(false), 700);
    };
    load();
  }, []);

  return (
    <>
      {isLoading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <Typography variant="h4">Ticket</Typography>
          <ContainerTicketStyled>
            <input></input>
            {/* <TableContent type={1} /> */}
            <NewTable arrayColumn={columnTickets} arrayRows={rows} />
            {/* <DataTable columns={columnTicketsDataGrid} rows={rows} /> */}
          </ContainerTicketStyled>
        </>
      )}
    </>
  );
};

export default TicketsInfo;
