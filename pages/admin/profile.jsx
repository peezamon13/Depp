import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";

import { useState } from "react";
import Category from "../../components/admin/Category";
import Order from "../../components/admin/Order";
import Products from "../../components/admin/Products";
import { toast } from "react-toastify";

const Profile = () => {
  const [tabs, setTabs] = useState(0);

  const { push } = useRouter();

  const closeAdminAccount = async () => {
    try {
      if (confirm("ต้องการจะล็อคเอาท์ใช่ไหม?")) {
        const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/admin`);
        if (res.status === 200) {
          push("/admin");
          toast.success("ล็อคเอาท์");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex px-10 min-h-[calc(100vh_-_433px)] lg:flex-row flex-col lg:mb-0 mb-10">
      <div className="lg:w-80 w-100 flex-shrink-0 lg:h-[100vh]   justify-center flex flex-col border-l-2 border-r-4 shadow-2xl">
        <div className="relative flex flex-col items-center px-10 py-5  border-b-0">
          <b className="text-2xl mt-1">Admin</b>
        </div>
        <ul className="text-center font-semibold">
          <li
            className={`border w-full p-3 cursor-pointer transition-all ${
              tabs === 0 && "bg-black text-white"
            }`}
            onClick={() => setTabs(0)}
          >
            <i className="fa fa-cutlery"></i>
            <button className="ml-1 ">รายการอาหาร</button>
          </li>
          <li
            className={`border w-full p-3 cursor-pointer transition-all ${
              tabs === 1 && "bg-black text-white"
            }`}
            onClick={() => setTabs(1)}
          >
            <i className="fa fa-motorcycle"></i>
            <button className="ml-1">ออเดอร์อาหาร</button>
          </li>
          <li
            className={`border w-full p-3 cursor-pointer transition-all ${
              tabs === 2 && "bg-black text-white"
            }`}
            onClick={() => setTabs(2)}
          >
            <i className="fa fa-ellipsis-h"></i>
            <button className="ml-1">ประเภท</button>
          </li>
          <li
            className={`border w-full p-3 cursor-pointer transition-all`}
            onClick={() => window.open("/", "_blank")}
          >
            <i className="fa-solid fa-house"></i>
            <button className="ml-1">
              หน้าเว็บร้าน <br /> (New Tab)
            </button>
          </li>
          <li
            className={`border w-full p-3 cursor-pointer transition-all ${
              tabs === 4 && "bg-black text-white"
            }`}
            onClick={closeAdminAccount}
          >
            <i className="fa fa-sign-out"></i>
            <button className="ml-1">ล็อคเอาท์</button>
          </li>
        </ul>
      </div>
      {tabs === 0 && <Products />}
      {tabs === 1 && <Order />}
      {tabs === 2 && <Category />}
    </div>
  );
};

export const getServerSideProps = (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  if (myCookie.token !== process.env.ADMIN_TOKEN) {
    return {
      redirect: {
        destination: "/admin",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Profile;
