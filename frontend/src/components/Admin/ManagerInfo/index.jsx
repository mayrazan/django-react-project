import { Typography } from "@material-ui/core";
import { columnManagers } from "../../../mocks/tableList";
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
import { Button, TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { deleteManager, getDataApi } from "../../../services/infoApi";
import Loading from "../../shared/Loading";
import ReactExport from "react-data-export";
import { HeaderFooterManagerContainer, ContainerManagerStyled } from "./style";

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

const ManagerInfo = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const history = useHistory();
  const [isSelected, setIsSelected] = useState(false);
  const [idValue, setIdValue] = useState(0);
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const load = async () => {
      const response = await getDataApi("admin");
      setRows(response);

      setTimeout(() => setIsLoading(false), 700);

      let results = response;
      if (search) {
        results = results.filter((value) =>
          value.name.toLowerCase().includes(search.toLowerCase())
        );
        setRows(results);
      }
    };
    load();
  }, [search]);

  const removeManager = (id) => {
    if (isSelected) {
      (async () => {
        await deleteManager(id);
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

  const redirectToManager = (id) => {
    if (isSelected) {
      history.push(`/admin/visualizar-sindico/${id}`);
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

    const title = "Síndicos";
    const headers = [["NOME", "SOBRENOME", "EMAIL", "Nº AP."]];

    const data = rows.map((el) => [
      el.name,
      el.lastName,
      el.email,
      el.apNumber,
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
    doc.save("sindicos.pdf");
  };

  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

  return (
    <>
      <Typography variant="h4" style={{ paddingBottom: "1rem" }}>
        Síndicos
      </Typography>
      <ContainerManagerStyled>
        {isLoading ? (
          <>
            <Loading />
          </>
        ) : (
          <>
            <HeaderFooterManagerContainer>
              <TextField
                id="outlined-search"
                label="Nome"
                type="search"
                variant="outlined"
                onChange={(event) => setSearch(event.target.value)}
                value={search}
              />

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
                filename="Sindicos"
              >
                <ExcelSheet data={rows} name="Sindicos">
                  <ExcelColumn label="Nome" value="name" />
                  <ExcelColumn label="Sobrenome" value="lastName" />
                  <ExcelColumn label="Email" value="email" />
                  <ExcelColumn label="Nº Ap." value="apNumber" />
                </ExcelSheet>
              </ExcelFile>
            </HeaderFooterManagerContainer>

            <Paper className={classes.root}>
              <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table" id="table-ticket">
                  <TableHead>
                    <TableRow>
                      {columnManagers.map((column) => (
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
                              {columnManagers.map((column) => {
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
              <HeaderFooterManagerContainer>
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
                  onClick={() => redirectToManager(idValue)}
                >
                  Editar
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => history.push("/admin/cadastro-sindico")}
                >
                  Cadastrar
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => removeManager(idValue)}
                >
                  Remover
                </Button>
              </HeaderFooterManagerContainer>
            </Paper>
          </>
        )}
      </ContainerManagerStyled>
    </>
  );
};

export default ManagerInfo;