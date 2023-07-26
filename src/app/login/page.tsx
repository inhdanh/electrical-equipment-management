"use client";

import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";

interface Inputs {
  username: string;
  password: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch("username"));

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: 20,
      }}
    >
      <Box
        sx={{
          width: "400px",
        }}
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          Log in
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <TextField
              variant="standard"
              label="Username"
              {...register("username", { required: true })}
              error={!!errors.username}
              helperText={errors.username && "Please input your username!"}
            />
            <TextField
              variant="standard"
              label="Password"
              type="password"
              {...register("password", { required: true })}
              error={!!errors.password}
              helperText={errors.password && "Please input your password!"}
            />
            <Button variant="contained" type="submit">
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
