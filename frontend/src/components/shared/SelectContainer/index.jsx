import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { FormControlStyled } from "./style";

export default function SelectContainer({ children, value, onChange, label }) {
  return (
    <>
      <FormControlStyled variant="outlined">
        <InputLabel htmlFor="filled-age-native-simple">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={value}
          onChange={onChange}
          label={label}
          autoWidth
        >
          {children}
        </Select>
      </FormControlStyled>
    </>
  );
}
