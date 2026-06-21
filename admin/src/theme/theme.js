import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "light",

        primary: {
            main: "#F97316",
            light: "#FB923C",
            dark: "#EA580C"
        },

        secondary: {
            main: "#FFEDD5"
        },

        background: {
            default: "#F8FAFC",
            paper: "#FFFFFF"
        },

        text: {
            primary: "#111827",
            secondary: "#6B7280"
        },

        divider: "#E5E7EB",

        success: {
            main: "#22C55E"
        },

        warning: {
            main: "#F59E0B"
        },

        error: {
            main: "#EF4444"
        },

        info: {
            main: "#3B82F6"
        }
    },

    typography: {
        fontFamily: "'Plus Jakarta Sans', sans-serif",

        h1: {
            fontWeight: 700
        },

        h2: {
            fontWeight: 700
        },

        h3: {
            fontWeight: 700
        },

        h4: {
            fontWeight: 700
        },

        h5: {
            fontWeight: 700
        },

        h6: {
            fontWeight: 600
        },

        subtitle1: {
            fontWeight: 600
        },

        body1: {
            fontSize: "15px",
            color: "#374151"
        },

        body2: {
            fontSize: "14px",
            color: "#6B7280"
        },

        button: {
            textTransform: "none",
            fontWeight: 600,
            fontSize: "15px"
        }
    },

    shape: {
        borderRadius: 16
    },

    components: {

        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: "#F8FAFC",
                    margin: 0,
                    padding: 0
                }
            }
        },

        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 18,
                    boxShadow: "0 8px 24px rgba(15,23,42,0.05)",
                    backgroundImage: "none"
                }
            }
        },

        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 20,
                    boxShadow: "0 8px 24px rgba(15,23,42,0.05)"
                }
            }
        },

        MuiButton: {
            defaultProps: {
                disableElevation: true
            },
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    padding: "10px 22px",
                    fontWeight: 600
                },

                containedPrimary: {
                    backgroundColor: "#F97316",

                    "&:hover": {
                        backgroundColor: "#EA580C"
                    }
                },

                outlinedPrimary: {
                    borderColor: "#F97316",

                    "&:hover": {
                        backgroundColor: "#FFF7ED"
                    }
                }
            }
        },

        MuiTextField: {
            defaultProps: {
                variant: "outlined",
                size: "medium"
            }
        },

        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: 12,

                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#F97316"
                    },

                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#F97316",
                        borderWidth: 2
                    }
                }
            }
        },

        MuiTableContainer: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    boxShadow: "0 8px 24px rgba(15,23,42,.05)"
                }
            }
        },

        MuiTableHead: {
            styleOverrides: {
                root: {
                    backgroundColor: "#FFF7ED"
                }
            }
        },

        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    fontWeight: 600
                }
            }
        },

        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: "#FFFFFF",
                    borderRight: "1px solid #E5E7EB"
                }
            }
        },

        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: "#FFFFFF",
                    color: "#111827",
                    boxShadow: "0 2px 12px rgba(15,23,42,.05)"
                }
            }
        }
    }
});

export default theme;