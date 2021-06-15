import { Alert, AlertTitle } from "@material-ui/lab";
import { AlertStyledContainer } from "./style";

export function alertMessage() {
  return (
    <AlertStyledContainer>
      <Alert severity="error">
        <AlertTitle>Erro</AlertTitle>
        Preencha todos os campos!
      </Alert>
    </AlertStyledContainer>
  );
}

export function successMessage() {
  return (
    <AlertStyledContainer>
      <Alert severity="success">
        <AlertTitle>Sucesso</AlertTitle>
        Cadastro realizado com sucesso!
      </Alert>
    </AlertStyledContainer>
  );
}

export function success() {
  return (
    <AlertStyledContainer>
      <Alert severity="success">
        <AlertTitle>Sucesso</AlertTitle>
        Envio realizado com sucesso!
      </Alert>
    </AlertStyledContainer>
  );
}
