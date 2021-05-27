import { Typography } from "@material-ui/core";
import { ContainerTicketStyled } from "./style";
import { NewTable } from "../../shared/NewTable";
import { useEffect, useState } from "react";
import { getDataApi } from "../../../services/infoApi";
import Loading from "../../shared/Loading";
import { columnTickets } from "../../../mocks/tableList";
// import DataTable from "../../shared/NewTable";
// import { deleteInfo } from "../../../services/infoApi";

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

  // const removeTicket = (id) => {
  //   if (id) {
  //     (async () => {
  //       await deleteInfo(id);
  //       const del = rows.filter((row) => id !== row.id);
  //       setRows(del);
  //     })();
  //   } else {
  //     alert("Selecione uma informação primeiro!");
  //   }
  // };

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
            <NewTable
              arrayColumn={columnTickets}
              arrayRows={rows}
              // onClickRemove={() => removeTicket(15)}
            />
            {/* <DataTable columns={columnTicketsDataGrid} rows={rows} /> */}
          </ContainerTicketStyled>
        </>
      )}
    </>
  );
};

export default TicketsInfo;
