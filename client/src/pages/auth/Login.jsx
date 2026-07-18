import { useState } from "react";
import {
    Box,
    Button,
    IconButton,
    InputAdornment,
    Link,
    Paper,
    TextField,
    Typography
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";

function Login() {

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({ email: "", password: "" });

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData((prev) => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }

    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        const nextErrors = {
            email: formData.email.trim() === "" ? "Email is required." : "",
            password: formData.password.trim() === "" ? "Password is required." : ""
        };

        setErrors(nextErrors);

        if (nextErrors.email || nextErrors.password) {
            return;
        }

        try {

            setLoading(true);

            const response = await login(formData.email, formData.password);

            if (!response.success) {
                toast.error(response.message);
                return;
            }

            toast.success(response.message || "Login successful.");

            const redirectTo = location.state?.from?.pathname || "/";
            navigate(redirectTo, { replace: true });

        } catch (error) {

            toast.error(error.response?.data?.message || "Login failed.");

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
                sx={{ width: 420, maxWidth: "100%", p: { xs: 3, sm: 5 }, border: "1px solid #E5E7EB" }}
                component="form"
                noValidate
                onSubmit={handleSubmit}
            >

                <Typography variant="h4" fontWeight={800} color="#F58220" textAlign="center">
                    ChaiChakhna
                </Typography>

                <Typography textAlign="center" color="text.secondary" sx={{ mb: { xs: 2.5, sm: 4 } }}>
                    Login to your account
                </Typography>

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
                    margin="normal"
                    label="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    error={Boolean(errors.password)}
                    helperText={errors.password}
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />

                <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, height: 50, fontWeight: 700 }}
                    disabled={loading}
                >
                    {loading ? "Logging In..." : "Login"}
                </Button>

                <Typography textAlign="center" sx={{ mt: 3 }}>
                    Don&apos;t have an account?{" "}
                    <Link component={RouterLink} to="/register">
                        Create one
                    </Link>
                </Typography>

            </Paper>

        </Box>

    );

}

export default Login;
