import { useState } from "react";
import { Chip, FormControl, MenuItem, Select } from "@mui/material";

import {
    STATUS_COLOR,
    STATUS_ICON,
    isTerminal,
    isCancellable,
    getForwardStatuses
} from "../../utils/orderStatus";

export const CANCEL_VALUE = "__cancel__";

function QuickStatusControl({ order, onStatusChange, onCancelOrder, size = "small" }) {

    const [updating, setUpdating] = useState(false);

    if (isTerminal(order.OrderStatus)) {

        const StatusIcon = STATUS_ICON[order.OrderStatus];

        return (

            <Chip
                label={order.OrderStatus}
                color={STATUS_COLOR[order.OrderStatus] || "default"}
                icon={StatusIcon ? <StatusIcon fontSize="small" /> : undefined}
                size={size}
            />

        );

    }

    const forwardStatuses = getForwardStatuses(order.OrderStatus, order.DeliveryType);

    const handleChange = async (event) => {

        const value = event.target.value;

        setUpdating(true);

        if (value === CANCEL_VALUE) {
            await onCancelOrder(order.OrderId);
        } else {
            await onStatusChange(order.OrderId, value);
        }

        setUpdating(false);

    };

    return (

        <FormControl size={size} sx={{ minWidth: 170 }} disabled={updating}>

            <Select
                value={order.OrderStatus}
                onChange={handleChange}
                renderValue={(value) => (
                    <Chip
                        label={value}
                        color={STATUS_COLOR[value] || "default"}
                        size="small"
                    />
                )}
            >

                <MenuItem value={order.OrderStatus} disabled>
                    {order.OrderStatus} (current)
                </MenuItem>

                {forwardStatuses.map((status) => (
                    <MenuItem key={status} value={status}>
                        {status}
                    </MenuItem>
                ))}

                {isCancellable(order.OrderStatus) && (
                    <MenuItem value={CANCEL_VALUE} sx={{ color: "error.main" }}>
                        Cancel Order
                    </MenuItem>
                )}

            </Select>

        </FormControl>

    );

}

export default QuickStatusControl;
