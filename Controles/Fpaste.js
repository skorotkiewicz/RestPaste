import { prisma } from "../datebase.js";
import { nanoid } from "nanoid";
import { validateJSON } from "../util.js";

export const createFpaste = async (req, res) => {
  const json = req.body;
  const password = nanoid(25);

  const isValid = validateJSON(json.paste, 1);
  if (!isValid.isValid) {
    return res.render("fhomepage", {
      json: json.paste,
      errors: isValid.errors.join(", "),
    });
  }

  try {
    const paste = await prisma.paste.create({
      data: {
        data: JSON.parse(json.paste),
        password,
      },
    });

    return res.redirect(`/api/fpaste/${paste.id}`);
  } catch (_) {
    return res.status(500).json({ message: "Something gone wrong" });
  }
};

// /api/fpaste/clh2p0dq100003x3h4l3c6hgq?fields=name,address.street
export const getFpaste = async (req, res) => {
  const { id } = req.params;
  const { fields } = req.query;
  const select = [];
  let result;
  let results;

  try {
    const paste = await prisma.paste.findUnique({ where: { id } });
    if (!paste) {
      return res.status(404).json({ message: "Paste not found" });
    }

    try {
      const fieldsArray = fields.split(",");
      fieldsArray.forEach((field) => {
        select.push(field);
      });

      results = filterJson(paste.data, select);
      if (Object.keys(results).length === 0) {
        return res.status(404).json({ message: "Key not found" });
      }
    } catch (_) {
      results = paste.data;
    }

    try {
      const cleanResults = results.filter(
        (value) => Object.keys(value).length !== 0
      );
      result = cleanResults;
    } catch (error) {
      result = results;
    }

    return res.status(200).json(result);
  } catch (_) {
    return res.status(500).json({ message: "Something gone wrong" });
  }
};

// //////////////

const filterJson = (json, filter) => {
  if (Array.isArray(json)) {
    return json.map((obj) => {
      const result = {};
      filter.forEach((field) => {
        if (obj[field]) {
          result[field] = obj[field];
        }
      });
      return result;
    });
  } else {
    const result = {};
    Object.keys(json).forEach((key) => {
      const obj = json[key];
      filter.forEach((field) => {
        if (obj[field]) {
          if (!result[key]) {
            result[key] = {};
          }
          result[key][field] = obj[field];
        }
      });
    });
    return result;
  }
};
