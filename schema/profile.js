import * as Yup from "yup";

export const profileSchema = Yup.object({
  email: Yup.string().required("ต้องการชื้อผู้ใช้"),
  phoneNumber: Yup.string()
    .min(10, "เบอร์ไม่ครบ"),
  address: Yup.string(),
});
