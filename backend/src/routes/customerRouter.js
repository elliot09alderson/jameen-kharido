import {
  createCustomer,
  editCustomerDetails,
  getCustomerDetails,
} from "../controllers/customerController.js";
import { app, upload } from "../index.js";
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
