import { headCellsTickets } from "./tableList";
import TableCell from "@material-ui/core/TableCell";

export const chooseTable = (type) => {
  if (type === 1) {
    return headCellsTickets;
  }
};

export const chooseTableContent = (type, row, labelId, className) => {
  if (type === 1) {
    return (
      <>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          padding="none"
          className={className}
        >
          {row.name}
        </TableCell>

        <TableCell className={className}>{row.problem}</TableCell>
        <TableCell className={className}>{row.file}</TableCell>
        <TableCell className={className}>{row.apNumber}</TableCell>
        <TableCell className={className}>{row.date}</TableCell>
        <TableCell className={className}>{row.status}</TableCell>
        <TableCell className={className}>{row.priority}</TableCell>
      </>
    );
  }
};
