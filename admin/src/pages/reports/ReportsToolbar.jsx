import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField
} from "@mui/material";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import PrintRoundedIcon from "@mui/icons-material/PrintRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

function ReportsToolbar({

    reportType,
    setReportType,

    fromDate,
    setFromDate,

    toDate,
    setToDate,

    onSearch

}) {

    return (

        <Paper

            elevation={0}

            sx={{

                p: 3,

                borderRadius: 4,

                border: "1px solid #ECECEC",

                mb: 3

            }}

        >

            <Grid

                container

                spacing={2}

                alignItems="center"

            >

                <Grid
                    item
                    xs={12}
                    md={3}
                >

                    <FormControl fullWidth>

                        <InputLabel>

                            Report

                        </InputLabel>

                        <Select

                            value={reportType}

                            label="Report"

                            onChange={(event) =>

                                setReportType(
                                    event.target.value
                                )

                            }

                        >

                            <MenuItem value="daily">

                                Daily

                            </MenuItem>

                            <MenuItem value="weekly">

                                Weekly

                            </MenuItem>

                            <MenuItem value="monthly">

                                Monthly

                            </MenuItem>

                            <MenuItem value="custom">

                                Custom Date

                            </MenuItem>

                        </Select>

                    </FormControl>

                </Grid>

                {

                    reportType === "custom" &&

                    <>

                        <Grid
                            item
                            xs={12}
                            md={3}
                        >

                            <TextField

                                fullWidth

                                type="date"

                                label="From Date"

                                InputLabelProps={{
                                    shrink: true
                                }}

                                value={fromDate}

                                onChange={(event) =>

                                    setFromDate(
                                        event.target.value
                                    )

                                }

                            />

                        </Grid>

                        <Grid
                            item
                            xs={12}
                            md={3}
                        >

                            <TextField

                                fullWidth

                                type="date"

                                label="To Date"

                                InputLabelProps={{
                                    shrink: true
                                }}

                                value={toDate}

                                onChange={(event) =>

                                    setToDate(
                                        event.target.value
                                    )

                                }

                            />

                        </Grid>

                        <Grid
                            item
                            xs={12}
                            md={3}
                        >

                            <Box

                                display="flex"

                                height="100%"

                                alignItems="center"

                            >

                                <Button

                                    fullWidth

                                    variant="contained"

                                    startIcon={
                                        <SearchRoundedIcon />
                                    }

                                    onClick={onSearch}

                                >

                                    Search

                                </Button>

                                <Grid
    item
    xs={12}
    md={2}
>

    <Button

        fullWidth

        variant="outlined"

        startIcon={<DownloadRoundedIcon />}

    >

        Export

    </Button>

</Grid>

<Grid
    item
    xs={12}
    md={2}
>

    <Button

        fullWidth

        variant="outlined"

        startIcon={<PrintRoundedIcon />}

    >

        Print

    </Button>

</Grid>

                            </Box>

                        </Grid>

                    </>

                }

            </Grid>

        </Paper>

    );

}

export default ReportsToolbar;