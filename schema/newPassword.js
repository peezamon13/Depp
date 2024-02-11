import * as Yup from "yup";

export const newPasswordSchema = Yup.object({
  password: Yup.string()
    .required("ใส่รหัสผ่าน")
    .min(1, "ความยาวต้องมากกว่า 1"),
  confirmPassword: Yup.string()
    .required("ยืนยันรหัสผ่าน")
    .oneOf([Yup.ref("password"), null], "รหัสผ่านไม่ถูก"),
});
