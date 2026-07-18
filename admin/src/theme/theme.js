import { createTheme } from "@mui/material/styles";

const theme = createTheme({

    palette: {

        mode: "light",

        primary: {
            main: "#F58220"
        },

        secondary: {
            main: "#0F766E"
        },

        background: {
            default: "#F5F6FA",
            paper: "#FFFFFF"
        },

        text: {
            primary: "#1F2937",
            secondary: "#6B7280"
        },

        success: {
            main: "#22C55E"
        },

        warning: {
            main: "#F59E0B"
        },

        error: {
            main: "#EF4444"
        },

        divider: "#E5E7EB"
    },

    spacing: 8,

    shape: {
        borderRadius: 14
    },

    typography: {

        fontFamily: [
            "Plus Jakarta Sans",
            "Inter",
            "sans-serif"
        ].join(","),

        h4: {
            fontWeight: 700,
            fontSize: "1.875rem",
            "@media (max-width:600px)": { fontSize: "1.25rem" }
        },

        h5: {
            fontWeight: 700,
            fontSize: "1.5rem",
            "@media (max-width:600px)": { fontSize: "1.125rem" }
        },

        h6: {
            fontWeight: 600,
            fontSize: "1.25rem",
            "@media (max-width:600px)": { fontSize: "1.0625rem" }
        },

        body1: {
            "@media (max-width:600px)": { fontSize: "0.9375rem" }
        },

        button: {
            textTransform: "none",
            fontWeight: 600,
            "@media (max-width:600px)": { fontSize: "0.875rem" }
        }

    },

    components: {

        MuiCssBaseline: {

            styleOverrides: {

                body: {
                    backgroundColor: "#F5F6FA"
                }

            }

        },

        MuiPaper: {

            styleOverrides: {

                root: {

                    borderRadius: 14,

                    backgroundImage: "none",

                    boxShadow:
                        "0 8px 30px rgba(0,0,0,.05)"

                }

            }

        },

        MuiCard: {

            styleOverrides: {

                root: {

                    borderRadius: 18,

                    boxShadow:
                        "0 8px 30px rgba(0,0,0,.05)"

                }

            }

        },

        MuiDrawer: {

            styleOverrides: {

                paper: {

                    background: "#FFFFFF",

                    borderRight:
                        "1px solid #ECECEC"

                }

            }

        },

        MuiAppBar: {

            styleOverrides: {

                root: {

                    background: "#FFFFFF",

                    color: "#1F2937",

                    boxShadow:
                        "0 1px 8px rgba(0,0,0,.05)"

                }

            }

        },

        MuiButton: {

            defaultProps: {

                disableElevation: true

            },

            styleOverrides: {

                root: {

                    borderRadius: 10,

                    padding: "10px 22px",

                    "@media (max-width:600px)": {
                        padding: "8px 16px"
                    }

                }

            }

        },

        MuiOutlinedInput: {

            styleOverrides: {

                root: {

                    borderRadius: 10

                }

            }

        }

    }

});

export default theme;