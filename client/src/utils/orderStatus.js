import HourglassEmptyRoundedIcon from "@mui/icons-material/HourglassEmptyRounded";
import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import SoupKitchenRoundedIcon from "@mui/icons-material/SoupKitchenRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import DeliveryDiningRoundedIcon from "@mui/icons-material/DeliveryDiningRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

// The forward-only progression a non-cancelled order moves through.
export const ORDER_STATUS_STEPS = [
    "Pending",
    "Accepted",
    "Preparing",
    "Ready",
    "Out For Delivery",
    "Delivered"
];

// A status can only be cancelled before it's been dispatched for delivery.
export const CANCELLABLE_STATUSES = ["Pending", "Accepted", "Preparing"];

export const STATUS_DESCRIPTION = {
    Pending: "We've received your order and it's waiting for confirmation.",
    Accepted: "Your order has been confirmed by the restaurant.",
    Preparing: "Your food is being freshly prepared.",
    Ready: "Your order is packed and ready.",
    "Out For Delivery": "Your order is on its way to you.",
    Delivered: "Your order has been delivered. Enjoy!",
    Cancelled: "This order was cancelled."
};

export const STATUS_COLOR = {
    Pending: "warning",
    Accepted: "info",
    Preparing: "primary",
    Ready: "secondary",
    "Out For Delivery": "info",
    Delivered: "success",
    Cancelled: "error"
};

export const STATUS_ICON = {
    Pending: HourglassEmptyRoundedIcon,
    Accepted: AssignmentTurnedInRoundedIcon,
    Preparing: SoupKitchenRoundedIcon,
    Ready: CheckCircleOutlineRoundedIcon,
    "Out For Delivery": DeliveryDiningRoundedIcon,
    Delivered: CheckCircleRoundedIcon,
    Cancelled: CancelRoundedIcon
};

// Soft icon-circle backgrounds + matching foreground, used for the status
// badge shown on order cards and the detail hero (in place of a plain Chip).
export const STATUS_TINT = {
    Pending: { bg: "#FEF3C7", fg: "#B45309" },
    Accepted: { bg: "#DBEAFE", fg: "#1D4ED8" },
    Preparing: { bg: "#FFE8D1", fg: "#C2570A" },
    Ready: { bg: "#EDE9FE", fg: "#6D28D9" },
    "Out For Delivery": { bg: "#DBEAFE", fg: "#1D4ED8" },
    Delivered: { bg: "#DCFCE7", fg: "#15803D" },
    Cancelled: { bg: "#FEE2E2", fg: "#B91C1C" }
};

export const PAYMENT_TINT = {
    Success: { bg: "#DCFCE7", fg: "#15803D" },
    Pending: { bg: "#FEF3C7", fg: "#B45309" },
    Failed: { bg: "#FEE2E2", fg: "#B91C1C" }
};

export const isCancellable = (status) => CANCELLABLE_STATUSES.includes(status);

// "Out For Delivery" only applies to actual delivery orders - Dine In and
// Takeaway orders skip straight from Ready to Delivered.
export const getStatusSteps = (deliveryType) =>
    deliveryType === "Delivery"
        ? ORDER_STATUS_STEPS
        : ORDER_STATUS_STEPS.filter((step) => step !== "Out For Delivery");
