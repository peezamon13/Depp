import axios from "axios";
import Link from "next/link";
import Title from "../../components/ui/Title";

const Order = ({ order }) => {
    const status = order?.status;
    const statusClass = (index) => {
        if (index - status < 1) return "";
        if (index - status === 1) return "animate-pulse";
        if (index - status > 1) return "";
    };
    return (
        // <div className="flex items-center md:h-[calc(100vh_-_88px)] gap-3 py-10 flex-wrap">
        //     <div>
        //     <Title addClass="text-[40px] mb-6">ป้าแอ๊ว</Title>
        //     </div>
        // </div>
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
                                    {order?.total}฿
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-2">Products in the Order:</h3>
                    <table className="w-full text-sm text-center text-gray-500">
                        <thead className="text-xs text-gray-400 uppercase bg-gray-700">
                            <tr>
                                <th scope="col" className="py-3 px-6">
                                    Product
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Quantity
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Extras
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Price
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {order?.products.map((product) => (
                                <tr key={product._id}>
                                    <td className="py-4 px-6 font-medium whitespace-nowrap">
                                        {product.title}
                                    </td>
                                    <td className="py-4 px-6 font-medium whitespace-nowrap">
                                        {product.foodQuantity}
                                    </td>
                                    <td className="py-4 px-6 font-medium whitespace-nowrap">
                                        {product.extras &&
                                            product.extras.length > 0 &&
                                            product.extras.map((extra) => (
                                                <span key={extra._id}>{extra.text}, </span>
                                            ))}
                                    </td>
                                    <td className="py-4 px-6 font-medium whitespace-nowrap">
                                        {product.price}฿
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-end mt-8">
                    <Link href="/menu">
                        <a className="btn-secondary ml-3 fa-solid fa-mail-reply mt-8">
                            Back To Menu
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    )
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
