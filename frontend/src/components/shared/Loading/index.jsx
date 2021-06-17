import CircularProgress from "@material-ui/core/CircularProgress";
import { ContainerStyled } from "./style";

export default function Loading() {
  return (
    <ContainerStyled>
      <CircularProgress />
    </ContainerStyled>
  );
}
