import jwt from "jsonwebtoken";
import { errorResponse } from "../utils/ApiResponse.js";

export const authenticate = (req, res, next) => {

    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
        return errorResponse(res, "Authentication token is required.", 401);
    }

    const token = header.slice("Bearer ".length);

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        return next();
    } catch (error) {
        return errorResponse(res, "Invalid or expired token.", 401);
    }

};

// For routes that are public to guests (e.g. customer menu browsing) but still need
// to recognize an admin's Bearer token when present, so branch-scoping can apply.
// Never rejects the request - a missing or invalid token just leaves req.user unset.
export const authenticateOptional = (req, res, next) => {

    const header = req.headers.authorization;

    if (header && header.startsWith("Bearer ")) {

        const token = header.slice("Bearer ".length);

        try {
            req.user = jwt.verify(token, process.env.JWT_SECRET);
        } catch {
            // Ignore invalid/expired token - treat as an unauthenticated request.
        }

    }

    return next();

};

export const authorize = (...roles) => (req, res, next) => {

    if (!req.user || !roles.includes(req.user.role)) {
        return errorResponse(res, "You are not authorized to perform this action.", 403);
    }

    return next();

};

// Owners are admins with no BranchId (unrestricted, all-branch access).
// Branch Admins are locked to one branch and cannot manage other admin accounts.
export const requireOwner = (req, res, next) => {

    if (!req.user || req.user.role !== "admin" || req.user.branchId) {
        return errorResponse(res, "Only an owner can perform this action.", 403);
    }

    return next();

};
