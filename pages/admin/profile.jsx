import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import ReportD from "../../schema/ReportDaily";
import ReportM from "../../schema/ReportMonthly";
import { useState } from "react";
import Category from "../../components/admin/Category";
import Order from "../../components/admin/Order";
import Products from "../../components/admin/Products";
import { toast } from "react-toastify";
import Stock from "../../components/admin/Stock";

const Profile = () => {
  const [tabs, setTabs] = useState(0);

  const { push } = useRouter();

  const closeAdminAccount = async () => {
    try {
      if (confirm("Are you sure you want to close your Admin Account?")) {
        const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/admin`);
        if (res.status === 200) {
          push("/admin");
          toast.success("Admin Account Closed!");
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
          <Image
            src="/images/admin.png"
            alt=""
            width={100}
            height={100}
            className="rounded-full"
          />
          <b className="text-2xl mt-1">Admin</b>
        </div>
        <ul className="text-center font-semibold">
          <li
            className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
              tabs === 0 && "bg-primary text-white"
            }`}
            onClick={() => setTabs(0)}
          >
            <i className="fa fa-cutlery"></i>
            <button className="ml-1 ">รายการอาหาร</button>
          </li>
          <li
            className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
              tabs === 1 && "bg-primary text-white"
            }`}
            onClick={() => setTabs(1)}
          >
            <i className="fa fa-list"></i>
            <button className="ml-1">รายการสั่งซื้อ</button>
          </li>
          <li
            className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
              tabs === 2 && "bg-primary text-white"
            }`}
            onClick={() => setTabs(2)}
          >
            <i className="fa fa-ellipsis-h"></i>
            <button className="ml-1">ประเภท</button>
          </li>
          <li
            className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
              tabs === 3 && "bg-primary text-white"
            }`}
            onClick={() => setTabs(3)}
          >
            <i className="fa fa-bar-chart"></i>
            <button className="ml-1">รายได้รายวัน</button>
          </li>
          <li
            className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
              tabs === 4 && "bg-primary text-white"
            }`}
            onClick={() => setTabs(4)}
          >
            <i className="fa fa-bar-chart"></i>
            <button className="ml-1">รายได้รายเดือน</button>
          </li>
          <li
            className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
              tabs === 6 && "bg-primary text-white"
            }`}
            onClick={() => setTabs(6)}
          >
            <i className="fa fa-sticky-note-o"></i>
            <button className="ml-1">คลังวัตถุดิบ</button>
          </li>
          <li
            className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all`}
            onClick={() => window.open("/", "_blank")}
          >
            <i className="fa-solid fa-house"></i>
            <button className="ml-1">
              หน้าสั่งซื้ออาหาร <br /> (หน้าใหม่)
            </button>
          </li>
          <li
            className={`border w-full p-3 cursor-pointer hover:bg-primary hover:text-white transition-all ${
              tabs === 5 && "bg-primary text-white"
            }`}
            onClick={closeAdminAccount}
          >
            <i className="fa fa-sign-out"></i>
            <button className="ml-1">ออกจากระบบ</button>
          </li>
        </ul>
      </div>
      {tabs === 0 && <Products />}
      {tabs === 1 && <Order />}
      {tabs === 2 && <Category />}
      {tabs === 3 && <ReportD />}
      {tabs === 4 && <ReportM />}
      {tabs === 6 && <Stock />}
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
