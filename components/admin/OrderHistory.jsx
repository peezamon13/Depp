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
    <div className="lg:p-8 flex-1 lg:mt-0 mt-5  lg:max-w-[70%] xl:max-w-none flex flex-col justify-center">
      <Title addClass="text-[35px]">ประวัติคำสั่งซื้อ</Title>
      <div className="w-full mt-5 max-h-[700px] overflow-auto">
        <table className="w-full  text-center ">
          <thead className="text-xl text-white uppercase bg-gray-700">
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
                    className="transition-all text-black bg-#ececec text-lg hover:bg-primary"
                    key={order._id}
                  >
                    <td className="py-4 px-6 font-medium whitespace-nowrap">
                      {order?.customer}
                    </td>
                    <td className="py-4 px-6 font-medium flex-wrap w-[100px] whitespace-nowrap">
                      {order?.products.map((product, index) => (
                        <span key={index}>
                          {product.title} * {product.foodQuantity} <br />
                        </span>
                      ))}
                    </td>
                    <td className="py-4 font-medium">
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
                    <td className="py-4 px-6 font-medium whitespace-nowrap">
                      {order?.total}฿
                    </td>

                    <td className="py-4 px-6 font-medium whitespace-nowrap">
                      {order.createdAt.substring(0, 10)}{" "}
                      {order.createdAt.substring(11, 16)}
                    </td>

                    <td className="py-4 px-6 font-medium whitespace-nowrap">
                      {order?.method === 0  ? "เงินสด" : "ไม่เงินสด"}
                    </td>

                    <td className="py-4 px-6 font-medium whitespace-nowrap">
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
