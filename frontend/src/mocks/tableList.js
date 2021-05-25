export const headCellsTickets = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Nome",
  },
  {
    id: "problem",
    numeric: false,
    disablePadding: false,
    label: "Perturbação",
  },
  {
    id: "file",
    numeric: false,
    disablePadding: false,
    label: "Upload de arquivos",
  },
  {
    id: "apNumber",
    numeric: true,
    disablePadding: false,
    label: "Apartamento",
  },

  { id: "date", numeric: false, disablePadding: false, label: "Data" },
  { id: "status", numeric: false, disablePadding: false, label: "Status" },
  {
    id: "priority",
    numeric: false,
    disablePadding: false,
    label: "Prioridade",
  },
];

export const columnTickets = [
  { id: "name", label: "Nome", minWidth: 170 },
  { id: "problem", label: "Perturbação", minWidth: 170 },
  {
    id: "file",
    label: "Upload de arquivos",
    minWidth: 170,
  },
  {
    id: "apNumber",
    label: "Apartamento",
    minWidth: 170,
  },
  {
    id: "date",
    label: "Data",
    minWidth: 170,
  },
  {
    id: "status",
    label: "Status",
    minWidth: 170,
  },
  {
    id: "priority",
    label: "Prioridade",
    minWidth: 170,
  },
];

export const columnTicketsDataGrid = [
  { field: "name", headerName: "Nome", width: 170 },
  { field: "problem", headerName: "Perturbação", width: 170 },
  {
    field: "file",
    headerName: "Upload de arquivos",
    width: 170,
  },
  {
    field: "apNumber",
    headerName: "Apartamento",
    width: 170,
  },
  {
    field: "date",
    headerName: "Data",
    width: 170,
  },
  {
    field: "status",
    headerName: "Status",
    width: 170,
  },
  {
    field: "priority",
    headerName: "Prioridade",
    width: 170,
  },
  {
    field: "action",
    headerName: "Action",
    width: 170,
    // renderCell: () => {
    //   return (
    //     <Button variant="contained" color="primary" startIcon={<EditIcon />}>
    //       Edit
    //     </Button>
    //   );
    // },
  },
];
