import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router";
import authService from "../services/authServices";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string("Enter your email")
    .email("Invalid email")
    .required("Email is required"),
  password: Yup.string("Enter your password")
    .min(6, "Password should be of minimum 6 characters length")
    .required("Password is required"),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setMessage("");
      setIsError(false);
      try {
        await authService.login(values.email, values.password);
        navigate("/dashboard");
      } catch (error) {
        setMessage(error.message || "Something went wrong. Please try again");
        setIsError(true);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Box
      component="section"
      className="flex felx-col min-h-screen items-center"
    >
      <Box
        component="div"
        className="m-auto p-5 rounded bg-green-100 border-2 flex flex-col gap-4 w-full md:w-[400px]"
      >
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Login
        </Typography>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          <TextField
            type="email"
            name="email"
            id="email"
            {...formik.getFieldProps("email")}
            onChange={formik.handleChange}
            value={formik.values.email}
            margin="normal"
            label="Email"
            error={formik.touched.email && !!formik.errors.email}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            type="password"
            id="password"
            name="password"
            {...formik.getFieldProps("password")}
            onChange={formik.handleChange}
            value={formik.values.password}
            margin="normal"
            label="Password"
            error={formik.touched.password && !!formik.errors.password}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button variant="contained" type="submit" disabled={loading}>
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
          {message && (
            <Alert severity={isError ? "error" : "success"} className="mt-2">
              {message}
            </Alert>
          )}
        </form>
      </Box>
    </Box>
  );
};
export default LoginForm;
