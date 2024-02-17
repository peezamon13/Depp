import * as Yup from "yup";

export const registerSchema = Yup.object({
  email: Yup.string()
  .required("ใส่ชื้อผู้ใช้")
  .min(1, "ความยาวต้องมากกว่า 3"),
  password: Yup.string()
    .required("ใส่รหัสผ่าน")
    .min(1, "ความยาวต้องมากกว่า 1"),
  confirmPassword: Yup.string()
    .required("ยืนยันรหัสผ่าน")
    .oneOf([Yup.ref("password"), null], "รหัสผ่านไม่ถูก"),
});
