import { useEffect, useMemo, useRef, useState } from "react";
import { Box, Chip, Container, Divider, InputAdornment, Stack, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import RestaurantMenuRoundedIcon from "@mui/icons-material/RestaurantMenuRounded";
import toast from "react-hot-toast";

import { getAllCategories } from "../../services/categoryService";
import { getAllMenu } from "../../services/menuService";
import LoadingSkeleton from "../../components/common/LoadingSkeleton";
import EmptyState from "../../components/common/EmptyState";
import CartBar from "../../components/common/CartBar";
import MenuItemRow from "./MenuItemRow";
import { useBranch } from "../../context/BranchContext";

function Menu() {

    const { selectedBranchId, loading: branchLoading } = useBranch();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const NAV_OFFSET = isMobile ? 96 : 128;

    const [categories, setCategories] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [activeCategoryId, setActiveCategoryId] = useState(null);

    const sectionRefs = useRef({});
    const chipRefs = useRef({});

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
                    setMenuItems(menuResponse.data);
                }

            } catch {

                toast.error("Failed to load the menu. Please try again.");

            } finally {

                setLoading(false);

            }

        })();

    }, [selectedBranchId, branchLoading]);

    const sections = useMemo(() => {

        const search = searchText.trim().toLowerCase();

        return categories
            .map((category) => ({
                ...category,
                items: menuItems.filter((item) =>
                    item.CategoryId === category.CategoryId &&
                    item.IsActive &&
                    item.ItemName.toLowerCase().includes(search)
                )
            }))
            .filter((category) => category.items.length > 0);

    }, [categories, menuItems, searchText]);

    useEffect(() => {

        if (loading || sections.length === 0) {
            return;
        }

        setActiveCategoryId((current) =>
            sections.some((section) => section.CategoryId === current)
                ? current
                : sections[0].CategoryId
        );

        const observer = new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {
                        setActiveCategoryId(Number(entry.target.dataset.categoryId));
                    }

                });

            },
            { rootMargin: `-${NAV_OFFSET}px 0px -70% 0px`, threshold: 0 }
        );

        Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));

        return () => observer.disconnect();

    }, [loading, sections, NAV_OFFSET]);

    useEffect(() => {

        chipRefs.current[activeCategoryId]?.scrollIntoView({
            behavior: "smooth",
            inline: "center",
            block: "nearest"
        });

    }, [activeCategoryId]);

    const scrollToSection = (categoryId) => {

        sectionRefs.current[categoryId]?.scrollIntoView({ behavior: "smooth", block: "start" });

    };

    return (

        <>

        <Container maxWidth="md" sx={{ py: { xs: 2.5, md: 4 } }}>

            <Typography variant="h4" sx={{ mb: { xs: 2, md: 3 } }}>
                Our Menu
            </Typography>

            <TextField
                fullWidth
                placeholder="Search for chai, snacks..."
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                sx={{ mb: { xs: 2, md: 3 } }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchRoundedIcon />
                        </InputAdornment>
                    )
                }}
            />

            {loading ? (

                <LoadingSkeleton count={6} />

            ) : sections.length === 0 ? (

                <EmptyState
                    icon={<RestaurantMenuRoundedIcon sx={{ fontSize: 56, color: "text.secondary" }} />}
                    title="No items found"
                    subtitle="Try a different search."
                />

            ) : (

                <>

                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                            position: "sticky",
                            top: { xs: 56, md: 72 },
                            zIndex: 2,
                            bgcolor: "background.default",
                            py: 1.5,
                            mb: 1,
                            overflowX: "auto",
                            "&::-webkit-scrollbar": { display: "none" }
                        }}
                    >

                        {sections.map((section) => (

                            <Chip
                                key={section.CategoryId}
                                ref={(el) => { chipRefs.current[section.CategoryId] = el; }}
                                label={section.CategoryName}
                                color={activeCategoryId === section.CategoryId ? "primary" : "default"}
                                onClick={() => scrollToSection(section.CategoryId)}
                                sx={{ flexShrink: 0 }}
                            />

                        ))}

                    </Stack>

                    {sections.map((section, index) => (

                        <Box
                            key={section.CategoryId}
                            ref={(el) => { sectionRefs.current[section.CategoryId] = el; }}
                            data-category-id={section.CategoryId}
                            sx={{ scrollMarginTop: NAV_OFFSET, mb: 2 }}
                        >

                            <Typography variant="h6" fontWeight={700} sx={{ pt: 1 }}>
                                {section.CategoryName}
                            </Typography>

                            <Divider sx={{ mt: 1 }} />

                            <Stack divider={<Divider />}>

                                {section.items.map((item) => (
                                    <MenuItemRow key={item.MenuItemId} item={item} />
                                ))}

                            </Stack>

                            {index !== sections.length - 1 && <Box sx={{ height: 8 }} />}

                        </Box>

                    ))}

                </>

            )}

        </Container>

        <CartBar />

        </>

    );

}

export default Menu;
