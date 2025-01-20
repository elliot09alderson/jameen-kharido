import {
  createCustomer,
  editCustomerDetails,
  fetchAdDetail,
  fetchApprovedAds,
  getCustomerDetails,
} from "../controllers/customerController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

import { upload } from "../utils/multerConfig.js";
import express from "express";

export const customerRouter = express.Router();
/**
 *
 * READ
 *
 */

customerRouter.get("/ads", fetchApprovedAds);

customerRouter.get("/ad/detail", fetchAdDetail);


customerRouter.get(
  "/me",
  authMiddleware.customerMiddleware,
  getCustomerDetails
);

/**
 *
 * CREATE
 *
 */
customerRouter.post("/", upload.single("image"), createCustomer);

/**
 *
 * UPDATE
 *
 */
customerRouter.put("/", authMiddleware.customerMiddleware, editCustomerDetails);

/**
 *
 * DELETE
 *
 */
// customerRouter.delete("/homes/:id", deactivateCustomer);
