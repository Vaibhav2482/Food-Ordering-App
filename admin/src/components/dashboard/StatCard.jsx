import {
    Card,
    CardContent,
    Typography,
    Box,
    Skeleton
} from "@mui/material";

function StatCard({

    title,
    value,
    icon,
    color,
    subtitle,
    loading,
    onClick

}) {

    return (

        <Card

            elevation={0}

            onClick={onClick}

            sx={{

                borderRadius: 3,

                border: "1px solid #ECECEC",

                transition: "0.2s",

                height: "100%",

                cursor: onClick ? "pointer" : "default",

                "&:hover": {

                    transform: onClick ? "translateY(-2px)" : "none",

                    boxShadow: onClick ? "0 8px 20px rgba(0,0,0,0.06)" : "none"

                }

            }}

        >

            <CardContent
                sx={{
                    p: 2,
                    "&:last-child": { pb: 2 }
                }}
            >

                <Box

                    display="flex"

                    justifyContent="space-between"

                    alignItems="center"

                    gap={1.5}

                >

                    <Box flex={1} sx={{ minWidth: 0 }}>

                        {

                            loading

                                ?

                                <Skeleton width={80} height={18} />

                                :

                                <Typography

                                    color="text.secondary"

                                    fontSize={12.5}

                                    fontWeight={600}

                                    noWrap

                                >

                                    {title}

                                </Typography>

                        }

                        {

                            loading

                                ?

                                <Skeleton
                                    width={90}
                                    height={34}
                                />

                                :

                                <Typography

                                    variant="h6"

                                    fontWeight={800}

                                    mt={0.25}

                                    noWrap

                                >

                                    {value}

                                </Typography>

                        }

                        {

                            loading

                                ?

                                <Skeleton
                                    width={90}
                                    height={16}
                                />

                                :

                                <Typography

                                    mt={0.25}

                                    fontSize={11.5}

                                    color="text.secondary"

                                    noWrap

                                >

                                    {subtitle}

                                </Typography>

                        }

                    </Box>

                    <Box

                        sx={{

                            width: 42,

                            height: 42,

                            flexShrink: 0,

                            borderRadius: 2.5,

                            bgcolor: `${color}15`,

                            color,

                            display: "flex",

                            justifyContent: "center",

                            alignItems: "center",

                            "& svg": {

                                fontSize: 22

                            }

                        }}

                    >

                        {icon}

                    </Box>

                </Box>

            </CardContent>

        </Card>

    );

}

export default StatCard;
