import { Typography } from "@material-ui/core";
import { columnRenters } from "../../../mocks/tableList";
import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Button, TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { deleteUser } from "../../../services/infoApi";
import Loading from "../../shared/Loading";
import ReactExport from "react-data-export";
import {
  HeaderFooterContainer,
  ContainerStyled,
} from "../../shared/StyleComponents/style";
import { useUserContext } from "../../../context/ContextUser";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import KeyboardBackspaceOutlinedIcon from "@material-ui/icons/KeyboardBackspaceOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import {
  BtnContainer,
  BtnViewStyled,
  PaperContainer,
  TableContainerStyled,
  TableRowStyled,
} from "./style";

const RenterInfo = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const history = useHistory();
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { credentials } = useUserContext();

  useEffect(() => {
    const load = async () => {
      setTimeout(() => setIsLoading(false), 700);

      let results = credentials.filter((el) => el.isUser);
      setRows(results);
      if (search) {
        results = results.filter((value) =>
          value.name.toLowerCase().includes(search.toLowerCase())
        );
        setRows(results);
      }
    };
    load();
  }, [credentials, search]);

  const removeUser = (id) => {
    (async () => {
      await deleteUser(id);
      const del = rows.filter((row) => id !== row.id);
      setRows(del);
    })();
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

    const title = "Síndicos";
    const headers = [
      ["NOME", "SOBRENOME", "EMAIL", "Nº AP.", "ANDAR", "TELEFONE", "CPF"],
    ];

    const data = rows.map((el) => [
      el.name,
      el.lastName,
      el.email,
      el.numAp,
      el.floor,
      el.phone,
      el.cpf,
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
    doc.save("condominos.pdf");
  };

  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

  const redirectToUser = (id) => {
    history.push(`/admin/visualizar-condomino/${id}`);
  };

  return (
    <>
      <Typography variant="h4" style={{ paddingBottom: "1rem" }}>
        Condôminos
      </Typography>
      <ContainerStyled>
        {isLoading ? (
          <>
            <Loading />
          </>
        ) : (
          <>
            <HeaderFooterContainer>
              <TextField
                id="outlined-search"
                label="Pesquisar Nome"
                type="search"
                variant="outlined"
                onChange={(event) => setSearch(event.target.value)}
                value={search}
              />
            </HeaderFooterContainer>

            <PaperContainer>
              <TableContainerStyled>
                <Table stickyHeader aria-label="sticky table" id="table-ticket">
                  <TableHead>
                    <TableRow>
                      {columnRenters.map((column) => (
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
                            <TableRowStyled
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={row.id}
                            >
                              {columnRenters.map((column) => {
                                const value = row[column.id];

                                if (column.id === "actions") {
                                  return (
                                    <TableCell key={column.id}>
                                      <BtnViewStyled
                                        variant="contained"
                                        color="primary"
                                        onClick={() => redirectToUser(row.id)}
                                      >
                                        <VisibilityOutlinedIcon />
                                      </BtnViewStyled>
                                      <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => removeUser(row.id)}
                                      >
                                        <DeleteOutlinedIcon />
                                      </Button>
                                    </TableCell>
                                  );
                                }
                                return (
                                  <TableCell key={column.id}>{value}</TableCell>
                                );
                              })}
                            </TableRowStyled>
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
              </TableContainerStyled>
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
                  onClick={() =>
                    setTimeout(() => window.location.reload(), 500)
                  }
                >
                  <KeyboardBackspaceOutlinedIcon />
                </Button>

                <BtnContainer>
                  <Button variant="contained" color="primary">
                    <CSVLink data={rows} className="link-btn">
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
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={exportPDF}
                  >
                    PDF
                  </Button>

                  <ExcelFile
                    element={
                      <Button variant="contained" color="primary">
                        Excel
                      </Button>
                    }
                    filename="Condominos"
                  >
                    <ExcelSheet data={rows} name="Condominos">
                      <ExcelColumn label="Nome" value="name" />
                      <ExcelColumn label="Sobrenome" value="lastName" />
                      <ExcelColumn label="Email" value="email" />
                      <ExcelColumn label="Nº Ap." value="numAp" />
                      <ExcelColumn label="Andar" value="floor" />
                      <ExcelColumn label="Telefone" value="phone" />
                      <ExcelColumn label="CPF" value="cpf" />
                    </ExcelSheet>
                  </ExcelFile>
                </BtnContainer>
              </HeaderFooterContainer>
            </PaperContainer>
          </>
        )}
      </ContainerStyled>
    </>
  );
};

export default RenterInfo;
