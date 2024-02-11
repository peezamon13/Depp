import React from "react";
import Input from "../../components/form/Input";
import Title from "../../components/ui/Title";
import { useFormik } from "formik";
import { profileSchema } from "../../schema/profile";
import axios from "axios";
import { toast } from "react-toastify";

const Account = ({ user }) => {
  const onSubmit = async (values, actions) => {
    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${user._id}`,
        values
      );
      if (res.status === 200) {
        toast.success("อัพเดทชื่อผู้ใช้สำเร็จ");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        phoneNumber: user?.phoneNumber,
        email: user?.email,
        address: user?.address,
      },
      onSubmit,
      validationSchema: profileSchema,
    });
  const inputs = [
    {
      id: 1,
      name: "email",
      type: "text",
      placeholder: "ชื่อผู้ใช้ของคุณ",
      value: values.email,
      errorMessage: errors.email,
      touched: touched.email,
    },
    {
      id: 2,
      name: "phoneNumber",
      type: "string",
      placeholder: "หมายเลขโทรศัพท์ของคุณ",
      value: values.phoneNumber,
    },
    {
      id: 3,
      name: "address",
      type: "text",
      placeholder: "ที่อยู่ของคุณ",
      value: values.address,
    },
    
  ];
  return (
    <form className="lg:p-8 flex-1 lg:mt-0 mt-5" onSubmit={handleSubmit}>
      <Title addClass="text-[40px]">ตั้งค่าบัญชี</Title>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-4">
        {inputs.map((input) => (
          <Input
            key={input.id}
            {...input}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        ))}
      </div>
      <button className="btn-primary mt-4" type="submit">
        อัปเดต
      </button>
    </form>
  );
};

export default Account;
