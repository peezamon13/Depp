import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Account from "../../components/profile/Account";
import Order from "../../components/profile/Order";
import Password from "../../components/profile/Password";
import { toast } from "react-toastify";
import { GiHamburgerMenu, GiCancel } from "react-icons/gi";

const Profile = ({ user }) => {
    const [isMenuModal, setIsMenuModal] = useState(false);
    const { data: session } = useSession();
    const [tabs, setTabs] = useState(0);
    const { push } = useRouter();

    const handleSignOut = () => {
        if (confirm("ยืนยันที่จะออกไหม")) {
            signOut({ redirect: false });
            push("/auth/login");
            toast.success("ออกสำเร็จ", {
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
    
    return (
        <div className="flex px-10 min-h-[calc(100vh_-_433px)] flex-col lg:mb-0 mb-10" >
            <div className="lg:w-80 w-100 flex-shrink-0 flex" >
                <nav
                    className={`absolute top-[220px] w-[300px] h-[250px] text-black bg-white hidden z-50 border border-black border-2 rounded-2xl ml-1 bg-opacity-80 ${
                    isMenuModal === true && "!grid place-content-center"
                    }`} onClick= {() => setIsMenuModal(false)}
                >
                    <ul className="text-center font-semibold flex grid grid-cols-2 gap-2 px-3 bg-white">
                        <li className={`border w-full p-3 cursor-pointer transition-all ${tabs === 0 && "bg-black text-white"}`} onClick={() => setTabs(0)}>
                            <i className="fa fa-home"></i><br/>
                            <button className="ml-1 ">บัญชี</button>
                        </li>
                        <li className={`border w-full p-3 cursor-pointer transition-all ${tabs === 1 && "bg-black text-white"}`} onClick={() => setTabs(1)}>
                            <i className="fa fa-key"></i><br/>
                            <button className="ml-1">รหัสผ่าน</button>
                        </li>
                        <li className={`border w-full p-3 cursor-pointer transition-all ${tabs === 2 && "bg-black text-white"}`} onClick={() => setTabs(2)}>
                            <i className="fa fa-list"></i><br/>
                            <button className="ml-1">รายการสั่งซื้อ</button>
                        </li>
                        <li className={`border w-full p-3 cursor-pointer transition-all`} onClick={handleSignOut}>
                            <i className="fa fa-sign-out"></i><br/>
                            <button className="ml-1">ลงชื่ออก</button>
                        </li>
                    </ul>
                    {isMenuModal && (
                        <button
                            className="absolute top-1 right-2 z-50"
                            onClick={() => setIsMenuModal(false)}
                        >
                            <GiCancel size={30} className=" transition-all" />
                        </button>
                    )}
                </nav>
            </div>
            <button
                className="inline-block"
                onClick={() => setIsMenuModal(true)}
            >
                <GiHamburgerMenu className="text-2xl hover:text-primary transition-all" />
            </button>
            {tabs === 0 && <Account user={user} />}
            {tabs === 1 && <Password user={user} />}
            {tabs === 2 && <Order />}
        </div>
    );
};

export async function getServerSideProps({ req, params }) {
    const user = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/${params.id}`);

    return {
        props: {
            user: user ? user.data : null,
        },
    };
}

export default Profile;