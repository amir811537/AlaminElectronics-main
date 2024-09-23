import React, { useEffect, useState } from "react";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import noProductImage from "../../assets/Others/no-product-found.png"
import ProductCard from "../../Components/ProductCard";
import {
	useGetCategoryListQuery,
	useGetProductsQuery,
} from "../../redux/api/baseApi";
import { useForm } from "react-hook-form";
import Categories from "../Home/Categories";
import { useDispatch, useSelector } from "react-redux";
import sortBy from "sort-by";
import Pagination from "../../Components/Pagination";
import {
	setCategories,
	setLimit,
	setPage,
} from "../../redux/features/filter/filterSlice";

const AllProduct = () => {
	// Filter Hook is used to set to give params to filter products
	const [filter, setFilter] = useState({});

	const dispatch = useDispatch();
	const { handleSubmit, register } = useForm();

	const { data: categoryItems, isLoading: categoryLoading } = useGetCategoryListQuery();
	const { data: products, isLoading } = useGetProductsQuery(filter, {
		pollingInterval: 30000,
		refetchOnMountOrArgChange: true,

	});
	const { searchText, page, limit, categories } = useSelector(
		(state) => state.filterSearch
	);

	const [selectedCategories, setSelectedCategories] = useState([]);

	// console.log(categories, "theese are selectecdc ate");

	const [text, setText] = useState(`Showing ${products?.length} item `);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);

	useEffect(() => {
		if (typeof categories === "string") {
			setSelectedCategories(categories?.split(","));
		}
	}, [categories]);

	useEffect(() => {
		setFilter({ ...filter, searchText, limit, page, category: categories });

		if (searchText !== "") {
			setText(`Showing ${products?.length} item for ${searchText}`);
		} else {
			setText(`Showing ${products?.length} item`);
		}

		if (products?.length === 0) {
			dispatch(setPage({ page: 0 }));
		}
	}, [searchText, products, limit, page, selectedCategories, categories]);

	// setting default data to category reducer as string
	useEffect(() => {
		if (categories?.length < 1 && categoryItems?.length > 0) {
			const categoryTitle = categoryItems.map((item) => item?.title);
			const categoryString = categoryTitle.join(",");

			dispatch(setCategories({ categories: categoryString }));
		}
	}, [categoryItems, categories, dispatch]);

	const handleFilterPrice = (data) => {
		console.log("Price Filter Data:", data);
		setFilter({
			...filter,
			maxPrice: data?.maxPrice,
			minPrice: data?.minPrice,
		});
	};

	const handleFilterPriceForLargeDevice = (e) => {

		e.preventDefault()
		const maxPrice = e.target.maxPrice.value
		const minPrice = e.target.minPrice.value

		console.log(maxPrice, minPrice)

		setFilter({
			...filter,
			maxPrice: maxPrice,
			minPrice: minPrice
		});
	};


	const handleFilterCategory = (event) => {
		const { id, checked } = event.target;
		let updatedCategories;

		if (checked) {
			updatedCategories = [...selectedCategories, id];
		} else {
			updatedCategories = selectedCategories.filter(
				(category) => category !== id
			);
		}

		// setSelectedCategories(updatedCategories);
		const categories = updatedCategories.join(",");
		// setFilter({
		// 	...filter,
		// 	category: categories,
		// });

		dispatch(
			setCategories({
				categories: categories,
			})
		);
		console.log("Updated Filter:", filter);
	};

	const handleShowItemPerPage = (e) => {
		const limit = parseInt(e.target.value);

		dispatch(setLimit({ limit }));

		console.log("Items per page:", limit);
	};

	const handleSortBy = (e) => {
		const sortOrder = e.target.value;
		setFilter({
			...filter,
			sortOrder: sortOrder,
			sortBy: "price",
		});
	};



	if (products?.length < 1) {
		return <div className="w-full h-[500px] flex flex-col gap-4 justify-center items-center">
			<img src={noProductImage} alt="" srcset="" />
			<h1 className="text-2xl font-medium">No Products Found</h1>
		</div>
	}



	return (
		<div
			id="start_of_all_product_page"
			className="flex  mx-auto"
		>
			{/* Category section for filtering in large screen  */}
			<div className="lg:pt-5 h-[800px] sticky   top-28 hidden border-r lg:block w-1/4 bg-transparent lg:p-0">
				<h1 className="text-2xl mt-5 md:mt-0 font-medium">
					Select Price range
				</h1>

				<form
					onSubmit={handleFilterPriceForLargeDevice}
					className="flex mt-5 pr-4 items-center gap-4"
				>
					<div className="flex gap-2 items-center">
						<div className="relative w-full">
							<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
								<FaBangladeshiTakaSign />
							</span>
							<input
								type="number"
								className="input focus:border-none focus:outline-none rounded-sm w-full bg-[#FAFAFA] pl-8"
								name="minPrice"
								placeholder="Min"
								min={0}

							/>
						</div>
						<span className="font-bold">-</span>

						<div className="relative w-full">
							<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
								<FaBangladeshiTakaSign />
							</span>
							<input
								type="number"
								className="input pl-8 focus:border-none focus:outline-none rounded-sm w-full bg-[#FAFAFA]"
								name="maxPrice"
								placeholder="Max"
							/>
						</div>
					</div>
					<button
						type="submit"
						className="btn btn-error bg-primary rounded-sm text-white"
					>
						<MdOutlineArrowForwardIos />
					</button>
				</form>

				<h1 className="text-2xl mt-8 font-medium">Select Category</h1>

				<div className="text-base mt-5 font-normal text-black">
					{
						categoryLoading ? <div className="space-y-5" >
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
					{categoryItems?.map((item, index) => (
						<label
							key={index}
							htmlFor={item.title}
							className="py-2 flex justify-between items-center"
						>
							<label className="flex gap-2">
								<input
									type="checkbox"
									id={item?.title}
									className="checkbox rounded-none checkbox-sm checkbox"
									checked={selectedCategories?.includes(
										item?.title
									)}
									onChange={handleFilterCategory}
								/>
								<h2 className="">{item.title}</h2>
							</label>
						</label>
					))}
				</div>
			</div>

			{/* Product viewing section  */}
			<div className="p-5 lg:p-10 pb-2 pt-5 lg:pr-0 w-full lg:w-3/4">
				<div className=" hidden lg:flex mb-5 items-center justify-between gap-5">
					<p className="flex-1 hidden lg:block">{text}</p>
					<div className="flex flex-col lg:flex-row lg:items-center lg:flex-1 gap-2">
						<h1 >Items per Page:</h1>
						<select
							onChange={handleShowItemPerPage}
							className="select select-bordered w-full max-w-[110px] lg:max-w-[150px]"
						>
							<option value={15}>15</option>
							<option selected value={30}>
								30
							</option>
							<option value={50}>50</option>
						</select>
					</div>
					<div className="flex flex-col lg:flex-row  justify-end lg:items-center lg:flex-1 gap-2">
						<h1 className="">Sort By:</h1>
						<select
							onChange={handleSortBy}
							className="select max-w-[110px] select-bordered w-full lg:-w-[150px]"
						>
							<option value="" selected>
								Default
							</option>
							<option value="asc">price min to max</option>
							<option value="desc">Price max to min</option>
						</select>
					</div>
				</div>
				<div className="grid  grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-20">
					{products?.map((item) => (
						<ProductCard key={item.id} item={item} />
					))}
					{
						isLoading ? <>
							<div >
								<div className="skeleton  lg:min-w-[250px] mt-5  rounded-sm h-[250px]	"></div>
								<div className="skeleton  lg:min-w-[250px]  rounded-sm h-[50px] bg-black	"></div>
								<div className="skeleton  lg:min-w-[250px] mt-5  rounded-sm h-[15px]	"></div>
								<div className="skeleton  lg:min-w-[250px] mt-8  rounded-sm h-[20px]	"></div>

							</div>
							<div >
								<div className="skeleton  lg:min-w-[250px] mt-5  rounded-sm h-[250px]	"></div>
								<div className="skeleton  lg:min-w-[250px]  rounded-sm h-[50px] bg-black	"></div>
								<div className="skeleton  lg:min-w-[250px] mt-5  rounded-sm h-[15px]	"></div>
								<div className="skeleton  lg:min-w-[250px] mt-8  rounded-sm h-[20px]	"></div>

							</div>
							<div >
								<div className="skeleton  lg:min-w-[250px] mt-5  rounded-sm h-[250px]	"></div>
								<div className="skeleton  lg:min-w-[250px]  rounded-sm h-[50px] bg-black	"></div>
								<div className="skeleton  lg:min-w-[250px] mt-5  rounded-sm h-[15px]	"></div>
								<div className="skeleton  lg:min-w-[250px] mt-8  rounded-sm h-[20px]	"></div>

							</div>
							<div >
								<div className="skeleton  lg:min-w-[250px] mt-5  rounded-sm h-[250px]	"></div>
								<div className="skeleton  lg:min-w-[250px]  rounded-sm h-[50px] bg-black	"></div>
								<div className="skeleton  lg:min-w-[250px] mt-5  rounded-sm h-[15px]	"></div>
								<div className="skeleton  lg:min-w-[250px] mt-8  rounded-sm h-[20px]	"></div>

							</div>
							<div >
								<div className="skeleton  lg:min-w-[250px] mt-5  rounded-sm h-[250px]	"></div>
								<div className="skeleton  lg:min-w-[250px]  rounded-sm h-[50px] bg-black	"></div>
								<div className="skeleton  lg:min-w-[250px] mt-5  rounded-sm h-[15px]	"></div>
								<div className="skeleton  lg:min-w-[250px] mt-8  rounded-sm h-[20px]	"></div>

							</div>
							<div >
								<div className="skeleton  lg:min-w-[250px] mt-5  rounded-sm h-[250px]	"></div>
								<div className="skeleton  lg:min-w-[250px]  rounded-sm h-[50px] bg-black	"></div>
								<div className="skeleton  lg:min-w-[250px] mt-5  rounded-sm h-[15px]	"></div>
								<div className="skeleton  lg:min-w-[250px] mt-8  rounded-sm h-[20px]	"></div>

							</div>
						</> : null
					}
				</div>
				<div className="flex justify-center mt-20">
					<Pagination />
				</div>

				<div>

					<label htmlFor="my-drawer" className="btn btn-primary bg-primary lg:hidden border-none rounded-sm fixed bottom-24 right-10 ">Filter</label>


				</div>

				{/* category section for small devices */}
				<div className="drawer">
					<input id="my-drawer" type="checkbox" className="drawer-toggle" />
					<div className="drawer-content">

					</div>
					<div className="drawer-side mt-16">
						<label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
						<ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
							{/* Sidebar content here */}
							<div className="lg:pt-5  border-r  h-auto bg-transparent lg:p-0">

								<div className="flex mb-5 items-center justify-between gap-5">
									<p className="flex-1 hidden lg:block">{text}</p>
									<div className="flex flex-col lg:flex-row lg:items-center lg:flex-1 gap-2">
										<h1 >Items per Page:</h1>
										<select
											onChange={handleShowItemPerPage}
											className="select select-bordered rounded-sm w-full max-w-[110px] lg:max-w-[150px]"
										>
											<option value={15}>15</option>
											<option selected value={30}>
												30
											</option>
											<option value={50}>50</option>
										</select>
									</div>
									<div className="flex flex-col lg:flex-row pr-4 lg:pr-0  justify-end lg:items-center lg:flex-1 gap-2">
										<h1 className="">Sort By:</h1>
										<select
											onChange={handleSortBy}
											className="select rounded-sm  max-w-[110px] select-bordered w-full lg:-w-[150px]"
										>
											<option value="" selected>
												Default
											</option>
											<option value="asc">price min to max</option>
											<option value="desc">Price max to min</option>
										</select>
									</div>
								</div>
								<h1 className="text-2xl mt-5 md:mt-0 font-medium">
									Select Price range
								</h1>

								<form
									onSubmit={handleSubmit(handleFilterPrice)}
									className="flex mt-5 pr-4 items-center gap-4"
								>
									<div className="flex gap-2 items-center">
										<div className="relative w-full">
											<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
												<FaBangladeshiTakaSign />
											</span>
											<input
												type="number"
												className="input focus:border-none focus:outline-none rounded-sm w-full bg-[#FAFAFA] pl-8"
												name="lowest_price"
												placeholder="Min"
												min={0}
												{...register("minPrice", { required: true })}
											/>
										</div>
										<span className="font-bold">-</span>

										<div className="relative w-full">
											<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
												<FaBangladeshiTakaSign />
											</span>
											<input
												type="number"
												className="input pl-8 focus:border-none focus:outline-none rounded-sm w-full bg-[#FAFAFA]"
												name="highest_price"
												placeholder="Max"
												{...register("maxPrice", { required: true })}
											/>
										</div>
									</div>
									<button
										type="submit"
										className="btn btn-error bg-primary rounded-sm text-white"
									>
										<MdOutlineArrowForwardIos />
									</button>
								</form>

								<h1 className="text-2xl mt-8 font-medium">Select Products</h1>

								<div className="text-base mt-5 font-normal text-black">
									{categoryItems?.map((item, index) => (
										<label
											key={index}
											htmlFor={item.title}
											className="py-2 flex justify-between items-center"
										>
											<label className="flex gap-2">
												<input
													type="checkbox"
													id={item?.title}
													className="checkbox rounded-none checkbox-sm checkbox"
													checked={selectedCategories?.includes(
														item?.title
													)}
													onChange={handleFilterCategory}
												/>
												<h2 className="">{item.title}</h2>
											</label>
										</label>
									))}
								</div>
							</div>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AllProduct;
