"use client";
import { Box, Button, Card, TextField, Typography } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signupSchema } from "@/lib/validation";
import { SignupInput } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

export default function App() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit: SubmitHandler<SignupInput> = async (data) => {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    console.log(await response.json());
    if (!response.ok) {
      return toast.error("SignUp failed");
    }

    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
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
          SignUp
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
            label="Enter your name"
            variant="outlined"
            {...register("name")}
          />
          <TextField
            id="outlined-basic"
            label="Enter your email address"
            variant="outlined"
            {...register("email")}
          />
          {errors.email && (
            <span className="text-red-600">{errors.email.message}</span>
          )}

          <TextField
            id="outlined-basic"
            label="Enter your password"
            variant="outlined"
            type="password"
            {...register("password")}
          />

          {errors.password && (
            <span className="text-red-600">{errors.password.message}</span>
          )}

          <TextField
            id="outlined-basic"
            label="Confirm your password"
            variant="outlined"
            type="password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <span className="text-red-600">
              {errors.confirmPassword.message}
            </span>
          )}
          <Button variant="contained" type="submit" sx={{ mt: "15px" }}>
            Submit
          </Button>
        </form>
      </Card>
    </Box>
  );
}
