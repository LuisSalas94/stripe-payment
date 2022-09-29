import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
	//Original
	// cartItems: [],
	//LocarStorage
	cartItems: localStorage.getItem("cartItems")
		? JSON.parse(localStorage.getItem("cartItems"))
		: [],
	cartTotalQuantity: 0,
	cartTotalAmount: 0,
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart(state, { payload }) {
			// Check if the item is already in the cart
			const itemIndex = state.cartItems.findIndex(
				(item) => item.id === payload.id
			);

			if (itemIndex >= 0) {
				// Item already exists in the cart
				state.cartItems[itemIndex].cartQuantity += 1;
				toast.info(
					`Increased ${state.cartItems[itemIndex].name} cart quantity by 1`,
					{ position: "bottom-left" }
				);
			} else {
				const tempProduct = { ...payload, cartQuantity: 1 };
				state.cartItems.push(tempProduct);
				toast.success(`${payload.name} added to cart`, {
					position: "bottom-left",
				});
			}
			localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
		},
		removeFromCart(state, { payload }) {
			const nextCartItems = state.cartItems.filter(
				(item) => item.id !== payload.id
			);
			state.cartItems = nextCartItems;
			localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
			toast.error(`${payload.name} removed from cart`, {
				position: "bottom-left",
			});
		},
		decreaseCartQuantity(state, { payload }) {
			const itemIndex = state.cartItems.findIndex(
				(item) => item.id === payload.id
			);
			if (state.cartItems[itemIndex].cartQuantity > 1) {
				state.cartItems[itemIndex].cartQuantity -= 1;
				toast.info(`Decreased ${payload.name} cart quantity`, {
					position: "bottom-left",
				});
			} else if (state.cartItems[itemIndex].cartQuantity === 1) {
				const nextCartItems = state.cartItems.filter(
					(item) => item.id !== payload.id
				);
				state.cartItems = nextCartItems;
				toast.error(`${payload.name} removed from cart`, {
					position: "bottom-left",
				});
			}
			localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
		},

		clearCart(state, { payload }) {
			state.cartItems = [];
			localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
			toast.error(`Cart cleared`, { position: "bottom-left" });
		},
		getTotals(state, { payload }) {
			let { total, quantity } = state.cartItems.reduce(
				(cartotal, cartItem) => {
					const { price, cartQuantity } = cartItem;
					const itemTotal = price * cartQuantity;
					cartotal.total += itemTotal;
					cartotal.quantity += cartQuantity;
					return cartotal;
				},
				{
					total: 0,
					quantity: 0,
				}
			);
			state.cartTotalQuantity = quantity;
			state.cartTotalAmount = total;
		},
	},
});

export const {
	addToCart,
	removeFromCart,
	decreaseCartQuantity,
	clearCart,
	getTotals,
} = cartSlice.actions;
export default cartSlice.reducer;
