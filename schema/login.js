import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string()
  .required("Username is required.")
  .min(1, "Username must be at least 3 characters."),
  password: Yup.string()
    .required("Password is required.")
    .min(1, "Password must be at least 8 characters."),
});
