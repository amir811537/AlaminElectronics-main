import React, { useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import { GoHeart } from "react-icons/go";
import { Rating, RoundedStar } from "@smastrom/react-rating";

import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "@smastrom/react-rating/style.css";
import { Link } from "react-router-dom";
import {
	useSetWishListProductMutation,
	useGetSingleProductsQuery,
	useSetCartProductMutation,
} from "../redux/api/baseApi";
import toast from "react-hot-toast";



const ProductCard = ({ item, discount }) => {
	
	// console.log(discount)

	const { email, isInitializing } = useSelector((state) => state.userSlice);
	const [setWishListProduct, { data: wishListdata }] = useSetWishListProductMutation();
	const navigate = useNavigate()
	const [setCart, { data: cartData, error: cartError }] = useSetCartProductMutation()


	// console.log(wishListdata);

	const addToWishList = async () => {
		if (!item || !email) {
			return navigate("/login")
		}

		const { _id, ...rest } = item;

		const wishListObject = {
			productId: _id,
			email: email,
			...rest
		};

		try {
			await setWishListProduct(wishListObject);
			toast.success('product Added to WishList', {
				style: {
					padding: '16px',
					color: '#ffffff',
					background: '#DB4444',
				},
				iconTheme: {
					primary: '#ffffff',
					secondary: '#DB4444',
				},
			});

		} catch (error) {
			console.error('Error adding to wishlist:', error);
			toast.error('Something went wrong')
		}
	};


	const addToCart = async () => {
		if (!item || !email) {
			return navigate("/login")
		}

		const { _id, ...rest } = item;

		const cartObject = {
			productId: _id,
			email: email,
			quantity: 1,
			...rest
		};

		try {
			await setCart(cartObject)
			toast.success('product Added to Cart', {
				style: {
					padding: '16px',
					color: '#ffffff',
					background: '#DB4444',
				},
				iconTheme: {
					primary: '#ffffff',
					secondary: '#DB4444',
				},
			});
		} catch (error) {
			console.error('Error adding to cart:', error);

		}
	};

	return (<div>
		<div>

			<div className="lg:w-[250px] mt-5 overflow-hidden">

				<div className="rounded-md relative  bg-[#F5F5F5]">
					<div className="p-6 max-h-[250px] flex items-center">
						<img src={item?.imageUrl} className="mx-auto " alt="" />
					</div>
					<button onClick={addToCart} className="flex hover:text-black rounded-b-md rounded-none w-full text-white  bg-black btn ">
						<IoCartOutline className="text-xl mr-2" />
						<h1 className="texg-">Add to Cart </h1>
					</button>
					<Link to={`/productdetail/${item?._id}`}

						className="bg-white hover:bg-primary hover:text-white duration-200 p-2 top-3 right-3 rounded-full absolute"
					>
						<IoEyeOutline className="text-xl" />
					</Link>

					<button onClick={addToWishList} className="bg-white hover:bg-primary hover:text-white duration-200 p-2  text-black top-16 right-3 rounded-full absolute">
						<GoHeart className=" text-xl" />
					</button>

					<div className={discount ? "" : "hidden"}>
						<p className="absolute bg-primary py-1 px-4 text-white rounded-md top-5 left-5">{discount ? `- ${discount}%` : ""}</p>
					</div>
				</div>

				<h1 className="mb-2 lg:mb-auto my-4 text-sm lg:min-h-12 font-medium">{item?.title}</h1>
				<h1 className="lg:text-xl   font-medium text-primary ">
					BDT {item?.discountedPrice ? item?.discountedPrice : item?.price} <span >{item?.discountedPrice ? <span className=" text-[#00000090] line-through	">{item?.price}</span> : <span className="text-black font-base font-normal text-base">({item?.sellCount || 0} sold)</span>}</span>
				</h1>
				{/* <Rating className="mt-4" style={{ maxWidth: 120 }} itemStyles={myStyles} value={4} readOnly  /> */}
			</div></div>

		{/* ({item?.sellCount || 0} sold) */}


	</div>
	);
};

export default ProductCard;
