import Title from "../../components/ui/Title";
import { useSelector, useDispatch } from "react-redux";
import {
         quantityDecrease,
         quantityIncrease,
         reset,
        } from "../../redux/cartSlice";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Cart = ({ userList }) => {
    const { data: session } = useSession();
    const cart = useSelector((state) => state.cart);
    const router = useRouter();
    const dispatch = useDispatch();
    const user = userList?.find((user) => user.email === session?.user?.email);
    const [productState, setProductState] = useState([]);

    const newOrder = {
        customer: user?.fullName,
        address: user?.address ? user?.address : "No address",
        total: cart.total,
        products: productState,
        method: 0,
    };
    const newOrder2 = {
        customer: user?.fullName,
        address: user?.address ? user?.address : "No address",
        total: cart.total,
        products: productState,
        method: 1,
    };

    useEffect(() => {
        const productTitles = cart.products.map((product) => {
            return {
                title: product.title,
                foodQuantity: product.foodQuantity,
                extras: product.extras,
                price: product.price,
            };
        });
        setProductState(productTitles);
    }, [cart.products]);
    console.log(productState);
    const createOrder = async () => {
        try {
            if (session) {
                if (confirm("Are you sure you want to create this order?")) {
                    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders`, newOrder);
                    if (res.status === 201) {
                        router.push(`/order/${res.data._id}`);
                        dispatch(reset());
                        toast.success("Order created successfully");
                    }
                }
            } else {
                router.push("/auth/login");
                throw new Error("You must be logged in to create an order");
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    };

    const createOrder2 = async () => {
        try {
            if (session) {
                if (confirm("Are you sure you want to create this order?")) {
                    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders`, newOrder2);
                    if (res.status === 201) {
                        router.push(`/order/${res.data._id}`);
                        dispatch(reset());
                        toast.success("Order created successfully");
                    }
                }
            } else {
                router.push("/auth/login");
                throw new Error("You must be logged in to create an order");
            }
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    };

    const quantityChange = (type, price) => {
        if (type === 0) {
            dispatch(quantityDecrease(price));
        }
        if (type === 1) {
            dispatch(quantityIncrease(price));
        }
    };

    return (
        <div className="min-h-[calc(100vh_-_433px)]">
            <div className="flex justify-between items-center md:flex-row flex-col">
                <div className="md:min-h-[calc(100vh_-_433px)] items-center flex-2 p-5 overflow-x-auto w-full justify-center">
                    {cart.products.length > 0 ? (
                        <div className="max-h-[40rem] overflow-auto">
                            <table className="w-full text-sm text-center text-gray-100">
                                <thead className="text-xm text-white uppercase bg-black">
                                    <tr>
                                        <th scope="col" className="py-3 px-4">
                                            ชื้ออาหาร
                                        </th>
                                        <th scope="col" className="py-3 px-4">
                                            พิเศษ
                                        </th>
                                        <th scope="col" className="py-3 px-4">
                                            ราคา
                                        </th>
                                        <th scope="col" className="py-3 px-4">
                                            จำนวน
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-xl">
                                    {cart.products.map((product) => (
                                        <tr className="transition-all bg-secondary" key={product._id} >
                                            <td className="py-3 px-4 font-medium whitespace-nowrap">
                                                <span>{product.title}</span>
                                            </td>
                                            <td className="py-3 px-4 font-medium whitespace-nowrap">
                                                {product.extras.length > 0 ? product.extras.map((item) => (
                                                    <span key={item._id}> 
                                                        {item.text} <br />
                                                    </span>
                                                )): "-"}
                                            </td>
                                            <td className="py-3 px-4 font-medium whitespace-nowrap">
                                                {product.price}฿
                                            </td>
                                            <td className="py-3 px- font-medium whitespace-nowrap">
                                                <button>
                                                    <i className="fa-solid fa-subtract mr-3 text-white" onClick={() => quantityChange(0, product)}></i>
                                                </button>
                                                {product.foodQuantity}
                                                <button>
                                                    <i className="fa-solid fa-add ml-3 text-white" onClick={() => quantityChange(1, product)}></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="flex justify-between">
                                <div className="mt-6 text-xl">
                                    <b>รวม: </b>{cart.total}฿
                                </div>
                                <div>
                                    <button className="text-xl btn-primary mt-4 md:w-auto w-52" onClick={createOrder}>
                                        สั่งซื้อ
                                    </button>
                                </div>
                                <div>
                                    <button className="text-xl btn-primary mt-4 md:w-auto w-52" onClick={createOrder2}>
                                        สั่งซื้อ2
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full">
                            <h1 className="text-2xl font-semibold">ไม่มีรายการอาหาร</h1>
                            <button className="btn-primary mt-4" onClick={() => router.push("/menu")}>
                                กลับหน้าเมนู
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export const getServerSideProps = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);

  return {
    props: {
      userList: res.data ? res.data : [],
    },
  };
};

export default Cart;

{
  /* */
}
