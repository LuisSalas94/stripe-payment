import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	items: [],
	status: null,
	isLoading: true,
};

export const fetchAsyncProducts = createAsyncThunk(
	"products/fetchAsyncProducts",
	async () => {
		const response = await axios.get("http://localhost:5000/products");
		return response?.data;
	}
);

const productSlice = createSlice({
	name: "products",
	initialState,
	reducers: {},
	extraReducers: {
		[fetchAsyncProducts.pending]: (state, action) => {
			state.status = "pending";
		},
		[fetchAsyncProducts.fulfilled]: (state, { payload }) => {
			console.log("Products fetched successfully");
			state.status = "success";
			state.items = payload;
		},
		[fetchAsyncProducts.rejected]: (state, { payload }) => {
			state.status = "rejected";
		},
	},
});

export const { AddProducts } = productSlice.actions;
export default productSlice.reducer;
