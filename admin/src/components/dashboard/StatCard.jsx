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
    loading

}) {

    return (

        <Card

            elevation={0}

            sx={{

                borderRadius: 4,

                border: "1px solid #ECECEC",

                transition: "0.25s",

                height: "100%",

                "&:hover": {

                    transform: "translateY(-4px)",

                    boxShadow: "0 12px 28px rgba(0,0,0,0.08)"

                }

            }}

        >

            <CardContent
                sx={{
                    p: 3
                }}
            >

                <Box

                    display="flex"

                    justifyContent="space-between"

                    alignItems="center"

                >

                    <Box flex={1}>

                        {

                            loading

                                ?

                                <Skeleton width={90} />

                                :

                                <Typography

                                    color="text.secondary"

                                    fontSize={14}

                                    fontWeight={600}

                                >

                                    {title}

                                </Typography>

                        }

                        {

                            loading

                                ?

                                <Skeleton
                                    width={120}
                                    height={55}
                                />

                                :

                                <Typography

                                    variant="h4"

                                    fontWeight={800}

                                    mt={1}

                                >

                                    {value}

                                </Typography>

                        }

                        {

                            loading

                                ?

                                <Skeleton
                                    width={110}
                                />

                                :

                                <Typography

                                    mt={1}

                                    fontSize={13}

                                    color="text.secondary"

                                >

                                    {subtitle}

                                </Typography>

                        }

                    </Box>

                    <Box

                        sx={{

                            width: 70,

                            height: 70,

                            borderRadius: 4,

                            bgcolor: `${color}15`,

                            color,

                            display: "flex",

                            justifyContent: "center",

                            alignItems: "center",

                            "& svg": {

                                fontSize: 34

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