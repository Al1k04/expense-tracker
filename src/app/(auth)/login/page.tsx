"use client";
import { Box, Button, Card, TextField, Typography } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type Inputs = {
  email: string;
  password: string;
};

export default function App() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      console.error("Login failed");
    }
    router.push("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card sx={{ py: "50px", px: "76px", minWidth: "500px" }}>
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "33px",
            mb: "15px",
            color: "primary.dark",
            fontWeight: "bold",
          }}
          variant="h3"
          component="h2"
        >
          Login
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <TextField
            id="outlined-basic"
            label="Enter your email address"
            variant="outlined"
            defaultValue="test"
            {...register("email")}
          />

          <TextField
            id="outlined-basic"
            label="Enter your password"
            variant="outlined"
            type="password"
            {...register("password", { required: true })}
          />
          {errors.password && <span>This field is required</span>}

          <Button variant="contained" type="submit" sx={{ mt: "15px" }}>
            Submit
          </Button>
        </form>
      </Card>
    </Box>
  );
}
