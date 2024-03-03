import { useEffect, useState } from "react";
import Title from "../ui/Title";
import axios from "axios";
import { toast } from "react-toastify";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const status = ["กำลังเตรียม", "เสร็จสิ้น"];
  const [hasExtra, setHasExtra] = useState(false);

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

  const handleStatusNext = async (id) => {
    const item = orders.find((order) => order._id === id);
    const currentStatus = item.status;

    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`,
        { status: currentStatus + 1 }
      );
      setOrders([res.data, ...orders.filter((order) => order._id !== id)]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusPrior = async (id) => {
    const item = orders.find((order) => order._id === id);
    const currentStatus = item.status;

    try {
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`,
        { status: currentStatus - 1 }
      );
      setOrders([res.data, ...orders.filter((order) => order._id !== id)]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("ต้องการที่จะลบใช่ไหม")) {
      try {
        const res = await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`
        );
        setOrders(orders.filter((order) => order._id !== id));
        if (res.data) {
          toast.success("ลบสำเร็จ");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="lg:p-8 flex-1 lg:mt-0 mt-5  lg:max-w-[70%] xl:max-w-none flex flex-col justify-center">
      <Title addClass="text-[35px]">คำสั่งซื้อ</Title>
      <div className="w-full mt-5 max-h-[700px] overflow-auto">
        <table className="w-full  text-center ">
          <thead className="text-2xl text-white uppercase bg-gray-700 border border-black">
            <tr>
              <th scope="col" className="py-3 px-3">
                ลูกค้า
              </th>
              <th scope="col" className="py-3 px-3">
                อาหาร
              </th>
              <th scope="col" className="py-3 px-3">
                เพิ่มเติม
              </th>
              <th scope="col" className="py-3 px-3">
                ราคารวม
              </th>
              <th scope="col" className="py-3 px-3">
                การจ่ายเงิน
              </th>
              <th scope="col" className="py-3 px-3">
                สถานะ
              </th>
              <th scope="col" className="py-3 px-3">
                แก้ไขคำสั่งซื้อ
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 &&
              orders
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((order) => {
                  if (order.status !== 1) {
                    return (
                      <tr
                        className="transition-all text-black bg-#ececec text-xl hover:bg-primary border border-black"
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
                          {order?.method === 0 ? "Cash" : "Card"}
                        </td>
                        <td className="py-4 px-6 font-medium whitespace-nowrap">
                          {status[order?.status]}
                        </td>
                        <td className="py-4 px-1 font-small whitespace-nowrap flex gap-3 justify-center">
                          <button
                            className="btn-primary !bg-green-700 w-24 !pl-0 !pr-0"
                            onClick={() => handleStatusNext(order?._id)}
                            disabled={order?.status > 1}
                          >
                            เสร็จสิ้น
                          </button>
                          <button
                            className="btn-primary !bg-danger w-28 !pl-0 !pr-0"
                            onClick={() => handleDelete(order?._id)}
                          >
                            ลบคำสั่งซื้อ
                          </button>
                        </td>
                      </tr>
                    );
                  } else {
                    return null; 
                  }
                })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;