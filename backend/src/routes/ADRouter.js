import { app } from "../index.js";
import express from "express";

export const AdRouter = express.Router();
/**
 *
 * READ
 *
 */
AdRouter.get("/homes", getAllHomeAds);
AdRouter.get("/flats", getAllFlatAds);
AdRouter.get("/lands", getAllLandAds);
AdRouter.get("/shops", getAllShopAds);
/**
 *
 * CREATE
 *
 */
AdRouter.post("/homes", postHomeAd);
AdRouter.post("/flats", postFlatAd);
AdRouter.post("/lands", postLandAd);
AdRouter.post("/shops", postShopAd);

/**
 *
 * UPDATE
 *
 */
AdRouter.put("/homes/:id", editHomeAd);
AdRouter.put("/flats/:id", editFlatAd);
AdRouter.put("/lands/:id", editLandAd);
AdRouter.put("/shops/:id", editShopAd);
/**
 *
 * DELETE
 *
 */
AdRouter.delete("/homes/:id", deleteHomeAd);
AdRouter.delete("/flats/:id", deleteFlatAd);
AdRouter.delete("/lands/:id", deleteLandAd);
AdRouter.delete("/shops/:id", deleteShopAd);
