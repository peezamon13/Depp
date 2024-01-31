import Image from "next/image";
import Link from "next/link";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";

const MenuItem = ({ product }) => {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const findCart = cart.products.find((item) => item._id === product._id);

    const addToCart = () => {
        dispatch(
            addProduct({
                ...product,
                extras: [],
                price: product.prices[0],
                quantity: 1,
                foodQuantity: 1,
            })
        );
    };

    return (
        <div className="bg-secondary rounded-2xl relative h-full">
            <div className="w-full bg-[#f1f2f3] md:h-[210px] h-[150px] grid place-content-center rounded-br-[25px] rounded-tl-3xl rounded-tr-2xl ">
                <Link href={`/product/${product._id}`}>
                    <div className="relative w-36 h-36 hover:scale-110 transition-all">
                        <Image
                            src={product.img}
                            alt=""
                            layout="fill"
                            className="rounded-full" />
                    </div>
                </Link>
            </div>
            <Link href={`/product/${product._id}`}>
                <div className="p-[25px] text-white">
                    <h4 className="text-xl font-semibold mb-3 ">{product.title}</h4>
                </div>
            </Link>
        </div>
    );
};

export default MenuItem;
