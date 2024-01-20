import axios from "axios";
import Image from "next/image";

const Order = ({ order }) => {
  const status = order?.status;
  const statusClass = (index) => {
    if (index - status < 1) return "";
    if (index - status === 1) return "animate-pulse";
    if (index - status > 1) return "";
  };
  return (
    <div className="overflow-x-auto flex justify-center items-center h-screen">
      <div className="container p-5 md:p-10 min-w-[320px] md:min-w-[600px] lg:min-w-[800px] bg-white rounded-md">
        <div className="flex flex-col md:flex-row items-center w-full max-h-28">
          <table className="text-sm text-center text-gray-500 w-full">
            <thead className="text-xs text-gray-400 uppercase bg-gray-700">
              <tr>
                <th scope="col" className="py-3 px-6">
                  ORDER ID
                </th>
                <th scope="col" className="py-3 px-6">
                  CUSTOMER
                </th>
                <th scope="col" className="py-3 px-6">
                  ADDRESS
                </th>
                <th scope="col" className="py-3 px-6">
                  TOTAL
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="transition-all bg-secondary border-gray-700  ">
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white flex items-center gap-x-1 justify-center">
                  {order._id.substring(0, 5)}
                </td>
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                  {order?.customer}
                </td>
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                  {order?.address}
                </td>
                <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                  ${order?.total}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex flex-col md:flex-row justify-between w-full p-5 md:p-10 bg-white mt-4 rounded-md">
          <div className={`flex flex-col ${statusClass(0)} items-center mb-4 md:mb-0`}>
            <Image src="/images/bake.png" alt="" width={30} height={30} objectFit="contain" />
            <span className="text-sm">Preparing</span>
          </div>
          <div className={`flex flex-col ${statusClass(1)} items-center mb-4 md:mb-0`}>
            <Image src="/images/bike.png" alt="" width={30} height={30} objectFit="contain" />
            <span className="text-sm">Finish</span>
          </div>
          <div className={`flex flex-col ${statusClass(2)} items-center`}>
            <Image src="/images/paid.png" alt="" width={30} height={30} objectFit="contain" />
            <span className="text-sm">Payment</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders/${params.id}`);
  return {
    props: {
      order: res.data ? res.data : null,
    },
  };
};

export default Order;
