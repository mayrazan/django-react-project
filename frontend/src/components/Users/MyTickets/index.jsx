import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Button, MenuItem, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { getColorsPriority, getUserTickets } from "../../../services/infoApi";
import Loading from "../../shared/Loading";
import ReactExport from "react-data-export";
import SelectContainer from "../../shared/SelectContainer";
import {
  ContainerStyled,
  HeaderFooterContainer,
} from "../../shared/StyleComponents/style";
import { columnTicketsUser } from "../../../mocks/tableList";
import { changeColor } from "../../../utils/changeColor";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import KeyboardBackspaceOutlinedIcon from "@material-ui/icons/KeyboardBackspaceOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import {
  BtnContainerStyled,
  PaperRootStyled,
  TableContainerStyled,
  TableRowStyled,
} from "./style";

const MyTickets = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const history = useHistory();
  const [rows, setRows] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState("Todos");
  const currentUser = JSON.parse(localStorage.getItem("userLogged"));

  useEffect(() => {
    const load = async () => {
      const userID = currentUser.map((el) => el.id);
      const response = await getUserTickets(`${userID[0]}`);
      const responseColors = await getColorsPriority();

      let filteredStatus = response;

      if (status !== "Todos") {
        filteredStatus = filteredStatus.filter(
          (stat) => stat.status === status
        );
      }
      setRows(filteredStatus);
      setTimeout(() => setIsLoading(false), 700);

      changeColor(isLoading, status, responseColors);
    };

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, isLoading]);

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

  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

  const redirectToTicket = (id) => {
    history.push(`/visualizar-chamado/${id}/`);
  };

  const verifyTicketResponse = (id) => {
    const r = rows.filter((el) => el.feedbackManager === "" && el.id === id);
    if (r.length === 0) {
      redirectToTicket(id);
    } else {
      alert("Ainda não há atualizações no ticket");
    }
  };

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

              <Button
                variant="contained"
                color="primary"
                onClick={() => history.push("/cadastro-chamado")}
              >
                <AddCircleOutlineOutlinedIcon />
              </Button>
            </HeaderFooterContainer>

            <PaperRootStyled>
              <TableContainerStyled>
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
                            <TableRowStyled
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={row.id}
                            >
                              {columnTicketsUser.map((column, index) => {
                                const value = row[column.id];

                                if (column.id === "actions") {
                                  return (
                                    <TableCell key={column.id}>
                                      <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() =>
                                          verifyTicketResponse(row.id)
                                        }
                                      >
                                        <VisibilityOutlinedIcon />
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
                  onClick={() => history.push("/")}
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

                  <ExcelFile
                    element={
                      <Button variant="contained" color="primary">
                        Excel
                      </Button>
                    }
                    filename="Tickets"
                  >
                    <ExcelSheet data={rows} name="Tickets">
                      <ExcelColumn label="Data" value="openDate" />
                      <ExcelColumn label="Perturbação" value="problem" />
                      <ExcelColumn label="Descrição" value="description" />
                      <ExcelColumn
                        label="Nº Ap. Ocorrência"
                        value="numApOccurrence"
                      />
                      <ExcelColumn
                        label="Resposta Síndico"
                        value="feedbackManager"
                      />
                    </ExcelSheet>
                  </ExcelFile>
                </BtnContainerStyled>
              </HeaderFooterContainer>
            </PaperRootStyled>
          </>
        )}
      </ContainerStyled>
    </>
  );
};

export default MyTickets;
