import React, { useState } from "react";
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
import { DataGrid } from "@material-ui/data-grid";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
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

export function NewTable({ arrayColumn, arrayRows }) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const history = useHistory();
  const [isSelected, setIsSelected] = useState(false);
  const [idValue, setIdValue] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const redirectToTicket = (id) => {
    history.push(`/admin/visualizar-chamado/${id}`);
  };

  console.log(isSelected);
  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
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
            {arrayRows
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
                      return <TableCell key={column.id}>{value}</TableCell>;
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
        count={arrayRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        labelRowsPerPage="Resultados por página"
      />
      <Button onClick={() => redirectToTicket(idValue)}>Editar</Button>
      <Button>Voltar</Button>
      <Button>Cadastrar</Button>
    </Paper>
  );
}

const useStylesCustom = makeStyles({
  root: {
    "& .MuiDataGrid-root .MuiDataGrid-cellLeft": {
      textAlign: "center",
    },
    "& .MuiDataGrid-root .MuiDataGrid-columnHeaderTitle": {
      overflow: "visible",
    },
  },
});

export default function DataTable({ rows, columns }) {
  const classes = useStylesCustom();

  return (
    <div style={{ height: 500, width: "100%" }} className={classes.root}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        checkboxSelection
        rowsPerPageOptions={[10, 25, 100]}
        style={{ width: "100%" }}
        pagination
        className={classes.root}
        // onRowSelected={redirectTo}
      />
    </div>
  );
}
