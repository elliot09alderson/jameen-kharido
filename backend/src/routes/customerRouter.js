import {
  createCustomer,
  editCustomerDetails,
  getCustomerDetails,
} from "../controllers/customerController.js";
import { upload } from "../utils/multerConfig.js";
import express from "express";

export const customerRouter = express.Router();
/**
 *
 * READ
 *
 */
customerRouter.get("/me", getCustomerDetails);

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
customerRouter.put("/", editCustomerDetails);

/**
 *
 * DELETE
 *
 */
// customerRouter.delete("/homes/:id", deactivateCustomer);
