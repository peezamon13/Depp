import * as Yup from "yup";

export const registerSchema = Yup.object({
  email: Yup.string()
  .required("Username is required.")
  .min(1, "Username must be at least 3 characters."),
  password: Yup.string()
    .required("Password is required.")
    .min(1, "Password must be at least 8 characters."),
  confirmPassword: Yup.string()
    .required("Confirm password is required.")
    .oneOf([Yup.ref("password"), null], "Passwords must match."),
});
