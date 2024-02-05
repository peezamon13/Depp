import { createSlice } from "@reduxjs/toolkit";

const stockSlice = createSlice({
  name: "stock",
  initialState: {
    title: [],
    yamato: [],

  },
  reducers: {
    addStock: (state, action) => {
      state.title.push(action.payload);
      state.yamato += action.payload.yamato;

    },
    resetStock: (state, action) => {
      state.title = [];
      state.yamato = 0;

    },
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
