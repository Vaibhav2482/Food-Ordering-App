import { useState } from "react";
import toast from "react-hot-toast";

import { useBranch } from "../context/BranchContext";
import { useCart } from "../context/CartContext";

export function useBranchSwitch() {

    const { selectedBranch, setSelectedBranchId } = useBranch();
    const { items, clearCart } = useCart();

    const [pendingBranchId, setPendingBranchId] = useState(null);

    const requestSwitch = (branchId) => {

        if (branchId === selectedBranch?.BranchId) {
            return;
        }

        if (items.length > 0) {
            setPendingBranchId(branchId);
        } else {
            setSelectedBranchId(branchId);
        }

    };

    const confirmSwitch = async () => {

        await clearCart();
        setSelectedBranchId(pendingBranchId);
        setPendingBranchId(null);
        toast.success("Switched branch. Your cart has been cleared.");

    };

    const cancelSwitch = () => setPendingBranchId(null);

    return { pendingBranchId, requestSwitch, confirmSwitch, cancelSwitch };

}
