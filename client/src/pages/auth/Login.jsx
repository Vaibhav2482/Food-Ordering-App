import { useState } from "react";
import {
    Alert,
    Box,
    Button,
    IconButton,
    InputAdornment,
    Link,
    Paper,
    Tab,
    Tabs,
    TextField,
    Typography
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";
import { sendOtp } from "../../services/authService";

function Login() {

    const { login, loginWithOtp } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [tab, setTab] = useState(0);

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({ email: "", password: "" });

    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [demoOtp, setDemoOtp] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [otpError, setOtpError] = useState("");

    const redirectAfterLogin = () => {
        const redirectTo = location.state?.from?.pathname || "/";
        navigate(redirectTo, { replace: true });
    };

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
            redirectAfterLogin();

        } catch (error) {

            toast.error(error.response?.data?.message || "Login failed.");

        } finally {

            setLoading(false);

        }

    };

    const handleSendOtp = async () => {

        if (!/^[6-9]\d{9}$/.test(phone.trim())) {
            setPhoneError("Enter a valid 10-digit mobile number.");
            return;
        }

        setPhoneError("");

        try {

            setLoading(true);

            const response = await sendOtp(phone.trim());

            if (!response.success) {
                toast.error(response.message);
                return;
            }

            setOtpSent(true);
            setOtp("");
            setDemoOtp(response.data?.devOtp || "");
            toast.success(
                response.data?.devOtp
                    ? "OTP generated - shown below (demo mode)."
                    : "OTP sent to your mobile number."
            );

        } catch (error) {

            toast.error(error.response?.data?.message || "Failed to send OTP.");

        } finally {

            setLoading(false);

        }

    };

    const handleVerifyOtp = async (event) => {

        event.preventDefault();

        if (otp.trim().length !== 6) {
            setOtpError("Enter the 6-digit OTP.");
            return;
        }

        setOtpError("");

        try {

            setLoading(true);

            const response = await loginWithOtp(phone.trim(), otp.trim());

            if (!response.success) {
                toast.error(response.message);
                return;
            }

            toast.success(
                response.data?.isNewCustomer
                    ? "Welcome! Your account has been created."
                    : "Login successful."
            );
            redirectAfterLogin();

        } catch (error) {

            toast.error(error.response?.data?.message || "OTP verification failed.");

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
                onSubmit={tab === 0 ? handleSubmit : handleVerifyOtp}
            >

                <Typography variant="h4" fontWeight={800} color="#F58220" textAlign="center">
                    ChaiChakhna
                </Typography>

                <Typography textAlign="center" color="text.secondary" sx={{ mb: { xs: 1.5, sm: 2 } }}>
                    Login to your account
                </Typography>

                <Tabs
                    value={tab}
                    onChange={(event, value) => setTab(value)}
                    variant="fullWidth"
                    sx={{ mb: 1 }}
                >
                    <Tab label="Email" />
                    <Tab label="Mobile OTP" />
                </Tabs>

                {tab === 0 && (
                    <>
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
                    </>
                )}

                {tab === 1 && (
                    <>
                        <TextField
                            fullWidth
                            required
                            label="Mobile Number"
                            value={phone}
                            onChange={(event) => {
                                setPhone(event.target.value.replace(/\D/g, "").slice(0, 10));
                                if (phoneError) setPhoneError("");
                            }}
                            margin="normal"
                            error={Boolean(phoneError)}
                            helperText={phoneError}
                            disabled={otpSent}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">+91</InputAdornment>
                                )
                            }}
                        />

                        {!otpSent && (
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 2, height: 50, fontWeight: 700 }}
                                disabled={loading}
                                onClick={handleSendOtp}
                            >
                                {loading ? "Sending..." : "Send OTP"}
                            </Button>
                        )}

                        {otpSent && (
                            <>
                                {demoOtp && (
                                    <Alert severity="info" sx={{ mt: 1 }}>
                                        Demo mode: your OTP is <strong>{demoOtp}</strong>
                                    </Alert>
                                )}

                                <TextField
                                    fullWidth
                                    required
                                    label="Enter OTP"
                                    value={otp}
                                    onChange={(event) => {
                                        setOtp(event.target.value.replace(/\D/g, "").slice(0, 6));
                                        if (otpError) setOtpError("");
                                    }}
                                    margin="normal"
                                    error={Boolean(otpError)}
                                    helperText={otpError}
                                    inputProps={{ inputMode: "numeric" }}
                                />

                                <Button
                                    fullWidth
                                    type="submit"
                                    variant="contained"
                                    sx={{ mt: 2, height: 50, fontWeight: 700 }}
                                    disabled={loading}
                                >
                                    {loading ? "Verifying..." : "Verify & Login"}
                                </Button>

                                <Button
                                    fullWidth
                                    variant="text"
                                    sx={{ mt: 1 }}
                                    disabled={loading}
                                    onClick={() => {
                                        setOtpSent(false);
                                        setOtp("");
                                        setDemoOtp("");
                                    }}
                                >
                                    Change number / Resend OTP
                                </Button>
                            </>
                        )}
                    </>
                )}

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
