import express from "express";
const router = express.Router();

// Routes
import pasteRouter from "./Paste.js";
import fpasteRouter from "./Fpaste.js";

router.use("/paste", pasteRouter);
router.use("/fpaste", fpasteRouter);

export default router;
