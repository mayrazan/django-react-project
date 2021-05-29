import { Alert, AlertTitle } from "@material-ui/lab";

export function alertMessage(className) {
  return (
    <div className={className}>
      <Alert severity="error">
        <AlertTitle>Erro</AlertTitle>
        Preencha todos os campos!
      </Alert>
    </div>
  );
}

export function successMessage(className) {
  return (
    <div className={className}>
      <Alert severity="success">
        <AlertTitle>Sucesso</AlertTitle>
        Cadastro realizado com sucesso!
      </Alert>
    </div>
  );
}
