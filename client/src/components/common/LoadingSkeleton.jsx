import { Card, CardContent, Grid, Skeleton } from "@mui/material";

function LoadingSkeleton({ count = 6 }) {

    return (

        <Grid container spacing={3}>

            {Array.from({ length: count }).map((_, index) => (

                <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>

                    <Card>

                        <Skeleton variant="rectangular" height={160} />

                        <CardContent>

                            <Skeleton variant="text" width="70%" height={28} />
                            <Skeleton variant="text" width="40%" />
                            <Skeleton variant="text" width="30%" />

                        </CardContent>

                    </Card>

                </Grid>

            ))}

        </Grid>

    );

}

export default LoadingSkeleton;
