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

export const isCancellable = (status) => CANCELLABLE_STATUSES.includes(status);

export const isTerminal = (status) => status === "Delivered" || status === "Cancelled";

// "Out For Delivery" only makes sense for actual delivery orders - Dine In and
// Takeaway orders skip straight from Ready to Delivered.
export const getStatusSteps = (deliveryType) =>
    deliveryType === "Delivery"
        ? ORDER_STATUS_STEPS
        : ORDER_STATUS_STEPS.filter((step) => step !== "Out For Delivery");

// Every status ahead of the current one, in order - lets staff jump straight to
// (say) Delivered instead of clicking through every intermediate step.
export const getForwardStatuses = (currentStatus, deliveryType) => {

    const steps = getStatusSteps(deliveryType);
    const currentIndex = steps.indexOf(currentStatus);

    if (currentIndex === -1) {
        return [];
    }

    return steps.slice(currentIndex + 1);

};
