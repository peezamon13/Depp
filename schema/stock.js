import * as Yup from "yup";

export const stockSchema = Yup.object({
    title: Yup.string()
    .required("ต้องการชื่อ")
    .min(1, "ใส่จำนวน"),
    yamato: Yup.number()
});