import "./App.css";
import Product from "./Components/Product";
import { FaArrowUpLong, FaArrowDownLong } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { BsGridFill } from "react-icons/bs";
import { FaList } from "react-icons/fa6";
import ProductDetailModal from "./Components/ProductDetailModal";
import { useEffect, useState } from "react";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import ProductList from "./Components/ProductList";
import { TbArrowsSort } from "react-icons/tb";
import useFilter from "./Hook/useFilter";
import useFetch from "./Hook/useFetch";
import loading from "./assets/Infinity@1x-1.0s-200px-200px.gif";
function App() {
	// Fetching data from FakeStore Api using useFetch custom Hook
	const [products, isLoading, error] = useFetch(
		"https://fakestoreapi.com/products"
	);

	// State to store unique product categories of fetched Data (products) for filtering
	const [category, setCategory] = useState([]);

	// State to manage selected categories for filtering
	const [checkedCategories, setCheckedCategories] = useState([]);

	// State to store the lowest price for adding min value in highestPrice input
	const [lowestPrice, setLowestPrice] = useState(0);

	// state to hold the data of which product is clicked to get detailed view in modal
	const [selectedProduct, setSelectedProduct] = useState(0);

	// used to hold the layout mood grid and list
	const [layout, setLayout] = useState("grid");

	// this is predefined config hook of different filter mood
	const [filterConfig, setFilterConfig] = useState({
		sortBy: "descending", //filter hook will convert it & render data in default mood.
		searchTerm: "", // input search data
		category: category, // product category
		priceLowest: 0, //lowest price of product
		priceHighest: 50000, //highest price of product
	});

	// use Filter is a custom hook that apply all type of  filter based on filterConfig
	const filterProduct = useFilter(products, filterConfig, setFilterConfig);

	// getting the unique product category name and setting in filterConfig
	const categoryList = new Set(
		products?.map((product) => product.category.toUpperCase())
	);

	useEffect(() => {
		if (products) {
			setCategory(categoryList);
			setCheckedCategories([...categoryList]);
			setFilterConfig((prevConfig) => ({
				...prevConfig,
				category: [...categoryList],
			}));
		}
	}, [products]);

	if (isLoading) {
		return (
			<div className="h-screen  flex justify-center items-center flex-col">
				{" "}
				<span>
					<img src={loading} className="w-20 " alt="" />
				</span>
				Loading...
			</div>
		);
	}

	if (error) return <div>Error: {error.message}</div>;

	// This function will set the search input to filterConfig
	const handleSearchChange = (e) => {
		setFilterConfig((prevConfig) => ({
			...prevConfig,
			searchTerm: e.target.value,
			category: [...categoryList],
			priceLowest: 0,
			priceHighest: 5000,
		}));
	};

	// This function is used to set the sortBy value in filterConfig based on it's previous state
	const handleSort = () => {
		if (filterConfig.sortBy == "default") {
			setFilterConfig((prevConfig) => ({
				...prevConfig,
				sortBy: "ascending",
			}));
		} else if (filterConfig.sortBy == "ascending") {
			setFilterConfig((prevConfig) => ({
				...prevConfig,
				sortBy: "descending",
			}));
		} else if (filterConfig.sortBy == "descending") {
			setFilterConfig((prevConfig) => ({
				...prevConfig,
				sortBy: "default",
			}));
		}
	};

	// This is function detects which checkbox are checked and set in in a array and set the array in filterConfig category
	const handleCheckboxChange = (event) => {
		const { id, checked } = event.target;

		if (id && checked) {
			setCheckedCategories((prevCheckedCategories) => {
				const updatedCategories = [...prevCheckedCategories, id];
				setFilterConfig((prevConfig) => ({
					...prevConfig,
					category: updatedCategories,
				}));
				return updatedCategories;
			});
		} else {
			setCheckedCategories((prevCheckedCategories) => {
				const updatedCategories = prevCheckedCategories.filter(
					(category) => category !== id
				);
				setFilterConfig((prevConfig) => ({
					...prevConfig,
					category: updatedCategories,
				}));
				return updatedCategories;
			});
		}
	};

	// This function takes the lowest price and highest price form input and update it into filterConfig priceHighest and priceLowest
	const handleSubmitPrice = (e) => {
		e.preventDefault();
		const priceHighest = e.target.highest_price.value;
		const priceLowest = e.target.lowest_price.value;
		setFilterConfig((prevConfig) => ({
			...prevConfig,
			priceHighest: priceHighest,
			priceLowest: priceLowest,
		}));
	};

	// This function is used to open modal based on products when view detail button is clicked
	const showModal = (product) => {
		setSelectedProduct(product);
		const modal = document.getElementById("product-detail");
		if (modal) {
			modal.showModal();
		} else {
			console.error("Modal element not found");
		}
	};

	return (
		<div className="bg-image  ">
			<div className="flex flex-col  md:flex-row      gap-5 px-5 lg:px-14 pt-6">
				<div className="flex-grow">
					<label className="border-[1px] p-2 rounded-lg   flex-grow input-bordered border-blue-700 px-8 flex items-center gap-2">
						<IoSearch />
						<input
							onChange={handleSearchChange}
							type="text"
							className="grow bg-transparent outline-none"
							placeholder="Search Products"
						/>
					</label>
				</div>

				<div className="flex gap-3">
					{/* Sort button */}
					<div
						onClick={handleSort}
						className="flex flex-1  justify-center items-center gap-2 input input-bordered"
					>
						Sort by{" "}
						{filterConfig.sortBy == "descending" ? (
							<FaArrowDownLong />
						) : filterConfig.sortBy == "ascending" ? (
							<FaArrowUpLong />
						) : (
							<TbArrowsSort />
						)}
					</div>

					{/* Layout changing Button */}
					<div className="join text-2xl ">
						<span
							onClick={() => {
								setLayout("grid");
							}}
							className={` ${
								layout == "grid"
									? "bg-[#D1C4E9] text-blue-700"
									: ""
							}   join-item btn`}
						>
							<BsGridFill className="text-xl  bg-" />
						</span>
						<span
							onClick={() => {
								setLayout("List");
							}}
							className={` ${
								layout == "grid"
									? ""
									: "bg-[#D1C4E9] text-blue-700"
							}   join-item btn`}
						>
							<FaList className="text-xl " />
						</span>
					</div>
				</div>
			</div>

			{/* product Section */}

			<div className="flex mt-4 ">
				{/* Category section */}
				<div className=" hidden lg:block w-1/4 h-auto bg-transparent p-4 lg:p-0  lg:pl-10 pt-0 ">
					<h1 className="text-2xl mt-10 md:mt-0   px-4 font-medium">
						Filter From
					</h1>

					<form
						onSubmit={handleSubmitPrice}
						className="lg:flex mt-5 px-4 items-center gap-4"
					>
						<div className="flex gap-2 items-center">
							<input
								onChange={(e) => setLowestPrice(e.target.value)}
								type="number"
								className="input bg-transparent border-black input-bordered w-full  "
								name="lowest_price"
								placeholder="$ From"
								min={0}
							/>
							<span className="font-bold">-</span>
							<input
								type="number"
								className="input  bg-transparent border-black input-bordered w-full  "
								name="highest_price"
								placeholder="$ To"
								min={lowestPrice}
							/>
						</div>
						<button
							type="submit"
							className="btn mt-4 lg:mt-0 w-full lg:w-fit btn-primary"
						>
							{" "}
							<MdOutlineArrowForwardIos />
						</button>
					</form>
					<h1 className="text-2xl mt-8 px-4 font-medium">
						Filter Check
					</h1>

					<div className="text-base mt-5 font-normal text-black ">
						{[...category]?.map((item, index) => (
							<label
								key={index}
								htmlFor={item}
								className="py-2 px-4 flex justify-between items-center"
							>
								<label className="flex gap-2">
									<input
										type="checkbox"
										id={item}
										className="checkbox rounded-none checkbox-sm checkbox-primary"
										defaultChecked
										onChange={handleCheckboxChange}
									/>
									<h2 className=" "> {item}</h2>
								</label>
							</label>
						))}
					</div>
				</div>

				{/* product viewing section */}
				<div className="px-5 w-full lg:w-3/4 ">
					{layout == "grid" ? (
						<div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
							{filterProduct?.map((product) => (
								<Product
									key={product.id}
									item={product}
									showModal={showModal}
								/>
							))}
							<ProductDetailModal
								item={
									selectedProduct || products
										? products[0]
										: ""
								}
							/>
						</div>
					) : (
						<div className="space-y-4">
							{filterProduct?.map((product) => (
								<ProductList
									key={product.id}
									item={product}
									showModal={showModal}
								></ProductList>
							))}
							<ProductDetailModal
								item={selectedProduct || products[0]}
							/>
						</div>
					)}
				</div>
			</div>

			{/* Drayer will be shown when clicking filter button on mobile or tablet screen */}
			<div className="drawer">
				<input
					id="my-drawer"
					type="checkbox"
					className="drawer-toggle"
				/>
				<div className="drawer-content">
					{/* Page content here */}
					<label
						htmlFor="my-drawer"
						className="btn lg:hidden rounded-sm fixed bottom-16 right-5 btn-primary text-xl"
					>
						
					</label>
				</div>
				<div className="drawer-side">
					<label
						htmlFor="my-drawer"
						aria-label="close sidebar"
						className="drawer-overlay"
					></label>
					<ul className="menu w-80 min-h-full bg-base-200 text-base-content">
						{/* Sidebar content here */}
						<div className=" h-screen lg:h-auto   ">
							<h1 className="text-2xl mt-10 md:mt-0   px-4 font-medium">
								Filter From
							</h1>

							<form
								onSubmit={handleSubmitPrice}
								className="lg:flex mt-5 px-4 items-center gap-4"
							>
								<div className="flex gap-2 items-center">
									<input
										required
										onChange={(e) =>
											setLowestPrice(e.target.value)
										}
										type="number"
										className="input bg-transparent border-black input-bordered w-full  "
										name="lowest_price"
										placeholder="$ From"
										min={0}
									/>
									<span className="font-bold">-</span>
									<input
										required
										type="number"
										className="input  bg-transparent border-black input-bordered w-full  "
										name="highest_price"
										placeholder="$ To"
										min={lowestPrice}
									/>
								</div>
								<button
									type="submit"
									className="btn mt-4 lg:mt-0 w-full lg:w-fit btn-primary"
								>
									{" "}
									<MdOutlineArrowForwardIos />
								</button>
							</form>
							<h1 className="text-2xl mt-8 px-4 font-medium">
								Filter Category
							</h1>

							<div className="text-base mt-5 font-normal text-black ">
								{[...category]?.map((item, index) => (
									<label
										key={index}
										htmlFor={item}
										className="py-2 px-4 flex justify-between items-center"
									>
										<label className="flex gap-2">
											<input
												type="checkbox"
												id={item}
												className="checkbox rounded-none checkbox-sm checkbox-primary"
												defaultChecked
												onChange={handleCheckboxChange}
											/>
											<h2 className=" "> {item}</h2>
										</label>
									</label>
								))}
							</div>
						</div>
					</ul>
				</div>
			</div>
		</div>
	);
}

export default App;