import { useState } from "react";
import { FaUserAlt, FaShoppingCart, FaSearch } from "react-icons/fa";
import Logo from "../ui/Logo";
import Search from "../ui/Search";
import { GiHamburgerMenu, GiCancel } from "react-icons/gi";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSelector } from "react-redux";

const Header = () => {
  const [isSearchModal, setIsSearchModal] = useState(false);
  const [isMenuModal, setIsMenuModal] = useState(false);
  const cart = useSelector((state) => state.cart);

  const router = useRouter();

  return (
    <div
      className={`h-[5.5rem] z-50 relative w-full  ${
        router.asPath === "/" ? "bg-transparent fixed" : "bg-black"
      }`}
    >
      <div className="flex  bg-black mx-auto text-white flex justify-between items-center h-full mx-3">
        
        <Logo />
        <nav
          className={`sm:static absolute top-0 left-0 sm:w-auto sm:h-auto w-full h-screen sm:text-white text-black sm:bg-transparent bg-white sm:flex hidden z-50 ${
            isMenuModal === true && "!grid place-content-center"
          }`}
        >
     
          {isMenuModal && (
            <button
              className="absolute  top-4 right-4 z-50"
              onClick={() => setIsMenuModal(false)}
            >
              <GiCancel size={25} className=" transition-all" />
            </button>
          )}
        </nav>
        <div className="flex gap-x-4 items-center">
          <Link href="/auth/login">
            <span>
              {router.asPath.includes("auth") ? (
                <i
                  className={`fa-solid fa-right-to-bracket ${
                    router.asPath.includes("login") && "text-primary"
                  } `}
                ></i>
              ) : (
                <FaUserAlt
                  className={`hover:text-primary transition-all cursor-pointer ${
                    (router.asPath.includes("auth") ||
                      router.asPath.includes("profile")) &&
                    "text-primary"
                  }`}
                />
              )}
            </span>
          </Link>
          <Link href="/cart">
            <span className="relative">
              <FaShoppingCart
                className={`hover:text-primary transition-all cursor-pointer`}
              />
              <span className="w-4 h-4 text-xs grid place-content-center rounded-full bg-primary absolute -top-2 -right-3 text-black font-bold">
                {cart.products.length === 0 ? "0" : cart.products.length}
              </span>
            </span>
          </Link>
          <button onClick={() => setIsSearchModal(true)}>
            <FaSearch className="hover:text-primary transition-all cursor-pointer" />
          </button>
        
          <div className="mx-1"></div>
        </div>
      </div>
      {isSearchModal && <Search setIsSearchModal={setIsSearchModal} />}
    </div>
  );
};

export default Header;
