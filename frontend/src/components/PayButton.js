import React from "react";
import { useSelector } from "react-redux";
import { url } from "../features/api";
import axios from "axios";

const PayButton = ({ cartItems }) => {
	const user = useSelector((state) => state.auth);

	const handleCheckOut = () => {
		// axios
		// 	.post(`${url}/stripe/create-checkout-session`, {
		// 		cartItems,
		// 		userId: user._id,
		// 	})
		// 	.then((res) => {
		// 		if (res.data.url) {
		// 			window.location.href = res.data.url;
		// 		}
		// 	})
		// 	.catch((err) => console.log(err.message));
		fetch(`${url}/stripe/create-checkout-session`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "POST, OPTIONS",
			},
			body: JSON.stringify({
				cartItems,
				userId: user._id,
			}),
		})
			.then((res) => {
				if (res.data.url) {
					window.location.href = res.data.url;
				}
			})
			.catch((err) => console.log(err.message));
	};
	return <button onClick={() => handleCheckOut()}>Check Out</button>;
};

export default PayButton;
