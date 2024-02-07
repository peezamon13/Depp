import * as Yup from "yup";

export const stockSchema = Yup.object ({
    title: Yup.string()
    .required("Full name is required.")
    .min(1, "Full name must be at least 3 characters."),
    yamato: Yup.number()
});