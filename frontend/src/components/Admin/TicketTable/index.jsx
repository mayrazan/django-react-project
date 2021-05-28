import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { deleteInfo, getDataApi } from "../../../services/infoApi";
import Loading from "../../shared/Loading";
import ReactExport from "react-data-export";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  tableRow: {
    cursor: "pointer",
  },
}));

export function TicketsTable({ arrayColumn }) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const history = useHistory();
  const [isSelected, setIsSelected] = useState(false);
  const [idValue, setIdValue] = useState(0);
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

  const removeTicket = (id) => {
    if (isSelected) {
      (async () => {
        await deleteInfo(id);
        const del = rows.filter((row) => id !== row.id);
        setRows(del);
      })();
    } else {
      alert("Selecione uma informação primeiro!");
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const redirectToTicket = (id) => {
    if (isSelected) {
      history.push(`/admin/visualizar-chamado/${id}`);
    } else {
      alert("Selecione uma informação primeiro!");
    }
  };

  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "landscape"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);
    // doc.autoTable({ html: '#my-table' })

    doc.setFontSize(15);

    const title = "Tickets";
    const headers = [
      [
        "NOME",
        "Nº AP.",
        "PERTURBAÇÃO",
        "DATA ABERTURA",
        "STATUS",
        "PRIORIDADE",
        "DESCRIÇÃO",
        "Nº AP. OCORRÊNCIA",
        "RESPOSTA",
      ],
    ];

    const data = rows.map((el) => [
      el.name,
      el.apNumber,
      el.problem,
      el.date,
      el.status,
      el.priority,
      el.description,
      el.apOccurrence,
      el.feedbackManager,
    ]);

    let content = {
      startY: 50,
      head: headers,
      body: data,
      showHead: "firstPage",
      theme: "grid",
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("tickets.pdf");
  };

  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

  return (
    <>
      {isLoading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <Button>
            <CSVLink data={rows}>CSV</CSVLink>
          </Button>
          <Button onClick={() => window.print()}>Print</Button>
          <Button onClick={exportPDF}>PDF</Button>

          <ExcelFile element={<button>Excel</button>}>
            <ExcelSheet data={rows} name="Tickets">
              {arrayColumn.map((col) => (
                <>
                  <ExcelColumn label={col.label} value="name" key={col.id} />
                  <ExcelColumn label={col.label} value="problem" key={col.id} />
                  <ExcelColumn label={col.label} value="file" key={col.id} />
                  <ExcelColumn
                    label={col.label}
                    value="apNumber"
                    key={col.id}
                  />
                  <ExcelColumn label={col.label} value="date" key={col.id} />
                  <ExcelColumn label={col.label} value="status" key={col.id} />
                  <ExcelColumn
                    label={col.label}
                    value="priority"
                    key={col.id}
                  />
                </>
              ))}
            </ExcelSheet>
          </ExcelFile>

          <Paper className={classes.root}>
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table" id="table-ticket">
                <TableHead>
                  <TableRow>
                    {arrayColumn.map((column) => (
                      <TableCell
                        key={column.id}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.id}
                          onClick={() => {
                            setIdValue(row.id);
                            setIsSelected(true);
                          }}
                          // style={{
                          //   backgroundColor: row.id === idValue ? "blue" : "white",
                          // }}
                          selected={idValue === row.id}
                          className={classes.tableRow}
                        >
                          {arrayColumn.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id}>{value}</TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              labelRowsPerPage="Resultados por página"
            />
            <Button onClick={() => history.push(`/`)}>Voltar</Button>
            <Button onClick={() => redirectToTicket(idValue)}>Editar</Button>
            <Button>Cadastrar</Button>
            <Button onClick={() => removeTicket(idValue)}>Remover</Button>
          </Paper>
        </>
      )}
    </>
  );
}
