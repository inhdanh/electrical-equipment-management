"use client";

import { login } from "@/api";
import { useUserContext } from "@/contexts/user";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

interface Inputs {
  email: string;
  password: string;
}

export default function Login() {
  const { setUser } = useUserContext();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (data: any) => login(data),
    onSuccess: (data) => {
      setUser(data.data);
      router.push("/");
      toast.success(`Welcome back ${data.data.firstName}`);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutation.mutate(data);
  };

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
              label="Email"
              defaultValue="mike.jackson@example.com"
              {...register("email", { required: true })}
              error={!!errors.email}
              helperText={errors.email && "Please input your email!"}
            />
            <TextField
              variant="standard"
              label="Password"
              type="password"
              defaultValue="111111"
              {...register("password", { required: true })}
              error={!!errors.password}
              helperText={errors.password && "Please input your password!"}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Typography variant="body2">
                Don&apos;t have an account?
              </Typography>
              <Link href="/register">Register</Link>
            </Box>
            <Button variant="contained" type="submit">
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}
