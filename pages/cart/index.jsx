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
    customer: user?.email,
    address: user.address ? user.address : "No address",
    total: cart.total,
    products: productState,
    method: 0,
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
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/orders`,
            newOrder
          );

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
        <div className="w-auto md:min-h-[calc(100vh_-_433px)] flex items-center flex-1 p-10 overflow-x-auto  justify-center">
          {cart.products.length > 0 ? (
            <div className="max-h-[40rem] overflow-auto">
              <table
                className="w-full text-xl text-center text-white lg:text-xl"
              >
                <thead className="text-xl text-white uppercase ">
                  <tr className="transition-all bg-gray-700 text-white "  >
                    <th scope="col" className="py-3 px-4">
                      อาหาร
                    </th>
                    <th scope="col" className="py-3 px-4">
                      พิเศษ
                    </th>
                    
                    <th scope="col" className="py-3 px-4">
                      จำนวน
                    </th>
                    <th scope="col" className="py-3 px-4">
                      ราคา
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cart.products.map((product) => (
                    <tr
                      className="transition-all bg-white text-black   "
                      key={product._id}
                    >
                      <td className="py-4 px-3 font-medium whitespace-normal  ">
                        <span>{product.title}</span>
                      </td>
                      <td className="py-4 px-4 font-medium whitespace-normal ">
                        {product.extras.length > 0
                          ? product.extras.map((item) => (
                              <span key={item._id}>
                                {item.text}
                                <br />
                              </span>
                            ))
                          : "-"}
                      </td>
                      <td className="py-4 px-1 font-medium whitespace-nowrap ">
                        <button>
                          <i
                            className="fa-solid fa-subtract mr-2 text-black"
                            onClick={() => quantityChange(0, product)}
                          ></i>
                        </button>
                        {product.foodQuantity}
                        <button>
                          <i
                            className="fa-solid fa-add ml-2 text-black"
                            onClick={() => quantityChange(1, product)}
                          ></i>
                        </button>
                      </td>
                      <td className="py-4 px-6 font-medium whitespace-nowrap ">
                        {product.price}฿
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <h1 className="text-2xl font-semibold">ตะกร้าของคุณว่างเปล่า</h1>
              <button
                className="btn-primary mt-4"
                onClick={() => router.push("/menu")}
              >
                <span className="text-black">กลับไปเลือกเมนู</span>
              </button>
            </div>
          )}
        </div>
        
      
            
          <div className="flex-center mt-1  item-center">
            {/* <b>Subtotal: </b>${cart.total} <br />
            <b className=" inline-block my-1">Discount: </b>$0.00 <br /> */}
            <b>ราคารวม: </b>{cart.total}฿
          </div>

          <div>
            <button
              className="btn-primary mt-4 md:w-auto w-auto"
              onClick={createOrder}
              
            >
              <span className="text-black">สั่งเลย!</span>
            </button>
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


