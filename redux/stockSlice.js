import { createSlice } from "@reduxjs/toolkit";

const stockSlice = createSlice({
  name: "stock",
  initialState: {
    yamato: 1,
  },
  reducers: {
    stockIncrease: (state, action) => {
      state.stocks.map((item) => {
        if (item.title === action.payload.title) {
            state.quantity += 1;
            item.yamato += 1;
        }
      });
    },
    stockDecrease: (state, action) => {
      state.products.map((item) => {
        if (item.title === action.payload.title) {
          if (item.yamato > 1) {
            state.quantity -= 1;
            item.yamato -= 1;
          } else {
            state.stocks = state.stocks.filter(
              (item) => item.title !== action.payload.title
            );
            state.quantity -= 1;
          }
        }
      });
    },
  },
});

export const {quantityDecrease, quantityIncrease } =
stockSlice.actions;
export default stockSlice.reducer;
