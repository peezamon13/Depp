import { useEffect, useState } from "react";
import Title from "../ui/Title";
import Image from "next/image";
import AddProduct from "./AddProduct";
import axios from "axios";
import { toast } from "react-toastify";
import { VscCircleLarge } from "react-icons/vsc";
import { VscCircleLargeFilled } from "react-icons/vsc";

const Products = () => {
    const [isProductModal, setIsProductModal] = useState(false);
    const [products, setProducts] = useState([]);
    const statusfood = ["ขาย", "ไม่ขาย"];

    const getProducts = async () => {
        try {const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);
            setProducts(res.data);
        }   catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getProducts();
    }, []);

    const handleDelete = async (id) => {
        try {
            if (confirm("ต้องการที่จะลบเมนูใช่ไหม")) {
                const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
                if (res.status === 200) {
                    toast.success("ลบเมนูสำเร็จ");
                    getProducts();
                }
            }
        }   catch (error) {
            console.log(error);
            toast.error("มีบางอย่างผิดพลาด");
        }
    };

    const handleAdd = async (id) => {
        const item = products.find((cat) => cat._id === id);
        const currentStatus = item.statusfood;

        try {
            const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, { statusfood: currentStatus + 1 });
            setProducts([res.data, ...products.filter((cat) => cat._id !== id)]);
        }   catch (error) {
            console.log(error);
        }
    };

    const handleSubtract = async (id) => {
        const item = products.find((cat) => cat._id === id);
        const currentStatus = item.statusfood;

        try {
            const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, { statusfood: currentStatus - 1 });
            setProducts([res.data, ...products.filter((cat) => cat._id !== id)]);
        }   catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="lg:p-8 flex-1 lg:mt-0 relative min-h-[400px]  lg:max-w-[90%] xl:max-w-none flex flex-col justify-center">
        <Title addClass="text-[35px]">เมนูทั้งหมด</Title>
            {isProductModal && <AddProduct setIsProductModal={setIsProductModal} />}
            <button
                className="btn-primary w-12 h-12 !p-0  bottom-14 right-14 text-4xl text-center absolute"
                onClick={() => setIsProductModal(true)}
            >
                +
            </button>
            <div className="overflow-x-auto w-full mt-5 max-h-[500px] overflow-auto">
                <table className="w-full text-center text-black xl:min-w-[1000px]">
                    <thead className="text-2xl text-white bg-gray-700 border border-black">
                        <tr>
                            <th scope="col" className="py-3 px-6">
                                รูป
                            </th>
                            <th scope="col" className="py-3">
                                ชื่ออาหาร
                            </th>
                            <th scope="col" className="py-3 px-6">
                                ราคา
                            </th>
                            <th scope="col" className="py-3 px-6">
                                ID
                            </th>
                            <th scope="col" className="py-3 px-6">
                                
                            </th>
                            <th scope="col" className="py-3 px-6">
                                ลบ
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 &&
                        products
                        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                        .map((product) => (
                            <tr
                                className="transition-all bg-[#ececec] text-xl hover:bg-white border border-black"
                                key={product._id}
                            >
                                <td className="py-4 px-6 font-medium whitespace-nowrap  flex items-center gap-x-1 justify-center">
                                    <Image src={product.img} alt="" width={50} height={50} />
                                </td>
                                <td className="py-4 font-medium whitespace-nowrap ">
                                    {product.title}
                                </td>
                                <td className="py-4 px-6 font-medium whitespace-nowrap">
                                    {product.prices[0]}฿
                                </td>
                                <td className="py-4 px-6 font-medium whitespace-nowrap">
                                    {statusfood[product?.statusfood]}
                                </td>
                                <td className="py-4 px-6 font-medium whitespace-nowrap">
                                    <button
                                        className="btn-primary2 w-20 !px-16 !pr-0 bg-[#373739]"
                                        onClick={() => handleSubtract(product?._id)}
                                        disabled={product?.statusfood < 1}
                                    >
                                        <VscCircleLargeFilled /> 
                                    </button>
                                    <button
                                        className="btn-primary2 w-20 !pl-0 !pr-0 bg-[#4682b4]"
                                        onClick={() => handleAdd(product?._id)}
                                        disabled={product?.statusfood > 0}
                                    >
                                        <VscCircleLarge />
                                    </button>
                                </td>
                                <td className="py-4 px-6 font-medium whitespace-nowrap ">
                                    <button
                                        className="btn-primary !bg-danger"
                                        onClick={() => handleDelete(product._id)}
                                    >
                                        ลบ
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Products;
