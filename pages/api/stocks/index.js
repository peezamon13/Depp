import Stock from "../../../models/Stock";
import dbConnect from "../../../util/dbConnect";

const handler = async (req, res) => {
    await dbConnect();
    const { method } = req;

    if (method === "GET") {
        try {
            const stocks = await Stock.find();
            res.status(200).json(stocks);
        }   catch (err) {
            console.log(err);
        }
    }

    if (method === "POST") {
        try {
            const newStock = await Stock.create(req.body);
            res.status(200).json(newStock);
        }   catch (err) {
            console.log(err);
        }
    }
};

export default handler;