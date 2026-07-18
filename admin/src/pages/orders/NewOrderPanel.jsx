import { useEffect, useState } from "react";
import {
    Box,
    Divider,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    ToggleButton,
    ToggleButtonGroup
} from "@mui/material";
import toast from "react-hot-toast";

import { getActiveTables } from "../../services/tableService";
import OrderBuilder from "./OrderBuilder";

function NewOrderPanel({ branches, defaultBranchId, ownerMode = true, onCreated }) {

    const [branchId, setBranchId] = useState(defaultBranchId || branches[0]?.BranchId || "");
    const [deliveryType, setDeliveryType] = useState("Dine In");
    const [tableNumber, setTableNumber] = useState("");
    const [restaurantTables, setRestaurantTables] = useState([]);

    useEffect(() => {

        if (!branchId) {
            return;
        }

        (async () => {

            try {

                const response = await getActiveTables(branchId);

                if (response.success) {
                    setRestaurantTables(response.data);
                }

            } catch {

                toast.error("Failed to load tables for this branch.");

            }

        })();

        setTableNumber("");

    }, [branchId]);

    return (

        <Box>

            <Grid container spacing={2} sx={{ mb: 2 }}>

                {ownerMode && (

                    <Grid size={{ xs: 12, md: 6 }}>

                        <FormControl fullWidth required>

                            <InputLabel>Branch</InputLabel>

                            <Select
                                label="Branch"
                                value={branchId}
                                onChange={(event) => setBranchId(event.target.value)}
                            >

                                {branches.map((branch) => (
                                    <MenuItem key={branch.BranchId} value={branch.BranchId}>
                                        {branch.BranchName}
                                    </MenuItem>
                                ))}

                            </Select>

                        </FormControl>

                    </Grid>

                )}

                <Grid size={{ xs: 12, md: 6 }}>

                    <ToggleButtonGroup
                        exclusive
                        fullWidth
                        color="primary"
                        value={deliveryType}
                        onChange={(event, value) => value && setDeliveryType(value)}
                    >

                        <ToggleButton value="Dine In">Dine In</ToggleButton>
                        <ToggleButton value="Takeaway">Takeaway</ToggleButton>

                    </ToggleButtonGroup>

                </Grid>

                {deliveryType === "Dine In" && (

                    <Grid size={{ xs: 12, md: 6 }}>

                        <FormControl fullWidth required error={restaurantTables.length === 0}>

                            <InputLabel>Table</InputLabel>

                            <Select
                                label="Table"
                                value={tableNumber}
                                onChange={(event) => setTableNumber(event.target.value)}
                            >

                                {restaurantTables.map((table) => (
                                    <MenuItem key={table.TableId} value={table.TableName}>
                                        {table.TableName}
                                        {table.Capacity ? ` (seats ${table.Capacity})` : ""}
                                    </MenuItem>
                                ))}

                            </Select>

                            {restaurantTables.length === 0 && (
                                <FormHelperText>
                                    No tables set up for this branch yet — add one under Tables.
                                </FormHelperText>
                            )}

                        </FormControl>

                    </Grid>

                )}

            </Grid>

            <Divider sx={{ mb: 2.5 }} />

            {branchId && (deliveryType === "Takeaway" || tableNumber) && (

                <OrderBuilder
                    key={`${branchId}-${deliveryType}-${tableNumber}`}
                    branchId={branchId}
                    deliveryType={deliveryType}
                    tableNumber={tableNumber}
                    onCreated={onCreated}
                />

            )}

        </Box>

    );

}

export default NewOrderPanel;
