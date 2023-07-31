import { TextField, TextFieldProps } from "@mui/material";
import { Control, Controller } from "react-hook-form";

interface FormInputProps {
  name: string;
  control: Control<any, any>;
  rules?: any;
  label?: string;
}

export default function FormInput({
  name,
  control,
  label,
  rules,
  ...inputProps
}: FormInputProps & TextFieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          helperText={error ? error.message : null}
          size="small"
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          {...inputProps}
        />
      )}
    />
  );
}
