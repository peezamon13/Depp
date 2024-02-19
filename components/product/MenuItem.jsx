import Image from "next/image";
import Link from "next/link";

const MenuItem = ({ product }) => {
    return (
        <div className="bg-white relative h-full border-[2px] border-black">
            <div className="w-full bg-[#f1f2f3] md:h-[210px] h-[150px] grid place-content-center">
                <Link href={`/product/${product._id}`}>
                    <div className="relative w-36 h-36 hover:scale-110 transition-all">
                        <Image
                            src={product.img}
                            alt=""
                            layout="fill"
                            className="rounded-full"
                        />
                    </div>
                </Link>
            </div>
            <Link href={`/product/${product._id}`}>
                <div className="p-[25px] text-black border-[2px] border-secondary">
                    <div>
                        <h4 className="text-xl font-semibold mb-3 ">{product.title}</h4>
                    </div>
                    <div>
                        <p className="text-xl font-semibold mb-3 ">{product.prices}฿</p>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default MenuItem;
