import Ajv from "ajv"; // JSON validate işlemi için kullanılan kütüphane.
export const ajv = new Ajv();

export function getValidationErrorMessage(validate) {
  return {
    success: false,
    error: validate.errors[0].instancePath + " " + validate.errors[0].message,
  };
}
