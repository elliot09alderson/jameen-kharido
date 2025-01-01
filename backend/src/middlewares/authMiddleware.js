import jwt from "jsonwebtoken";
import { Customer } from "../models/customer.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.customerToken || req.headers.Authorization;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    // Decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the customer and check token and expiry
    const customer = await Customer.findOne({
      id: decoded._id,
      token,
    });
    if (!customer) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    // Check if token is expired
    if (new Date() > customer.tokenExpiry) {
      return res.status(401).json({ error: "Unauthorized: Token expired" });
    }

    // Attach customer info to the request
    req.customer = customer;
    next();
  } catch (error) {
    console.error("Error in authMiddleware:", error);
    return res.status(401).json({ error: "Unauthorized" });
  }
};
