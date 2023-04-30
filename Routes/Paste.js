import express from "express";
import {
  createPaste,
  getFullPaste,
  getDocPaste,
  getKeyPaste,
  deletePaste,
} from "../Controles/Paste.js";
const router = express.Router();

router.post("/", async (req, res) => {
  createPaste(req, res);
});

router.get("/:id", async (req, res) => {
  getDocPaste(req, res);
});

router.get("/json/:id", async (req, res) => {
  getFullPaste(req, res);
});

router.get("/delete/:password", async (req, res) => {
  deletePaste(req, res);
});

router.get("/:id/:key", async (req, res) => {
  getKeyPaste(req, res);
});

export default router;
