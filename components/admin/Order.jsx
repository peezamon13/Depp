import { useEffect, useState } from "react";
import Title from "../ui/Title";
import axios from "axios";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const status = ["","จ่ายแล้ว"];

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/orders`
        );
        setOrders(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, []);

  return (
    <div className="lg:p-8 flex-1 lg:mt-0 mt-5  lg:max-w-[70%] xl:max-w-none flex flex-col justify-center ">
      <Title addClass="text-[40px]">ออเดอร์</Title>
      <div className="overflow-x-auto w-full mt-5 ">
        <table className="w-full text-sm text-center text-gray-500 border border-black">
          <thead className="text-xs text-gray-400 uppercase bg-gray-700 ">
            <tr>
              <th scope="col" className="py-3 px-6">
                ลูกค้า
              </th>
              <th scope="col" className="py-3 px-6">
                อาหาร
              </th>
              <th scope="col" className="py-3">
                เพิ่มเติม
              </th>
              <th scope="col" className="py-3 px-6">
                ราคารวม
              </th>
              <th scope="col" className="py-3 px-6">
                วันที่
              </th>
              <th scope="col" className="py-3 px-6">
                การจ่ายเงิน
              </th>
              <th scope="col" className="py-3 px-6">
                สถานะ
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 &&
              orders
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .filter((item) => item.status > 0)
                .map((order) => (
                  <tr
                    className="transition-all bg-white border-gray-700 hover:bg-primary border border-black"
                    key={order._id}
                  >
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      {order?.customer}
                    </td>
                    <td className="py-4 px-6 font-medium  hover:text-white flex-wrap w-[100px] whitespace-nowrap">
                      {order?.products.map((product, index) => (
                        <span key={index}>
                          {product.title} * {product.foodQuantity} <br />
                        </span>
                      ))}
                    </td>
                    <td className="py-4 font-medium hover:text-white">
                      {order?.products.map((item) => {
                        return (
                          <div key={item._id}>
                            {item.extras &&
                              item.extras.length > 0 &&
                              item.extras.map((extra) => (
                                <span key={extra._id}>{extra.text}, </span>
                              ))}
                          </div>
                        );
                      })}
                    </td>
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      {order?.total}฿
                    </td>

                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      {order.createdAt.substring(0, 10)}{" "}
                      {order.createdAt.substring(11, 16)}
                    </td>

                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      {order?.method === 0  ? "เงินสด" : "ไม่เงินสด"}
                    </td>

                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      {status[order?.status]}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistory;
