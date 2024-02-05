import mongoose from "mongoose";

const StockSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        yamato: {
            type: String,
          },
    },{ timestamps: true }
);

export default mongoose.models.Stock ||
    mongoose.model("Stock", StockSchema);
