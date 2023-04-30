import express from "express";
import { createFpaste, getFpaste } from "../Controles/Fpaste.js";
import { getDocPaste } from "../Controles/Paste.js";
const router = express.Router();

router.post("/", async (req, res) => {
  createFpaste(req, res);
});

// GET /api/fpaste/1?fields=name,address.street
router.get("/json/:id", async (req, res) => {
  getFpaste(req, res);
});

router.get("/:id", async (req, res) => {
  getDocPaste(req, res, 1);
});

export default router;
