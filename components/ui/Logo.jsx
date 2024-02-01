import React from "react";
import Link from "next/link";


const Logo = () => {
  return (
    <Link href="/menu">
      <span className="text-[2rem] font-dancing font-bold cursor-pointer">
        ร้านป้าแอ๊ว
      </span>
    </Link>
  );
};

export default Logo;
