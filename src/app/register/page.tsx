"use client";

import { registerUser } from "@/api";
import { useUserContext } from "@/contexts/user";
import { emailPattern } from "@/utils/patterns";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

interface Inputs {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirm: string;
}

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const { setUser } = useUserContext();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (payload: any) => registerUser(payload),
    onSuccess: (res) => {
      setUser(res.data);
      router.push("/");
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutation.mutate({ ...data, role: "user", status: "Active" });
  };

  return (
    <Container sx={{ display: "flex", justifyContent: "center" }}>
      <Box sx={{ mt: 20 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Register
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: 400,
            }}
          >
            <TextField
              label="Email"
              {...register("email", {
                required: "Please input your email!",
                pattern: {
                  value: emailPattern,
                  message: "Please enter a valid email",
                },
              })}
              error={!!errors.email}
              helperText={errors.email && errors.email.message}
            />
            <TextField
              label="First name"
              {...register("firstName", {
                required: "Please input your first name!",
              })}
              error={!!errors.firstName}
              helperText={errors.firstName && errors.firstName.message}
            />
            <TextField
              label="Last name"
              {...register("lastName", {
                required: "Please input your last name!",
              })}
              error={!!errors.lastName}
              helperText={errors.lastName && errors.lastName.message}
            />
            <TextField
              label="Password"
              type="password"
              {...register("password", {
                required: "Please input your password!",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters!",
                },
              })}
              error={!!errors.password}
              helperText={errors.password && errors.password.message}
            />
            <TextField
              label="Confirm password"
              type="password"
              {...register("passwordConfirm", {
                required: "Please confirm your password!",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              error={!!errors.passwordConfirm}
              helperText={
                errors.passwordConfirm && errors.passwordConfirm.message
              }
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Typography variant="body2">Already have an account?</Typography>
              <Link href="/login">Login</Link>
            </Box>
            <Button variant="contained" type="submit">
              Register
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
}
