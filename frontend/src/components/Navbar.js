import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { logoutUser } from "../features/authSlice";
import { toast } from "react-toastify";

const Navbar = () => {
	const { cartTotalQuantity } = useSelector((state) => state.cart);
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	const AuthLinks = styled.div`
		a {
			&:last-child {
				margin-left: 2rem;
			}
		}
	`;

	const Logout = styled.div`
		color: #fff;
		curson: pointer;
	`;

	return (
		<nav className="nav-bar">
			<Link to={"/"}>
				<h2>OnlineShop</h2>
			</Link>
			<Link to={"/cart"}>
				<div className="nav-bag">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="35"
						height="35"
						fill="currentColor"
						className="bi bi-bag"
						viewBox="0 0 16 16"
					>
						<path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
					</svg>
					<span className="bag-quantity">
						<span>{cartTotalQuantity}</span>
					</span>
				</div>
			</Link>
			{auth._id ? (
				<Logout
					onClick={() => {
						dispatch(logoutUser(null));
						toast.warning("Logged out successfully", {
							position: "bottom-left",
						});
					}}
				>
					Log out
				</Logout>
			) : (
				<AuthLinks>
					<Link to={"/login"}>Login</Link>
					<Link to={"/register"}>Register</Link>
				</AuthLinks>
			)}
		</nav>
	);
};

export default Navbar;
