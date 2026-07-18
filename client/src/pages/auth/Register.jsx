import { useState } from "react";
import { Box, Button, Link, Paper, TextField, Typography } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";

const emptyErrors = { fullName: "", email: "", phone: "", password: "" };

function Register() {

    const { register, login } = useAuth();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        password: ""
    });
    const [errors, setErrors] = useState(emptyErrors);

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData((prev) => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }

    };

    const validate = () => {

        const nextErrors = {
            fullName: formData.fullName.trim() === "" ? "Full Name is required." : "",
            email: formData.email.trim() === "" ? "Email is required." : "",
            phone: formData.phone.trim() === "" ? "Phone is required." : "",
            password: formData.password.trim() === "" ? "Password is required." : ""
        };

        setErrors(nextErrors);

        return Object.values(nextErrors).every((error) => error === "");

    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        if (!validate()) {
            return;
        }

        try {

            setLoading(true);

            const response = await register(
                formData.fullName,
                formData.email,
                formData.phone,
                formData.password
            );

            if (!response.success) {
                toast.error(response.message);
                return;
            }

            const loginResponse = await login(formData.email, formData.password);

            if (!loginResponse.success) {
                toast.success("Account created. Please log in.");
                navigate("/login");
                return;
            }

            toast.success("Welcome to ChaiChakhna!");
            navigate("/");

        } catch (error) {

            toast.error(error.response?.data?.message || "Registration failed.");

        } finally {

            setLoading(false);

        }

    };

    return (

        <Box
            sx={{
                minHeight: "80vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: 2
            }}
        >

            <Paper
                elevation={0}
                sx={{ width: 440, maxWidth: "100%", p: { xs: 3, sm: 5 }, border: "1px solid #E5E7EB" }}
                component="form"
                noValidate
                onSubmit={handleSubmit}
            >

                <Typography variant="h4" fontWeight={800} color="#F58220" textAlign="center">
                    ChaiChakhna
                </Typography>

                <Typography textAlign="center" color="text.secondary" sx={{ mb: { xs: 2.5, sm: 4 } }}>
                    Create your account
                </Typography>

                <TextField
                    fullWidth
                    required
                    label="Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    margin="normal"
                    error={Boolean(errors.fullName)}
                    helperText={errors.fullName}
                />

                <TextField
                    fullWidth
                    required
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    margin="normal"
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                />

                <TextField
                    fullWidth
                    required
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    margin="normal"
                    error={Boolean(errors.phone)}
                    helperText={errors.phone}
                />

                <TextField
                    fullWidth
                    required
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    margin="normal"
                    error={Boolean(errors.password)}
                    helperText={errors.password}
                />

                <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, height: 50, fontWeight: 700 }}
                    disabled={loading}
                >
                    {loading ? "Creating Account..." : "Create Account"}
                </Button>

                <Typography textAlign="center" sx={{ mt: 3 }}>
                    Already have an account?{" "}
                    <Link component={RouterLink} to="/login">
                        Login
                    </Link>
                </Typography>

            </Paper>

        </Box>

    );

}

export default Register;
