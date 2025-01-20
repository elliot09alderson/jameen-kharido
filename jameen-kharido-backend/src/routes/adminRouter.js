import { createAdmin } from "../controllers/adminController.js";
import { app } from "../index.js";
import express from "express";
import { upload } from "../utils/multerConfig.js";

export const adminRouter = express.Router();
/**
 *
 * READ
 *
 */
// adminRouter.get("/agents", getAllAgents);
// adminRouter.get("/agent/:id", getAgentDetails);
// adminRouter.get("/agents/blocked", getAllBlockedAgents);
// adminRouter.get("/agents/verified", getVerifiedAgents);
// adminRouter.get("/ad/pending", getRequestedAds);
// adminRouter.get("/ad/:id", getAdDetails);
// adminRouter.delete("/ad/:id", deleteAgentAd);

/**
 *
 * CREATE
 *
 */
adminRouter.post("/", upload.single("image"), createAdmin);
// adminRouter.get("/profile", getAdminDeails);

// /**
//  *
//  * UPDATE
//  *
//  */
// adminRouter.put("/:id", editAdminDetails);

/**
 *
 * DELETE
 *
 */
// adminRouter.delete("/:id", deleteAdmin);
