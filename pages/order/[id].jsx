import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { space } from "postcss/lib/list";

const Order = ({ order }) => {
  const status = order?.status;
  const statusClass = (index) => {
    if ( status < 1) return "กำลังเตรียม";
    if ( status === 1) return "เสร็จแล้ว";
    
  };

  return (
    <div className="overflow-x-auto w-auto justify-center items-center h-screen mt-1">
      <div className="container-center p-2  md:min-w-auto lg:min-w-auto bg-white ">
        <div className="flex flex-col md:flex-row items-center w-auto max-h-auto">
          <table className="text-md text-center text-gray-700 ">
            <thead className="w-auto text-lg text-white bg-gray-700">
              <tr>
                
                <th scope="col" className="py-2 px-10">
                 	 ที่อยู่ของคุณ
                </th>
                <th scope="col" className="py-2 px-10">
                	  สถานะ
                </th>
                
              </tr>
            </thead>
            <tbody>
              <tr className="transition-all bg-white border-black   ">
                
                <td className="py-3 px-6 font-medium  ">
                  {order?.address}
                </td>
                <td className="py-3 px-6 font-medium  ">
                {statusClass(order?.status)}
                </td>

              </tr>
            </tbody>
          </table>
        </div>
    
        <div className="justify-start mt-2">
          <h3 className="text-lg font-semibold mb-2">รายการอาหารที่สั่ง:</h3>
          <table className="w-auto text-lg text-center text-gray-500">
            <thead className="text-md text-white uppercase bg-gray-700">
              <tr>
                <th scope="col" className="py-2 px-4">
                	อาหาร
                </th>
                <th scope="col" className="py-2 px-4">
                 	จำนวน
                </th>
                <th scope="col" className="py-2 px-4">
                 	เพิ่มเติม
                </th>
                <th scope="col" className="py-2 px-7">
                  	ราคา
                </th>
              </tr>
            </thead>
            <tbody>
              {order?.products.map((product) => (
                <tr key={product._id}>
                  <td className="py-4 px-6 font-medium ">
                    {product.title}
                  </td>
                  <td className="py-4 px-6 font-medium ">
                    {product.foodQuantity}
                  </td>
                  <td className="py-4 px-6 font-medium ">
                    {product.extras &&
                      product.extras.length > 0 &&
                      product.extras.map((extra) => (
                        <span key={extra._id}>{extra.text}, <br /> </span>
                      ))}
                  </td>
                  <td className="py-4 px-6 font-medium ">
                    ฿{product.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
           <span className="justify-start px-4 text-lg">ราคารวมของคำสั่งซื้อนี้<span className="px-3">{order?.total}</span>บาท</span>
        <div className="flex justify-end ">
          <Link href="/menu">
            <a className=" fa-solid fa-mail-reply mt-3">
              กลับไปเลือกเมนู
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/orders/${params.id}`
  );
  return {
    props: {
      order: res.data ? res.data : null,
    },
  };
};

export default Order;