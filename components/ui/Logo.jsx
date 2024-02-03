import React from "react";
import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <Link href="/">
      <span className="text-[2rem] font-dancing font-bold cursor-pointer">
        {/* ป้าแอ๊ว */}
        <Image
        src="/images/132.jpg"
        alt=""
        priority
        height={50}
        width={50}
        className="text-[2rem] font-dancing font-bold cursor-pointer"
      />
      </span>
    </Link>
  );
};

export default Logo;
