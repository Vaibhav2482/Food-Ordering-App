import { Box, Button, Slide, Typography } from "@mui/material";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { useNavigate } from "react-router-dom";

import { useCart } from "../../context/CartContext";
import { formatCurrency } from "../../utils/formatCurrency";

function CartBar() {

    const { itemCount, subtotal } = useCart();
    const navigate = useNavigate();

    return (

        <Slide direction="up" in={itemCount > 0} mountOnEnter unmountOnExit>

            <Box
                sx={{
                    display: "flex",
                    position: "fixed",
                    // On mobile, sit just above the 64px bottom navigation bar.
                    bottom: { xs: 76, md: 16 },
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: { xs: "calc(100% - 24px)", sm: 420 },
                    zIndex: 10,
                    bgcolor: "#F58220",
                    color: "#fff",
                    borderRadius: 3,
                    boxShadow: "0 8px 24px rgba(0,0,0,.25)",
                    alignItems: "center",
                    justifyContent: "space-between",
                    px: 2.5,
                    py: 1.5,
                    cursor: "pointer"
                }}
                onClick={() => navigate("/checkout")}
            >

                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>

                    <ShoppingCartRoundedIcon />

                    <Box>

                        <Typography fontWeight={700} fontSize={14}>
                            {itemCount} {itemCount === 1 ? "item" : "items"}
                        </Typography>

                        <Typography fontSize={12} sx={{ opacity: 0.9 }}>
                            {formatCurrency(subtotal)}
                        </Typography>

                    </Box>

                </Box>

                <Button
                    variant="contained"
                    sx={{
                        bgcolor: "#fff",
                        color: "#F58220",
                        "&:hover": { bgcolor: "#fff", opacity: 0.9 }
                    }}
                >
                    Checkout
                </Button>

            </Box>

        </Slide>

    );

}

export default CartBar;
