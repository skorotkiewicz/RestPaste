export const validateJSON = (json) => {
  const errors = [];
  let data;

  try {
    data = JSON.parse(json);
  } catch (error) {
    errors.push("JSON syntax error");
  }

  if (!Array.isArray(data)) {
    errors.push("JSON is not an array");
  } else {
    for (let i = 0; i < data.length; i++) {
      const element = data[i];

      if (
        !element.hasOwnProperty("path") ||
        !element.hasOwnProperty("key") ||
        !element.hasOwnProperty("value")
      ) {
        errors.push(`Element ${i + 1} is missing a required field`);
      }
    }
  }

  if (errors.length > 0) {
    return { isValid: false, errors };
  }

  return { isValid: true };
};
