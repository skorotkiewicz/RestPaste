import * as dotenv from "dotenv";
dotenv.config();
import { fileURLToPath } from "url";
import path from "path";
import express from "express";
import cors from "cors";
import { nanoid } from "nanoid";
import { prisma } from "./datebase.js";
import { validateJSON } from "./util.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    // origin: 'http://example.com',
    origin: "*",
    optionsSuccessStatus: 200,
  })
);

app.post("/api/paste", async (req, res) => {
  const data = req.body;
  const password = nanoid(25);

  try {
    const isValid = validateJSON(data.paste);

    if (!isValid.isValid) {
      return res.render("homepage", {
        json: data.paste,
        errors: isValid.errors.join(", "),
      });
    }

    const paste = await prisma.paste.create({
      data: {
        data: JSON.parse(data.paste),
        password,
      },
    });

    return res.redirect(`/api/paste/${paste.id}`);
  } catch (error) {
    return res.status(400).json({ message: "Something gone wrong" });
  }
});

app.get("/api/paste/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const paste = await prisma.paste.findUnique({
      where: {
        id,
      },
    });

    if (!paste) return res.status(404).json({ message: "Paste not found" });

    return res.render("paste", {
      apikey: paste.id,
      password: paste.password,
      json: paste.data,
      host: req.headers.host,
    });
  } catch (error) {
    return res.status(400).json({ message: "Something gone wrong" });
  }
});

app.get("/api/paste/json/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const paste = await prisma.paste.findUnique({
      where: {
        id,
      },
    });

    if (!paste) return res.status(404).json({ message: "Paste not found" });

    return res.status(200).json(paste.data);
  } catch (error) {
    return res.status(400).json({ message: "Something gone wrong" });
  }
});

app.get("/api/paste/:id/:key", async (req, res) => {
  const { id, key } = req.params;

  const paste = await prisma.paste.findUnique({ where: { id } });
  if (!paste) {
    return res.status(404).json({ message: "Paste not found" });
  }

  const result = paste.data.filter((item) => item.path === `/${key}`)[0];
  if (!result) return res.status(404).json({ message: "Key not found" });

  const response = { [result.key]: result.value };
  return res.status(200).json(response);
});

app.get("/api/delete/:password", async (req, res) => {
  const password = req.params.password;

  try {
    const paste = await prisma.paste.delete({
      where: {
        password,
      },
    });

    return res.status(202).json({ message: "Paste deleted", paste });
  } catch (error) {
    return res.status(404).json({ message: "Record to delete does not exist" });
  }
});

app.get("/", async (req, res) => {
  res.render("homepage");
});

app.listen(process.env.PORT || 5000);
