import { useEffect, useMemo, useRef, useState } from "react";
import { Box, Chip, Container, Divider, InputAdornment, Stack, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";
import RestaurantMenuRoundedIcon from "@mui/icons-material/RestaurantMenuRounded";
import toast from "react-hot-toast";

import { getAllCategories } from "../../services/categoryService";
import { getAllMenu } from "../../services/menuService";
import LoadingSkeleton from "../../components/common/LoadingSkeleton";
import EmptyState from "../../components/common/EmptyState";
import CartBar from "../../components/common/CartBar";
import MenuItemRow from "./MenuItemRow";
import MenuItemDetailSheet from "./MenuItemDetailSheet";
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
    const [bestsellersOnly, setBestsellersOnly] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

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
                    item.ItemName.toLowerCase().includes(search) &&
                    (!bestsellersOnly || item.IsPopular)
                )
            }))
            .filter((category) => category.items.length > 0);

    }, [categories, menuItems, searchText, bestsellersOnly]);

    const totalItemCount = useMemo(
        () => sections.reduce((sum, section) => sum + section.items.length, 0),
        [sections]
    );

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

            <Box sx={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", mb: { xs: 2, md: 3 }, flexWrap: "wrap", gap: 1 }}>

                <Typography variant="h4">
                    Our Menu
                </Typography>

                {!loading && (
                    <Typography variant="body2" color="text.secondary">
                        {totalItemCount} {totalItemCount === 1 ? "item" : "items"}
                    </Typography>
                )}

            </Box>

            <Box sx={{ display: "flex", gap: 1.5, mb: { xs: 2, md: 3 }, alignItems: "center" }}>

                <TextField
                    fullWidth
                    placeholder="Search for chai, snacks..."
                    value={searchText}
                    onChange={(event) => setSearchText(event.target.value)}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            borderRadius: 5,
                            bgcolor: "#F3F4F6",
                            "& fieldset": { border: "none" }
                        }
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchRoundedIcon sx={{ color: "#F58220" }} />
                            </InputAdornment>
                        )
                    }}
                />

                <Chip
                    icon={<LocalFireDepartmentRoundedIcon sx={{ fontSize: 18 }} />}
                    label="Bestsellers"
                    onClick={() => setBestsellersOnly((prev) => !prev)}
                    sx={{
                        flexShrink: 0,
                        height: 40,
                        fontWeight: 700,
                        border: "none",
                        bgcolor: bestsellersOnly ? "#FFE8D1" : "#F3F4F6",
                        color: bestsellersOnly ? "#F58220" : "text.secondary",
                        "& .MuiChip-icon": { color: bestsellersOnly ? "#F58220" : "text.secondary" }
                    }}
                />

            </Box>

            {loading ? (

                <LoadingSkeleton count={6} />

            ) : sections.length === 0 ? (

                <EmptyState
                    icon={<RestaurantMenuRoundedIcon sx={{ fontSize: 56, color: "text.secondary" }} />}
                    title="No items found"
                    subtitle={
                        bestsellersOnly
                            ? "No bestsellers match your search — try clearing the filter."
                            : "Try a different search."
                    }
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

                        {sections.map((section) => {

                            const active = activeCategoryId === section.CategoryId;

                            return (

                                <Chip
                                    key={section.CategoryId}
                                    ref={(el) => { chipRefs.current[section.CategoryId] = el; }}
                                    label={section.CategoryName}
                                    onClick={() => scrollToSection(section.CategoryId)}
                                    sx={{
                                        flexShrink: 0,
                                        fontWeight: 700,
                                        border: "none",
                                        bgcolor: active ? "#FFE8D1" : "transparent",
                                        color: active ? "#F58220" : "text.secondary"
                                    }}
                                />

                            );

                        })}

                    </Stack>

                    {sections.map((section, index) => (

                        <Box
                            key={section.CategoryId}
                            ref={(el) => { sectionRefs.current[section.CategoryId] = el; }}
                            data-category-id={section.CategoryId}
                            sx={{ scrollMarginTop: NAV_OFFSET, mb: 2 }}
                        >

                            <Box sx={{ display: "flex", alignItems: "baseline", gap: 1, pt: 1 }}>

                                <Typography variant="h6" fontWeight={700}>
                                    {section.CategoryName}
                                </Typography>

                                <Typography variant="body2" color="text.secondary">
                                    ({section.items.length})
                                </Typography>

                            </Box>

                            <Divider sx={{ mt: 1 }} />

                            <Stack divider={<Divider />}>

                                {section.items.map((item) => (
                                    <MenuItemRow key={item.MenuItemId} item={item} onSelect={setSelectedItem} />
                                ))}

                            </Stack>

                            {index !== sections.length - 1 && <Box sx={{ height: 8 }} />}

                        </Box>

                    ))}

                </>

            )}

        </Container>

        <CartBar />

        <MenuItemDetailSheet
            item={selectedItem}
            open={Boolean(selectedItem)}
            onClose={() => setSelectedItem(null)}
        />

        </>

    );

}

export default Menu;
