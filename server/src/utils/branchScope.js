// A Branch Admin (admin with a BranchId on their token) is always confined to their
// own branch, regardless of what a client request asks for. An Owner (admin with no
// BranchId) is unrestricted and uses whatever branchId the request supplies.

export const isBranchAdmin = (req) =>
    Boolean(req.user?.role === "admin" && req.user.branchId);

export const resolveBranchId = (req) =>
    isBranchAdmin(req) ? req.user.branchId : req.query.branchId;

export const branchMismatch = (req, recordBranchId) =>
    isBranchAdmin(req) && String(req.user.branchId) !== String(recordBranchId);
