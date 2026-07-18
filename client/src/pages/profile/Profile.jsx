import { useState } from "react";
import { Box, Button, Card, Container, Divider, TextField, Typography } from "@mui/material";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";
import { updateCustomer } from "../../services/authService";
import AddressBook from "./AddressBook";

function Profile() {

    const { customer, setAuth, token, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {

        logout();
        navigate("/");

    };

    const [formData, setFormData] = useState({
        fullName: customer.FullName,
        email: customer.Email,
        phone: customer.Phone
    });
    const [saving, setSaving] = useState(false);

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData((prev) => ({ ...prev, [name]: value }));

    };

    const handleSave = async () => {

        try {

            setSaving(true);

            const response = await updateCustomer(customer.CustomerId, formData);

            if (!response.success) {
                toast.error(response.message);
                return;
            }

            setAuth({ token, customer: response.data });
            toast.success("Profile updated.");

        } catch (error) {

            toast.error(error.response?.data?.message || "Failed to update profile.");

        } finally {

            setSaving(false);

        }

    };

    return (

        <Container maxWidth="sm" sx={{ py: { xs: 2.5, md: 4 } }}>

            <Typography variant="h4" sx={{ mb: { xs: 2, md: 3 } }}>
                My Profile
            </Typography>

            <Card sx={{ p: { xs: 2, md: 3 }, mb: { xs: 3, md: 4 } }}>

                <TextField
                    fullWidth
                    label="Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    margin="normal"
                />

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
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    margin="normal"
                />

                <Button
                    variant="contained"
                    sx={{ mt: 2 }}
                    disabled={saving}
                    onClick={handleSave}
                >
                    {saving ? "Saving..." : "Save Changes"}
                </Button>

            </Card>

            <Divider sx={{ mb: { xs: 3, md: 4 } }} />

            <AddressBook />

            <Button
                fullWidth
                variant="outlined"
                color="error"
                startIcon={<LogoutRoundedIcon />}
                sx={{ mt: { xs: 3, md: 4 } }}
                onClick={handleLogout}
            >
                Logout
            </Button>

        </Container>

    );

}

export default Profile;
