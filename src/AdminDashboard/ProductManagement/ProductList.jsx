import React from "react";
import { useGetProductsQuery } from "../../redux/api/baseApi";
import { Link } from "react-router-dom";
const ProductList = () => {

	const { data: products, isLoading } = useGetProductsQuery({ limit: 120 }, {
		pollingInterval: 30000,
		refetchOnMountOrArgChange: true,
	})
	console.log(products)

	const elements = Array.from({ length: 7 });


	return (
		<div className="px-4 ">

			
			<div className="">
				<div className="grid  grid-cols-8 md:grid-cols-9 font-medium ">
					<h1 className="col-span-6 md:col-span-4">Product</h1>
					<h1 className="col-span-2 hidden md:block">Price</h1>
					<h1 className="col-span-2 hidden md:block">Quantity</h1>
					<h1 className="col-span-1 ">Edit</h1>
				</div>

				{isLoading ? elements?.map((_, index) => (
				<div key={index} className="grid my-10  grid-cols-9 font-medium ">
					<div className="flex relative items-center col-span-4 gap-2">
						<div className="skeleton w-10 h-10 "></div>
						<h1 className="skeleton w-52 h-6 rounded-sm col-span-2"></h1>
						<h1 className="text-red-500 text-xl -top-1 absolute"></h1>
					</div>
					<h1 className="col-span-2 skeleton w-20 h-6 rounded-sm"></h1>
					<div className="col-span-2">
						<h1 className="skeleton w-5 h-5"></h1>
					</div>
					<div className="skeleton w-16 h-10 rounded-md"></div>
				</div>
			)) : ""}

				{
					products?.map(item => <div key={item?._id} className="grid grid-cols-8 md:grid-cols-9 gap-4  font-medium my-10">
						<div className="flex relative items-center md:col-span-4 col-span-6  gap-2">
							<div className="min-w-12 ">
								<img src={item?.imageUrl} className="w-10  p-0" alt="" />
							</div>
							<h1 className="max-w-72 col-span-2">
								{" "}
								{item?.title}
							</h1>
							<h1 className="text-red-500 text-xl   -top-1 absolute"></h1>
						</div>
						<h1 className="col-span-2 hidden md:block ">BDT {item?.price}</h1>
						<div className="col-span-2 hidden md:block">
							<h1 className="">5</h1>
						</div>
						<Link to={`/admin/editproducts/${item?._id}`} ><button className="btn  btn-outline text-primary  rounded-sm btn-">
							Edit{" "}
						</button></Link>
					</div>)
				}

			</div>
		</div>
	);
};

export default ProductList;
