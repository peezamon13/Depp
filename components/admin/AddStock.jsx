import React, { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { useFormik } from "formik";
import Title from "../ui/Title";
import { GiCancel } from "react-icons/gi";
import axios from "axios";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";


const AddStock = ({ setIsStockModal }) => {
  const [btnDisabled, setBtnDisabled] = useState("");

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  const onSubmit = async (values, actions) => {
    try {
      setBtnDisabled(true);

      // Assuming you have an API endpoint for creating stocks
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/stocks`, {
        title: formik.values.title,
        price: formik.values.price,
      });

      if (res.status === 201) {
        setIsStockModal(false);
        toast.success("Stock Created Successfully", {
          position: "top-right",
          closeOnClick: true,
        });

        // Optionally, you can perform additional actions after successful stock creation
      }
    } catch (error) {
      console.error(error);
      toast.error("Error creating stock", {
        position: "top-right",
        closeOnClick: true,
      });
    } finally {
      setBtnDisabled(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      price: "",
    },
    onSubmit,
  });

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50 after:content-[''] after:w-screen after:h-screen after:bg-white after:absolute after:top-0 after:left-0 after:opacity-60 grid place-content-center ">
      <OutsideClickHandler
        onOutsideClick={() => {
          if (confirm("Are you sure you want to exit?")) {
            setIsStockModal(false);
          }
        }}
      >
        <div className="w-full h-full grid place-content-center relative">
          <form
            onSubmit={formik.handleSubmit}
            className="relative z-50 md:w-[600px] w-[370px] bg-white border-2 p-10 rounded-3xl"
          >
            <Title addClass="text-[40px] text-center">Add a New Stock</Title>

            <div className="flex flex-col text-sm mt-4">
              <span className="font-semibold mb-1">Title</span>
              <input
                type="text"
                className={`border border-gray-400 h-8 p-3 text-sm outline-none rounded-md 
                  ${formik.errors.title && formik.touched.title
                    ? "border-red-500"
                    : "border-gray-400"
                  }`}
                placeholder="Enter Title"
                name="title"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
              />
              {formik.errors.title && formik.touched.title && (
                <span className="text-xs mt-1 text-danger">{formik.errors.title}</span>
              )}
            </div>

            <div className="flex flex-col text-sm mt-4">
              <span className="font-semibold mb-1">Quantity</span>
              <input
                type="number"
                className={`border border-gray-400 h-8 p-3 text-sm outline-none rounded-md 
                  ${formik.errors.quantity && formik.touched.quantity
                    ? "border-red-500"
                    : "border-gray-400"
                  }`}
                placeholder="Enter Quantity"
                name="quantity"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.quantity}
              />
              {formik.errors.quantity && formik.touched.quantity && (
                <span className="text-xs mt-1 text-danger">{formik.errors.quantity}</span>
              )}
            </div>

            {btnDisabled ? (
              <button
                className="btn-primary !bg-green-400 right-8 bottom-6 absolute focus:outline-none cursor-not-allowed"
                type="submit"
                disabled
              >
                <CircularProgress size={25} />
              </button>
            ) : (
              <button
                className="btn-primary !bg-success mt-6 right-8 absolute"
                type="submit"
              >
                Create
              </button>
            )}

            <button
              className="absolute top-4 right-4"
              onClick={() => {
                if (confirm("Are you sure you want to exit?")) {
                  setIsStockModal(false);
                }
              }}
            >
              <GiCancel size={25} className="transition-all" />
            </button>
          </form>
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default AddStock;
