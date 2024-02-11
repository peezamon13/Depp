import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string()
  .required("ใส่ชื้อผู้ใช้")
  .min(3, "ความยาวต้องมากกว่า 3"),
  password: Yup.string()
  .required("ใส่รหัสผ่าน")
  .min(1, "ความยาวต้องมากกว่า 1"),
});
