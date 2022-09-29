import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";
import authReducer from "./authSlice";
import { fetchAsyncProducts } from "./productSlice";
import { productsApi } from "./productsAPI";
import { getTotals } from "./cartSlice";
import { loadUser } from "./authSlice";

const store = configureStore({
	reducer: {
		products: productReducer,
		cart: cartReducer,
		auth: authReducer,
		[productsApi.reducerPath]: productsApi.reducer,
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(productsApi.middleware);
	},
});

store.dispatch(fetchAsyncProducts());
store.dispatch(getTotals());
store.dispatch(loadUser(null));

export default store;
