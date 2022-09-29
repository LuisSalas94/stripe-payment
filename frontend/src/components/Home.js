import React from "react";
import { useGetAllProductsQuery } from "../features/productsAPI";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const { data, error, isLoading } = useGetAllProductsQuery();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleAddToCart = (product) => {
		dispatch(addToCart(product));
		navigate("/cart");
	};

	return (
		<div className="home-container">
			{isLoading ? (
				<h1>Loading...</h1>
			) : error ? (
				<p>An error occured...</p>
			) : (
				<>
					<h2>New Arrivals</h2>
					<div className="products">
						{data?.map((product) => {
							return (
								<div key={product.id} className="product">
									<h3>{product.name}</h3>
									<img src={product.image} alt={product.name} />
									<div className="details">
										<span>{product.desc}</span>
										<span className="price">${product.price}</span>
									</div>
									<button onClick={() => handleAddToCart(product)}>
										Add To Cart
									</button>
								</div>
							);
						})}
					</div>
				</>
			)}
		</div>
	);
};

export default Home;
