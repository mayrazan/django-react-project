import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Button, TextField, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { getDataApi, getTicketsHistory } from "../../../services/infoApi";
import Loading from "../../shared/Loading";
import {
  HeaderFooterContainer,
  ContainerStyled,
} from "../../shared/StyleComponents/style";
import XLSX from "xlsx";
import { columnTicketsHistory } from "../../../mocks/tableList";
import KeyboardBackspaceOutlinedIcon from "@material-ui/icons/KeyboardBackspaceOutlined";
import {
  BtnContainerStyled,
  PaperRootStyled,
  SearchContainerStyled,
  TableContainerStyled,
  TableRowStyled,
} from "./style";

export default function TicketsHistory() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const history = useHistory();
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const load = async () => {
      const response = await getDataApi("tickets-history-changes/");
      const resultWithChangedElements = response.map((item) => {
        return item === null ? "" : item;
      });
      setRows(resultWithChangedElements);

      setTimeout(() => setIsLoading(false), 700);

      // let results = resultWithChangedElements;

      if (search) {
        const responseSearch = await getTicketsHistory(search);
        // results = results.filter((value) => value.id === Number(search));
        setRows(responseSearch);
      }
    };
    load();
  }, [search]);

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

    const title = "Histórico Tickets";
    const headers = [
      [
        "Nº TICKET",
        "NOME",
        "STATUS",
        "PRIORIDADE",
        "RESPOSTA SÍNDICO",
        "RESPOSTA CONDÔMINO",
        "DATA ATUALIZAÇÃO",
      ],
    ];

    const data = rows.map((el) => [
      el.id,
      el.user_name,
      el.status,
      el.priority,
      el.feedbackManager,
      el.userResponse,
      el.history_date,
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
    doc.save("historico-tickets.pdf");
  };

  const downloadxls = (data) => {
    const result = rows.map((el) => [
      el.id,
      el.user_name,
      el.status,
      el.priority,
      el.feedbackManager,
      el.userResponse,
      el.history_date,
    ]);
    const headings = [
      [
        "Nº TICKET",
        "NOME",
        "STATUS",
        "PRIORIDADE",
        "RESPOSTA SÍNDICO",
        "RESPOSTA CONDÔMINO",
        "DATA ATUALIZAÇÃO",
      ],
    ];
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(result, {
      origin: "A2",
      skipHeader: true,
    });
    XLSX.utils.sheet_add_aoa(ws, headings);
    XLSX.utils.book_append_sheet(wb, ws);
    XLSX.writeFile(wb, "historico-tickets.xlsx");
  };

  return (
    <>
      <Typography variant="h4" style={{ paddingBottom: "1rem" }}>
        Histórico de Atualizações de Tickets
      </Typography>
      <ContainerStyled>
        {isLoading ? (
          <>
            <Loading />
          </>
        ) : (
          <>
            <HeaderFooterContainer>
              <SearchContainerStyled>
                <TextField
                  id="outlined-search"
                  label="Pesquisar Nº Ticket"
                  type="search"
                  variant="outlined"
                  onChange={(event) => setSearch(event.target.value)}
                  value={search}
                  autoComplete="off"
                />
              </SearchContainerStyled>
            </HeaderFooterContainer>

            <PaperRootStyled>
              <TableContainerStyled>
                <Table stickyHeader aria-label="sticky table" id="table-ticket">
                  <TableHead>
                    <TableRow>
                      {columnTicketsHistory.map((column) => (
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
                        .map((row, index) => {
                          return (
                            <TableRowStyled hover tabIndex={-1} key={index}>
                              {columnTicketsHistory.map((column) => {
                                const value = row[column.id];

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
                  onClick={() => setTimeout(() => history.push("/admin"), 500)}
                >
                  <KeyboardBackspaceOutlinedIcon />
                </Button>

                <BtnContainerStyled>
                  <Button variant="contained" color="primary">
                    <CSVLink data={rows} className="link">
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

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(e) => {
                      downloadxls(e, rows);
                    }}
                  >
                    Excel
                  </Button>
                </BtnContainerStyled>
              </HeaderFooterContainer>
            </PaperRootStyled>
          </>
        )}
      </ContainerStyled>
    </>
  );
}
