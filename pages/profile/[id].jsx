import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import Account from "../../components/profile/Account";
import Order from "../../components/profile/Order";
import Password from "../../components/profile/Password";
import { toast } from "react-toastify";

const Profile = ({ user }) => {
  const { data: session } = useSession();
  const [selectedTab, setSelectedTab] = useState(0);
  const { push } = useRouter();

  const handleSignOut = () => {
    if (confirm("Are you sure you want to sign out?")) {
      signOut({ redirect: false });
      push("/auth/login");
      toast.success("Sign out successfully", {
        position: "bottom-left",
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    if (!session) {
      push("/auth/login");
    }
  }, [session, push]);

  const handleTabChange = (event) => {
    setSelectedTab(parseInt(event.target.value));
  };

  return (
    <div className="flex px-10 min-h-[calc(100vh_-_433px)] lg:flex-row flex-col lg:mb-0 mb-10">
      <div className="lg:w-80 w-100 flex-shrink-0 lg:h-[80vh] justify-center flex flex-col border-l-2 border-r-4 shadow-2xl">
        <div className="relative flex flex-col items-center px-5 py-1 border border-b-0 ">
          <Image
            src={user.image ? user.image : "/images/admin.png"}
            alt="USER"
            width={75}
            height={75}
            className="rounded-full"
          />
          <b className="text-xl ">{user.fullName}</b>
        </div>
        <select
          className="text-center font-semibold w-full p-4 cursor-pointer border hover:bg-secondary hover:text-white transition-all"
          onChange={handleTabChange}
          value={selectedTab}
        >
          <option value={0}>บัญชีผู้ใช้</option>
          <option value={1}>รหัสผ่าน</option>
          <option value={2}>ประวัติการซื้อ</option>
        </select>
        <button
          className="border w-full p-4 cursor-pointer hover:bg-secondary hover:text-white transition-all"
          onClick={handleSignOut}
        >
          <i className="fa fa-sign-out"></i>
          <span className="ml-1">ลงชื่อออก</span>
        </button>
      </div>
      {selectedTab === 0 && <Account user={user} />}
      {selectedTab === 1 && <Password user={user} />}
      {selectedTab === 2 && <Order />}
    </div>
  );
};

export async function getServerSideProps({ req, params }) {
  const user = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${params.id}`
  );

  return {
    props: {
      user: user ? user.data : null,
    },
  };
}

export default Profile;