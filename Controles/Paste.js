import { prisma } from "../datebase.js";
import { nanoid } from "nanoid";
import { validateJSON } from "../util.js";

export const createPaste = async (req, res) => {
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
    return res.status(500).json({ message: "Something gone wrong" });
  }
};

export const getDocPaste = async (req, res, type = 0) => {
  const id = req.params.id;

  try {
    const paste = await prisma.paste.findUnique({
      where: {
        id,
      },
    });

    if (!paste) return res.status(404).json({ message: "Paste not found" });

    return res.render(type === 0 ? "paste" : "fpaste", {
      apikey: paste.id,
      password: paste.password,
      json: paste.data,
      host: req.headers.host,
    });
  } catch (error) {
    return res.status(500).json({ message: "Something gone wrong" });
  }
};

export const getFullPaste = async (req, res) => {
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
    return res.status(500).json({ message: "Something gone wrong" });
  }
};

export const getKeyPaste = async (req, res) => {
  const { id, key } = req.params;

  const paste = await prisma.paste.findUnique({ where: { id } });
  if (!paste) {
    return res.status(404).json({ message: "Paste not found" });
  }

  const result = paste.data.filter((item) => item.path === `/${key}`)[0];
  if (!result) return res.status(404).json({ message: "Key not found" });

  const response = { [result.key]: result.value };
  return res.status(200).json(response);
};

export const deletePaste = async (req, res) => {
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
};
