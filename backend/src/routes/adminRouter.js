import { app } from "../index.js";
import express from "express";

export const adminRouter = express.Router();
/**
 *
 * READ
 *
 */
adminRouter.get("/agents", getAllAgents);
adminRouter.get("/agent/:id", getAgentDetails);
adminRouter.get("/agents/blocked", getAllBlockedAgents);
adminRouter.get("/agents/verified", getVerifiedAgents);
adminRouter.get("/ad/pending", getRequestedAds);
adminRouter.get("/ad/:id", getAdDetails);
adminRouter.delete("/ad/:id", deleteAgentAd);

/**
 *
 * CREATE
 *
 */
adminRouter.post("/", createAdmin);

/**
 *
 * UPDATE
 *
 */
adminRouter.put("/:id", editAdminDeails);

/**
 *
 * DELETE
 *
 */
adminRouter.delete("/:id", deleteAdmin);