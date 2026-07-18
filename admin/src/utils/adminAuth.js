export const getStoredAdmin = () => {

    try {
        return JSON.parse(localStorage.getItem("admin"));
    } catch {
        localStorage.removeItem("admin");
        return null;
    }

};

// An Owner has no BranchId on their account and can operate across every branch.
// A Branch Admin's BranchId is fixed at login and cannot be changed client-side.
export const isOwner = (admin) => !admin?.BranchId;
