import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Button, MenuItem, TextField, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
import {
  deleteInfo,
  getColorsPriority,
  getDataApi,
} from "../../../services/infoApi";
import Loading from "../../shared/Loading";
import SelectContainer from "../../shared/SelectContainer";
import { HeaderFooterContainer } from "../../shared/StyleComponents/style";
import XLSX from "xlsx";
import { changeColor } from "../../../utils/changeColor";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import KeyboardBackspaceOutlinedIcon from "@material-ui/icons/KeyboardBackspaceOutlined";
import {
  BtnContainerStyled,
  BtnStyled,
  CountStatusContainer,
  PaperRootStyled,
  SearchContainerStyled,
  TableContainerStyled,
  TableRowStyled,
} from "./style";

export function TicketsTable({ arrayColumn }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const history = useHistory();
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState("Todos");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const load = async () => {
      const response = await getDataApi("tickets/");
      const responseColors = await getColorsPriority();

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
      changeColor(isLoading, status, responseColors);
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, search, status]);

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
    (async () => {
      await deleteInfo(id);
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

  const redirectToTicket = (id) => {
    history.push(`/admin/visualizar-chamado/${id}/`);
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

  const countStatus = (value) => {
    let count = 0;
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].status.includes(value)) {
        count++;
      }
    }
    return (
      <Typography>
        Tickets {value}: {count}
      </Typography>
    );
  };

  return (
    <>
      {isLoading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <CountStatusContainer>
            {countStatus("Em aberto")}
            {countStatus("Em análise")}
            {countStatus("Concluído")}
            {countStatus("Rejeitado")}
          </CountStatusContainer>

          <HeaderFooterContainer>
            <SearchContainerStyled>
              <TextField
                id="outlined-search"
                label="Pesquisar Perturbação"
                type="search"
                variant="outlined"
                onChange={(event) => setSearch(event.target.value)}
                value={search}
              />

              {selectStatus()}
            </SearchContainerStyled>

            <Button
              variant="contained"
              color="primary"
              onClick={() => history.push("/admin/cadastro-chamado/")}
            >
              <AddCircleOutlineOutlinedIcon />
            </Button>
          </HeaderFooterContainer>

          <PaperRootStyled>
            <TableContainerStyled>
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
                          <TableRowStyled hover tabIndex={-1} key={row.id}>
                            {arrayColumn.map((column) => {
                              const valueUser = row.user[column.id];
                              const value = row[column.id];
                              if (column.id === "actions") {
                                return (
                                  <TableCell key={column.id}>
                                    <BtnStyled
                                      variant="contained"
                                      color="primary"
                                      onClick={() => redirectToTicket(row.id)}
                                    >
                                      <EditOutlinedIcon />
                                    </BtnStyled>
                                    <Button
                                      variant="contained"
                                      color="primary"
                                      onClick={() => removeTicket(row.id)}
                                    >
                                      <DeleteOutlinedIcon />
                                    </Button>
                                  </TableCell>
                                );
                              }
                              return (
                                <TableCell key={column.id}>
                                  {value || valueUser}
                                </TableCell>
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
                onClick={() => setTimeout(() => window.location.reload(), 500)}
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
              </BtnContainerStyled>
            </HeaderFooterContainer>
          </PaperRootStyled>
        </>
      )}
    </>
  );
}
