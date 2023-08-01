"use client";

import { getUserById, updateUser } from "@/api";
import FormInput from "@/components/FormInput";
import { useUserContext } from "@/contexts/user";

type Inputs = {
  email: string;
  role: string;
  status: string;
  firstName: string;
  lastName: string;
  telephone: string;
  address: string;
};
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const { handleSubmit, setValue, control } = useForm<Inputs>();
  const { user, setUser } = useUserContext();

  const query = useQuery({
    queryKey: ["user", user?.id],
    queryFn: async ({ queryKey }) => {
      const res = await getUserById(queryKey[1] as string);

      const { email, role, status, firstName, lastName, telephone, address } =
        res.data;

      setValue("email", email);
      setValue("role", role);
      setValue("status", status);
      setValue("firstName", firstName);
      setValue("lastName", lastName);
      setValue("telephone", telephone);
      setValue("address", address);

      return res;
    },
    enabled: !!user?.id,
  });

  const mutation = useMutation({
    mutationFn: (payload: any) => updateUser(payload),
    onSuccess: (res) => {
      setUser(res.data);
      toast.success("Update profile success!");
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutation.mutate({ ...data, id: user?.id });
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography sx={{ textAlign: "center" }} variant="h5">
        Profile
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            mt: 5,
            width: 400,
            mx: "auto",
          }}
        >
          <Box>
            <Typography variant="caption">Email</Typography>
            <FormInput name="email" control={control} disabled />
          </Box>

          <Box>
            <Typography variant="caption">Role</Typography>
            <FormInput name="role" control={control} disabled />
          </Box>
          <Box>
            <Typography variant="caption">Status</Typography>
            <FormInput name="status" control={control} disabled />
          </Box>
          <Box>
            <Typography variant="caption">First name</Typography>
            <FormInput
              name="firstName"
              control={control}
              rules={{
                required: "Please input your first name!",
              }}
            />
          </Box>
          <Box>
            <Typography variant="caption">Last name</Typography>
            <FormInput
              name="lastName"
              control={control}
              rules={{
                required: "Please input your last name!",
              }}
            />
          </Box>
          <Box>
            <Typography variant="caption">Telephone</Typography>
            <FormInput
              name="telephone"
              control={control}
              rules={{
                required: "Please input your telephone number!",
              }}
            />
          </Box>
          <Box>
            <Typography variant="caption">Address</Typography>
            <FormInput
              name="address"
              control={control}
              rules={{
                required: "Please input your address!",
              }}
            />
          </Box>
          <Button variant="contained" type="submit">
            Save
          </Button>
        </Box>
      </form>
    </Container>
  );
}
