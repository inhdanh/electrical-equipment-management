"use client";

import { useUserContext } from "@/contexts/user";
import { Box, Button, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

interface Inputs {
  email: string;
  password: string;
}

export default function Login() {
  const { setUser } = useUserContext();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setUser({
      id: "45a18267-ef49-48d5-a9b2-7462dbb34c44",
      firstName: "Mike",
      lastName: "Jackson",
      telephone: 5555555555,
      address: "789 Pine Lane, Meadowville, NY 10001, USA",
      email: "mike.jackson@example.com",
      role: "user",
      status: "inactive",
      createdAt: "2023-07-27T09:30:10Z",
      updatedAt: "2023-07-27T14:10:30Z",
    });
    router.push("/");
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
              defaultValue="test123456789"
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
