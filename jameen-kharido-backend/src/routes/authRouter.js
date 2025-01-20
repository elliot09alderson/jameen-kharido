import {
  adminLogin,
  adminLogout,
  agentLogin,
  agentLogout,
  customerLogin,
  customerLogout,
} from "../controllers/authController.js";

import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export const authRouter = express.Router();

authRouter.post("/customer/login", customerLogin);

authRouter.post("/agent/login", agentLogin);



authRouter.post(
  "/customer/logout",

  customerLogout
);
authRouter.post("/agent/logout", authMiddleware.agentMiddleware, agentLogout);


authRouter.post("/admin/login", adminLogin);
authRouter.post("/admin/logout", adminLogout);
