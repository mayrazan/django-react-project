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
import { Button, MenuItem, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { getDataApi } from "../../../services/infoApi";
import Loading from "../../shared/Loading";
import ReactExport from "react-data-export";
import SelectContainer from "../../shared/SelectContainer";
import {
  ContainerStyled,
  HeaderFooterContainer,
} from "../../shared/StyleComponents/style";
import { columnTicketsUser } from "../../../mocks/tableList";

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
  link: {
    color: "white",
  },
}));

const MyTickets = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const history = useHistory();
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState("Todos");

  useEffect(() => {
    const load = async () => {
      const response = await getDataApi("tickets");
      setRows(response);

      let filteredStatus = response;
      setRows(filteredStatus);

      if (status !== "Todos") {
        filteredStatus = filteredStatus.filter(
          (stat) => stat.status === status
        );
      }
      setRows(filteredStatus);
      setTimeout(() => setIsLoading(false), 700);
    };
    load();
  }, [status]);

  const selectStatus = () => {
    const options = [
      "Todos",
      "Em aberto",
      "Em análise",
      "Concluído",
      "Rejeitado",
    ];

    return (
      <SelectContainer
        value={status}
        onChange={(event) => {
          setStatus(event.target.value);
        }}
        label="Status"
      >
        {options.map((item, index) => {
          return (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          );
        })}
      </SelectContainer>
    );
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
      <Typography variant="h4" style={{ paddingBottom: "1rem" }}>
        Tickets
      </Typography>
      <ContainerStyled>
        {isLoading ? (
          <>
            <Loading />
          </>
        ) : (
          <>
            <HeaderFooterContainer>
              {selectStatus()}

              <Button variant="contained" color="primary">
                <CSVLink data={rows} className={classes.link}>
                  CSV
                </CSVLink>
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => window.print()}
              >
                Print
              </Button>
              <Button variant="contained" color="primary" onClick={exportPDF}>
                PDF
              </Button>

              <ExcelFile
                element={
                  <Button variant="contained" color="primary">
                    Excel
                  </Button>
                }
                filename="Tickets"
              >
                <ExcelSheet data={rows} name="Tickets">
                  <ExcelColumn label="Nome" value="name" />
                  <ExcelColumn label="Nº Ap." value="apNumber" />
                  <ExcelColumn label="Data" value="date" />
                  <ExcelColumn label="Perturbação" value="problem" />
                  <ExcelColumn label="Descrição" value="description" />
                  <ExcelColumn label="Nº Ap. Ocorrência" value="apOccurrence" />
                  <ExcelColumn
                    label="Resposta Síndico"
                    value="feedbackManager"
                  />
                </ExcelSheet>
              </ExcelFile>
            </HeaderFooterContainer>

            <Paper className={classes.root}>
              <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table" id="table-ticket">
                  <TableHead>
                    <TableRow>
                      {columnTicketsUser.map((column) => (
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
                    {rows.length > 0 ? (
                      rows
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => {
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={row.id}
                              className={classes.tableRow}
                            >
                              {columnTicketsUser.map((column, index) => {
                                const value = row[column.id];
                                return (
                                  <TableCell key={column.id}>{value}</TableCell>
                                );
                              })}
                            </TableRow>
                          );
                        })
                    ) : (
                      <TableRow>
                        <TableCell align="center" colSpan={6}>
                          Nenhum registro encontrado
                        </TableCell>
                      </TableRow>
                    )}
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
              <HeaderFooterContainer>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => history.push("/")}
                >
                  Voltar
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => history.push("/cadastro-chamado")}
                >
                  Cadastrar
                </Button>
              </HeaderFooterContainer>
            </Paper>
          </>
        )}
      </ContainerStyled>
    </>
  );
};

export default MyTickets;