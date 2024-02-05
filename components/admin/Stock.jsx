import { useEffect, useState } from "react";
import Input from "../form/Input";
import Title from "../ui/Title";
import axios from "axios";
import { toast } from "react-toastify";

const Stock = () => {
    const [stocks, setStocks] = useState([]);
    const [inputText, setInputText] = useState("");
    const [inputTex1, setText1] = useState("");

    useEffect(() => {
        const getStocks = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/stocks`);
                setStocks(res?.data);
            } catch (error) {
                console.log(error);
            }
        };
        getStocks();
    }, []);

    const handleCreate = async () => {
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/stocks`, {
                title: inputText,
                yamato: inputTex1,
            });
            setStocks([...stocks, res?.data]);
            setInputText("");
            setText1("");
            toast.success("Category Created", {
                position: "bottom-left",
            });
        } catch (error) {
            console.log(error);
        }
    };

        const handleSubmit = async (e, id) => {
            try {
                if (confirm("Are you sure you want to delete this category?")) {
                    await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/stocks/${id}`);
                    setStocks(stocks.filter((cat) => cat._id !== id));
                }
            } catch (error) {
                console.log(error);
            }
        };

    const handleDelete = async (e, id) => {
        e.preventDefault();
        try {
            if (confirm("Are you sure you want to delete this category?")) {
                await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/stocks/${id}`);
                setStocks(stocks.filter((cat) => cat._id !== id));
                toast.warning("Category Deleted", {
                    position: "bottom-left",
                    theme: "colored",
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const stockChange = async (type, id) => {
        try {
            const updatedStocks = stocks.map((stock) => {
                if (stock._id === id) {
                    if (type === 0) {
                        stock.yamato -= 1;
                    } else if (type === 1) {
                        stock.yamato += 1;
                    }
                }
                return stock;
            });
            setStocks(updatedStocks);
            // You can also make an API call here to update the backend with the new value
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="lg:p-8 flex-1 lg:mt-0 mt-5">
            <Title addClass="text-[40px]">ประเภท</Title>
            <div className="mt-5">
                <div className="flex gap-4 flex-1 items-center">
                    <Input
                        placeholder="เพิ่มประเภท..."
                        onChange={(e) => setInputText(e.target.value)}
                        value={inputText}
                    />
                    <Input
                        placeholder="จำนวน..."
                        onChange={(e) => setText1(e.target.value)}
                        value={inputTex1}
                    />
                    <button className="btn-primary" onClick={handleCreate}>
                        เพิ่ม
                    </button>
                </div>
                <div className="mt-10  max-h-[40rem] overflow-auto p-4 flex flex-col justify-center ">
                    {stocks.map((stock) => (
                        <div
                            className="flex justify-between mt-4 border p-3 items-center border-r-4 border-b-8 border-black rounded-lg transition-all"
                            key={stock._id}
                        >
                            <b className="sm:text-xl text-md">{stock.title}</b>
                            <div>
                                <button onClick={() => stockChange(0, stock._id)}>
                                    <i className="fa-solid fa-subtract ml-3 text-black"></i>
                                </button>
                                <b className="sm:text-xl text-md">{stock.yamato}</b>
                                <button onClick={() => stockChange(1, stock._id)}>
                                    <i className="fa-solid fa-add ml-3 text-black"></i>
                                </button>
                            </div>
                            <button
                                className="btn-primary bg-blue text-sm sm:text-base"
                                onClick={(e) => handleSubmit(e, stock._id)}
                            >
                                อัพเดท
                            </button>
                            <button
                                className="btn-primary !bg-danger text-sm sm:text-base"
                                onClick={(e) => handleDelete(e, stock._id)}
                            >
                                ลบ
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Stock;
