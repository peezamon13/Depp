import { useState, useEffect } from "react";
import { FaUserAlt, FaShoppingCart, FaSearch } from "react-icons/fa";
import Logo from "../ui/Logo";
import Search from "../ui/Search";
import { GiCancel } from "react-icons/gi";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSelector } from "react-redux";

const Header = () => {
  const [isSearchModal, setIsSearchModal] = useState(false);
  const cart = useSelector((state) => state.cart);
  const router = useRouter();

  useEffect(() => {
    const userLoggedIn = localStorage.getItem('userLoggedIn');

    if (!userLoggedIn) {
      router.push('/auth/login');
    }
  }, []);

  const handleUserIconClick = () => {
    const userLoggedIn = localStorage.getItem('userLoggedIn');

    if (userLoggedIn) {
      router.push('/profile');
    } else {
      router.push('/auth/login');
    }
  };

  return (
    <div className={`h-[5.5rem] z-50 relative w-full  ${router.asPath === "/" ? "bg-transparent fixed" : "bg-black"}`}>
      <div className="bg-black py-3 px-5">
        <div className="flex bg-black mx-auto text-white  justify-around items-center h-full mx-3">
          <Logo />
          <div className="flex w-5"></div>
          <div className="flex gap-x-4 items-center">
            <span onClick={handleUserIconClick}>
              <FaUserAlt className={`hover:text-primary transition-all cursor-pointer ${(router.asPath.includes("auth") || router.asPath.includes("profile")) && "text-primary"}`} />
            </span>
            <Link href="/cart">
              <span className="relative">
                <FaShoppingCart className={`hover:text-primary transition-all cursor-pointer`} />
                <span className="w-4 h-4 text-xs grid place-content-center rounded-full bg-primary absolute -top-2 -right-3 text-black font-bold">{cart.products.length === 0 ? "0" : cart.products.length}</span>
              </span>
            </Link>
            <button onClick={() => setIsSearchModal(true)}>
              <FaSearch className="hover:text-primary transition-all cursor-pointer" />
            </button>
          </div>
        </div>
      </div>
      {isSearchModal && <Search setIsSearchModal={setIsSearchModal} />}
    </div>
  );
};

export default Header;
