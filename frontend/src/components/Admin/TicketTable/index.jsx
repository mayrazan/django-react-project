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
import { Button, MenuItem, TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { deleteInfo, getDataApi } from "../../../services/infoApi";
import Loading from "../../shared/Loading";
import SelectContainer from "../../shared/SelectContainer";
import { HeaderFooterContainer } from "../../shared/StyleComponents/style";
import XLSX from "xlsx";

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

export function TicketsTable({ arrayColumn }) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const history = useHistory();
  const [isSelected, setIsSelected] = useState(false);
  const [idValue, setIdValue] = useState(0);
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState("Todos");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const load = async () => {
      const response = await getDataApi("tickets/");

      let filteredStatus = response;
      if (status !== "Todos") {
        filteredStatus = filteredStatus.filter(
          (stat) => stat.status === status
        );
      }
      setRows(filteredStatus);
      setTimeout(() => setIsLoading(false), 700);

      let results = response;
      if (search) {
        results = results.filter((value) =>
          value.problem.toLowerCase().includes(search.toLowerCase())
        );
        setRows(results);
      }
    };
    load();
  }, [search, status]);

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
      history.push(`/admin/visualizar-chamado/${id}/`);
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
      el.user.name,
      el.user.numAp,
      el.problem,
      el.openDate,
      el.status,
      el.priority,
      el.description,
      el.numApOccurrence,
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

  const downloadxls = (data) => {
    const result = rows.map((el) => [
      el.user.name,
      el.user.numAp,
      el.problem,
      el.openDate,
      el.status,
      el.priority,
      el.description,
      el.numApOccurrence,
      el.feedbackManager,
    ]);
    const headings = [
      [
        "Nome",
        "Nº Ap.",
        "Perturbação",
        "Data",
        "Status",
        "Prioridade",
        "Descrição",
        "Nº Ap. Ocorrência",
        "Resolução",
      ],
    ];
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(result, {
      origin: "A2",
      skipHeader: true,
    });
    XLSX.utils.sheet_add_aoa(ws, headings);
    XLSX.utils.book_append_sheet(wb, ws);
    XLSX.writeFile(wb, "tickets.xlsx");
  };

  const selectClassPriority = document.querySelectorAll(".priority");
  selectClassPriority.forEach((el) => el.getAttribute("priority"));
  console.log(selectClassPriority.forEach((el) => el.innerHTML));

  return (
    <>
      {isLoading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <HeaderFooterContainer>
            <TextField
              id="outlined-search"
              label="Perturbação"
              type="search"
              variant="outlined"
              onChange={(event) => setSearch(event.target.value)}
              value={search}
            />

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

            <Button
              variant="contained"
              color="primary"
              onClick={(e) => {
                downloadxls(e, rows);
              }}
            >
              Excel
            </Button>
          </HeaderFooterContainer>

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
                            onClick={() => {
                              setIdValue(row.id);
                              setIsSelected(true);
                            }}
                            selected={idValue === row.id}
                            className={classes.tableRow}
                          >
                            {arrayColumn.map((column) => {
                              const valueUser = row.user[column.id];
                              const value = row[column.id];
                              return (
                                <TableCell key={column.id} className="priority">
                                  {value || valueUser}
                                </TableCell>
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
                onClick={() => redirectToTicket(idValue)}
              >
                Alterar/Visualizar Chamado
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => history.push("/admin/cadastro-chamado/")}
              >
                Cadastrar
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => removeTicket(idValue)}
              >
                Remover
              </Button>
            </HeaderFooterContainer>
          </Paper>
        </>
      )}
    </>
  );
}
