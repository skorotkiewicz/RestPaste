import * as dotenv from "dotenv";
dotenv.config();
import { fileURLToPath } from "url";
import path from "path";
import express from "express";
import cors from "cors";
import router from "./Routes/apiRouter.js";
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((_req, res, next) => {
  res.header("X-Powered-By", "RestPaste");
  // res.append("X-Powered-By", ["RestPaste"]);
  next();
});

app.use(
  cors({
    // origin: 'http://example.com',
    origin: "*",
    optionsSuccessStatus: 200,
  })
);

app.get("/", async (req, res) => {
  res.render("homepage");
});

app.get("/fpaste", async (req, res) => {
  res.render("fhomepage");
});

app.use("/api", router);

app.listen(process.env.PORT || 5000);
