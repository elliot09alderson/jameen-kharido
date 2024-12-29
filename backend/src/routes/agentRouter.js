import { app } from "../index.js";
import express from "express";

export const agentRouter = express.Router();
/**
 *
 * READ
 *
 */
agentRouter.get("/me", getAgentDetails);

/**
 *
 * CREATE
 *
 */
agentRouter.post("/", createAgent);

/**
 *
 * UPDATE
 *
 */
agentRouter.put("/", editAgentDetails);

/**
 *
 * DELETE
 *
 */
// agentRouter.delete("/homes/:id", deactivateagent);
