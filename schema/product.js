import * as Yup from "yup";

export const productSchema = Yup.object({
  image: Yup.mixed().required("ต้องการรูป"),
  title: Yup.string().required("ต้องการชื่อ"),
  smallPrice: Yup.number().required("ต้องการราคา"),
});
