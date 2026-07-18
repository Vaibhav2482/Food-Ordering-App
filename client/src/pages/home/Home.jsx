import { useEffect, useState } from "react";
import { Avatar, Box, Button, Card, Container, Divider, Grid, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import SpaRoundedIcon from "@mui/icons-material/SpaRounded";
import CleaningServicesRoundedIcon from "@mui/icons-material/CleaningServicesRounded";
import HealthAndSafetyRoundedIcon from "@mui/icons-material/HealthAndSafetyRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import RestaurantMenuRoundedIcon from "@mui/icons-material/RestaurantMenuRounded";

import { getAllCategories } from "../../services/categoryService";
import { getAllMenu } from "../../services/menuService";
import { useBranch } from "../../context/BranchContext";
import LoadingSkeleton from "../../components/common/LoadingSkeleton";
import CartBar from "../../components/common/CartBar";
import MenuItemRow from "../menu/MenuItemRow";
import { getCategoryIcon } from "../../utils/categoryIcon";
import logo from "../../assets/logo/chaichakhna-logo.jpg";
import BranchBar from "./BranchBar";

const TRUST_STRIP = [
    { icon: SpaRoundedIcon, label: "Pure Vegetarian" },
    { icon: CleaningServicesRoundedIcon, label: "Hygienic & Clean" },
    { icon: HealthAndSafetyRoundedIcon, label: "No Refined Oil, No Additives" },
    { icon: VerifiedRoundedIcon, label: "No Food Color" }
];

function Home() {

    const navigate = useNavigate();
    const { selectedBranchId, loading: branchLoading } = useBranch();

    const [categories, setCategories] = useState([]);
    const [popularItems, setPopularItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (branchLoading || !selectedBranchId) {
            return;
        }

        (async () => {

            try {

                setLoading(true);

                const [categoryResponse, menuResponse] = await Promise.all([
                    getAllCategories(),
                    getAllMenu(selectedBranchId)
                ]);

                if (categoryResponse.success) {
                    setCategories(
                        categoryResponse.data
                            .filter((category) => category.IsActive)
                            .sort((a, b) => a.DisplayOrder - b.DisplayOrder)
                    );
                }

                if (menuResponse.success) {
                    setPopularItems(
                        menuResponse.data.filter((item) => item.IsPopular && item.IsAvailable && item.IsActive).slice(0, 6)
                    );
                }

            } catch {

                toast.error("Failed to load menu. Please try again.");

            } finally {

                setLoading(false);

            }

        })();

    }, [selectedBranchId, branchLoading]);

    return (

        <>

        <Box>

            <Box
                sx={{
                    position: "relative",
                    overflow: "hidden",
                    background: "linear-gradient(135deg, #FFE8D1 0%, #FFFBF6 100%)",
                    py: { xs: 4, md: 9 }
                }}
            >

                <Box
                    component="img"
                    src={logo}
                    alt=""
                    aria-hidden="true"
                    sx={{
                        position: "absolute",
                        top: -40,
                        right: -60,
                        width: { xs: 220, md: 320 },
                        opacity: 0.12,
                        pointerEvents: "none"
                    }}
                />

                <Container maxWidth="lg" sx={{ position: "relative" }}>

                    <Typography variant="h2" sx={{ fontSize: { xs: 28, md: 56 } }}>
                        Fresh Chai, <Box component="span" sx={{ color: "#F58220" }}>Delivered Hot.</Box>
                    </Typography>

                    <Typography variant="h6" color="text.secondary" sx={{ mt: 1.5, maxWidth: 560 }}>
                        Authentic chai, snacks and comfort food from ChaiChakhna Company —
                        order online and get it delivered fresh.
                    </Typography>

                    <Stack direction="row" spacing={1.5} sx={{ mt: { xs: 2.5, md: 4 } }}>

                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => navigate("/menu")}
                        >
                            Order Now
                        </Button>

                        <Button
                            variant="outlined"
                            size="large"
                            onClick={() => navigate("/menu")}
                        >
                            View Menu
                        </Button>

                    </Stack>

                    <Stack direction="row" spacing={1} sx={{ mt: { xs: 2.5, md: 4 }, flexWrap: "wrap", gap: 1 }}>

                        {TRUST_STRIP.map(({ icon: Icon, label }) => (

                            <Stack
                                key={label}
                                direction="row"
                                spacing={0.75}
                                sx={{
                                    alignItems: "center",
                                    bgcolor: "rgba(255,255,255,0.7)",
                                    border: "1px solid #F0D9BF",
                                    borderRadius: 5,
                                    px: 1.5,
                                    py: 0.5
                                }}
                            >
                                <Icon sx={{ fontSize: 18, color: "#0F766E" }} />
                                <Typography variant="body2" fontWeight={600}>
                                    {label}
                                </Typography>
                            </Stack>

                        ))}

                    </Stack>

                </Container>

            </Box>

            <Container maxWidth="lg" sx={{ pt: { xs: 2.5, md: 4 } }}>

                <BranchBar />

            </Container>

            <Container maxWidth="lg" sx={{ pb: { xs: 4, md: 6 } }}>

                <Typography variant="h4" sx={{ mb: { xs: 2, md: 3 } }}>
                    Browse by Category
                </Typography>

                {loading ? (

                    <LoadingSkeleton count={4} />

                ) : (

                    <Grid container spacing={{ xs: 1.5, md: 3 }}>

                        {categories.map((category) => {

                            const CategoryIcon = getCategoryIcon(category.CategoryName);

                            return (

                                <Grid key={category.CategoryId} size={{ xs: 6, sm: 4, md: 3 }}>

                                    <Card
                                        sx={{
                                            cursor: "pointer",
                                            height: "100%",
                                            p: { xs: 1.5, md: 2.5 },
                                            textAlign: "center",
                                            transition: "transform .15s ease, box-shadow .15s ease",
                                            "&:hover": {
                                                transform: "translateY(-3px)",
                                                boxShadow: "0 8px 20px rgba(0,0,0,.08)"
                                            }
                                        }}
                                        onClick={() => navigate(`/menu?category=${category.CategoryId}`)}
                                    >

                                        {category.ImageUrl ? (

                                            <Box
                                                component="img"
                                                src={category.ImageUrl}
                                                alt={category.CategoryName}
                                                sx={{ width: { xs: 44, md: 56 }, height: { xs: 44, md: 56 }, borderRadius: "50%", objectFit: "cover", mx: "auto", mb: { xs: 1, md: 1.5 } }}
                                            />

                                        ) : (

                                            <Avatar
                                                sx={{
                                                    width: { xs: 44, md: 56 },
                                                    height: { xs: 44, md: 56 },
                                                    bgcolor: "#FFE8D1",
                                                    color: "#F58220",
                                                    mx: "auto",
                                                    mb: { xs: 1, md: 1.5 }
                                                }}
                                            >
                                                <CategoryIcon />
                                            </Avatar>

                                        )}

                                        <Typography variant="subtitle1" fontWeight={700}>
                                            {category.CategoryName}
                                        </Typography>

                                        {category.Description && (
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{
                                                    mt: 0.5,
                                                    display: "-webkit-box",
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: "vertical",
                                                    overflow: "hidden"
                                                }}
                                            >
                                                {category.Description}
                                            </Typography>
                                        )}

                                    </Card>

                                </Grid>

                            );

                        })}

                    </Grid>

                )}

            </Container>

            {popularItems.length > 0 && (

                <Container maxWidth="lg" sx={{ pb: { xs: 5, md: 8 } }}>

                    <Typography variant="h4" sx={{ mb: { xs: 2, md: 3 } }}>
                        Popular Right Now
                    </Typography>

                    <Card sx={{ px: { xs: 2, md: 3 } }}>

                        <Stack divider={<Divider />}>

                            {popularItems.map((item) => (
                                <MenuItemRow key={item.MenuItemId} item={item} />
                            ))}

                        </Stack>

                    </Card>

                    <Box sx={{ textAlign: "center", mt: 4 }}>

                        <Button
                            variant="text"
                            endIcon={<RestaurantMenuRoundedIcon />}
                            onClick={() => navigate("/menu")}
                        >
                            Explore Full Menu
                        </Button>

                    </Box>

                </Container>

            )}

        </Box>

        <CartBar />

        </>

    );

}

export default Home;
