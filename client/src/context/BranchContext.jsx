import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getActiveBranches } from "../services/branchService";
import { getStoredBranchId, setStoredBranchId } from "../utils/storage";

const BranchContext = createContext(null);

export function BranchProvider({ children }) {

    const [branches, setBranches] = useState([]);
    const [selectedBranchId, setSelectedBranchId] = useState(() => getStoredBranchId());
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        (async () => {

            try {

                const response = await getActiveBranches();

                if (response.success) {

                    setBranches(response.data);

                    setSelectedBranchId((current) => {

                        const isValid = response.data.some(
                            (branch) => branch.BranchId === current
                        );

                        return isValid ? current : response.data[0]?.BranchId ?? null;

                    });

                }

            } catch {

                toast.error("Failed to load branches.");

            } finally {

                setLoading(false);

            }

        })();

    }, []);

    useEffect(() => {

        if (selectedBranchId) {
            setStoredBranchId(selectedBranchId);
        }

    }, [selectedBranchId]);

    const selectedBranch = branches.find(
        (branch) => branch.BranchId === selectedBranchId
    ) || null;

    const value = {
        branches,
        selectedBranchId,
        selectedBranch,
        setSelectedBranchId,
        loading
    };

    return (

        <BranchContext.Provider value={value}>

            {children}

        </BranchContext.Provider>

    );

}

export function useBranch() {

    return useContext(BranchContext);

}
