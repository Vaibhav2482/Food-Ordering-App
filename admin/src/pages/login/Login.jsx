import {
    Box,
    Button,
    IconButton,
    InputAdornment,
    Paper,
    TextField,
    Typography
} from "@mui/material";

import {
    Visibility,
    VisibilityOff
} from "@mui/icons-material";

import {
    useEffect,
    useState
} from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { adminLogin } from "../../services/authService";

function Login() {

    const navigate = useNavigate();
  useEffect(() => {

    const admin = JSON.parse(

        localStorage.getItem("admin")

    );

    if (

        admin &&

        admin.AdminId

    ) {

        navigate(

            "/dashboard",

            {

                replace: true

            }

        );

    }

}, [navigate]);
    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({

        email: "",

        password: ""

    });

    const handleChange = (event) => {

        const {

            name,

            value

        } = event.target;

        setFormData((prev) => ({

            ...prev,

            [name]: value

        }));

    };

    const handleLogin = async () => {

        if (formData.email.trim() === "") {

            toast.error("Email is required.");

            return;

        }

        if (formData.password.trim() === "") {

            toast.error("Password is required.");

            return;

        }

        try {

            setLoading(true);

            const response = await adminLogin(formData);

            if (!response.success) {

                toast.error(response.message);

                return;

            }

            localStorage.setItem(

                "admin",

                JSON.stringify(response.data)

            );

            toast.success(response.message);

            navigate("/dashboard");

        }
        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Login failed."

            );

        }
        finally {

            setLoading(false);

        }

    };

    return (

        <Box

            sx={{

                minHeight: "100vh",

                display: "flex",

                justifyContent: "center",

                alignItems: "center",

                bgcolor: "#F8FAFC",

                p: 2

            }}

        >

            <Paper

                elevation={0}

                sx={{

                    width: 420,

                    p: 5,

                    borderRadius: 4,

                    border: "1px solid #E5E7EB"

                }}

            >

                <Typography

                    variant="h4"

                    fontWeight={800}

                    color="#F58220"

                    textAlign="center"

                >

                    ChaiChakhna

                </Typography>

                <Typography

                    textAlign="center"

                    color="text.secondary"

                    sx={{ mb: 4 }}

                >

                    Restaurant Admin Panel

                </Typography>

                <TextField

                    fullWidth

                    label="Email"

                    name="email"

                    value={formData.email}

                    onChange={handleChange}

                    margin="normal"

                />

                <TextField

                    fullWidth

                    margin="normal"

                    label="Password"

                    name="password"

                    value={formData.password}

                    onChange={handleChange}

                    type={

                        showPassword

                            ? "text"

                            : "password"

                    }

                    InputProps={{

                        endAdornment: (

                            <InputAdornment position="end">

                                <IconButton

                                    onClick={() =>

                                        setShowPassword(

                                            !showPassword

                                        )

                                    }

                                >

                                    {

                                        showPassword

                                            ?

                                            <VisibilityOff />

                                            :

                                            <Visibility />

                                    }

                                </IconButton>

                            </InputAdornment>

                        )

                    }}

                />

                <Button

                    fullWidth

                    variant="contained"

                    sx={{

                        mt: 4,

                        height: 50,

                        fontWeight: 700

                    }}

                    disabled={loading}

                    onClick={handleLogin}

                >

                    {

                        loading

                            ?

                            "Logging In..."

                            :

                            "Login"

                    }

                </Button>

            </Paper>

        </Box>

    );

}

export default Login;