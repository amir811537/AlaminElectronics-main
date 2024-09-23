import React, { useEffect } from "react";
import Slider from "../../Components/Slider";
import Countdown from "react-countdown";
import ProductSlider from "../../Components/ProductSlider";
import FlashSale from "./FlashSale";
import Categories from "./Categories";
import BestSelling from "./BestSelling";
import drone from "../../assets/banner/bannerAdd.png";
import BannerAdd from "./BannerAdd";
import ExploreProduct from "./ExploreProduct";
import { TbTruckDelivery } from "react-icons/tb";
import { RiCoupon2Fill, RiCustomerService2Fill, RiSecurePaymentFill } from "react-icons/ri";
import { LuShieldCheck } from "react-icons/lu";
import {
	useGetCategoryListQuery,
	useGetProductsQuery,
} from "../../redux/api/baseApi";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCategories } from "../../redux/features/filter/filterSlice";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../../../firebase.config";
import { setUser } from "../../redux/features/user/userSlice";
import { Toaster } from "react-hot-toast";
import { FaMoneyBillWave } from "react-icons/fa6";

const Home = () => {


	const { data: categoryItems, isLoading, error } = useGetCategoryListQuery();
	const { data: products } = useGetProductsQuery();
	const dispatch = useDispatch();
	// const isLoading = true


	const handleSelectCategory = (category) => {
		dispatch(setCategories({
			categories: category
		}))
		console.log(category);
	}

	// console.log(products);


	return (
		<div className="lg:max-w-screen-xl xl:max-w-screen-2xl  overflow-hidden mx-auto ">
			<div className="flex ">
				<ul className="border-r-2 font-poppins hidden lg:block w-1/5 space-y-5 pt-5">
					{
						isLoading ? <div className="space-y-5" >
							<div className="skeleton h-7 rounded-md  w-44"></div>
							<div className="skeleton h-7 rounded-md  w-44"></div>
							<div className="skeleton h-7 rounded-md  w-44"></div>
							<div className="skeleton h-7 rounded-md  w-44"></div>
							<div className="skeleton h-7 rounded-md  w-44"></div>
							<div className="skeleton h-7 rounded-md  w-44"></div>
							<div className="skeleton h-7 rounded-md  w-44"></div>
							<div className="skeleton h-7 rounded-md  w-44"></div>
							<div className="skeleton h-7 rounded-md  w-44"></div>
							<div className="skeleton h-7 rounded-md  w-44"></div>
						</div> : ""
					}
					{categoryItems?.map((item) => (
						<li onClick={() => handleSelectCategory(item?.title)} key={item.id}>
							<Link to={`/allproduct`}>
								{item.title}
							</Link>
						</li>
					))}
				</ul>
				<div className="w-full lg:w-4/5 lg:pt-5 lg:pl-5">
					<Slider></Slider>
				</div>
			</div>

			<FlashSale></FlashSale>
			<Categories isLoading={isLoading} categories={categoryItems}></Categories>
			<BestSelling ></BestSelling>
			<BannerAdd></BannerAdd>
			<ExploreProduct explore="explore" products={products}></ExploreProduct>
			<div className="grid grid-cols-1 md:grid-cols-3  gap-14 lg:gap-0 my-10 md:my-20 lg:my-40">
				<div className="space-y-4 text-center">
					<div className="p-2 inline-block bg-blue-400 rounded-full">
						<div className="flex">
							<div className="text-2xl inline-block bg-black p-2 rounded-full">
								<TbTruckDelivery className="text-5xl text-white" />
							</div>
						</div>
					</div>
					<h1 className="font-bold text-2xl">
						FREE DELIVERY
					</h1>
					<p className="text-base">
						Enjoy free delivery on all orders over $140. No extra charges!
					</p>
				</div>
				<div className="space-y-4 text-center">
					<div className="p-2 inline-block bg-green-400 rounded-full">
						<div className="flex">
							<div className="text-2xl inline-block bg-black p-2 rounded-full">
								<RiCoupon2Fill className="text-5xl text-white" />
							</div>
						</div>
					</div>
					<h1 className="font-bold text-2xl">
						COUPON DISCOUNTS
					</h1>
					<p className="text-base">
						Apply coupon codes at checkout to enjoy special discounts and offers.
					</p>
				</div>

				<div className="space-y-4 text-center">
					<div className="p-2 inline-block bg-purple-400 rounded-full">
						<div className="flex">
							<div className="text-2xl inline-block bg-black p-2 rounded-full">
								<RiSecurePaymentFill className="text-5xl text-white" />
							</div>
						</div>
					</div>
					<h1 className="font-bold text-2xl">
						SECURE PAYMENTS
					</h1>
					<p className="text-base">
						Shop confidently with SSLCommerz, ensuring your payment details are secure.
					</p>
				</div>
			</div>



		</div>
	);
};

export default Home;
