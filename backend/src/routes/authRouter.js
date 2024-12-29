import { app } from "../index.js";
import express from "express";

export const authRouter = express.Router();
/**
 *
 * LOGIN
 *
 */
authRouter.get("customer/login", customerLogin);
authRouter.get("agent/login", agentLogin);
authRouter.get("admin/login", adminLogin);

/**
 *
 * LOGOUT
 *
 */
authRouter.get("customer/logout", customerLogout);
authRouter.get("agent/logout", agentLogout);
authRouter.get("admin/logout", adminLogout);

