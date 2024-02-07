import dbConnect from "../../../util/dbConnect";
import Stock from "../../../models/Stock";

const handler = async (req, res) => { 
    await dbConnect();
    const {
        method,
        query: { id },
    } = req;

    if (method === "GET") {
        try {
            const stock = await Stock.findById(id);
            res.status(200).json(stock);
        }   catch (err) {
            console.log(err);
        }
    }
  
    if (method === "DELETE") {
        try {
            const stock = await Stock.findByIdAndDelete(id);
            res.status(200).json(stock);
        }   catch (err) {
            console.log(err);
        }
    }
    if (method === "PUT") {
        try {
            const stock = await Stock.findByIdAndUpdate(id, req.body, { new: true });
            res.status(200).json(stock);
        }   catch (error) {
            console.log(error);
        }
    }
};

export default handler;