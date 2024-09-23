import React, { useState } from "react";
import ProductCard from "../../Components/ProductCard";
import { useGetProductsQuery } from "../../redux/api/baseApi";
import { Link } from "react-router-dom";

const BestSelling = ({ categories }) => {
	const [currentSlider, setCurrentSlider] = useState(0);
	const { data: bestSellingProduct, isLoading } = useGetProductsQuery({ limit: 4, sortBy: "sellCount", sortOrder: "desc" })

	// console.log(bestSellingProduct);
	// const isLoading = true

	const elements = Array.from({ length: 7 });


	return (
		<div className="lg:my-20 my-10 px-5 lg:px-0">
			<div className="flex justify-between items-center">
				<div >
					<div className="flex ">
						<span className="p-2 rounded-sm bg-primary"></span>
						<h1 className="text-xl font-medium border-l-primary border-l- pl-4">
							This Month
						</h1>
					</div>
					<h1 className="text-2xl lg:text-4xl mt-4 lg:mt-10 font-medium font-inter">
						Best Selling Products
					</h1>

				</div>
				<Link to="/allProduct" className="btn btn-error px-8 text-white  bg-primary rounded-sm ">
					view All
				</Link>
			</div>

			<div className="relative">
				<div className=" overflow-hidden grid grid-cols-2 gap-5 md:flex justify-between  md:mt-10 a z-50  ">

					{
						isLoading ? <div className="flex w-full justify-between">
							{
								elements?.map(item => <div >
									<div className="skeleton  lg:min-w-[250px] mt-5  rounded-sm h-[250px]	"></div>
									<div className="skeleton  lg:min-w-[250px]  rounded-sm h-[50px] bg-black	"></div>
									<div className="skeleton  lg:min-w-[250px] mt-5  rounded-sm h-[15px]	"></div>
									<div className="skeleton  lg:min-w-[250px] mt-8  rounded-sm h-[20px]	"></div>
	
								</div> )
							}
							
						</div> : ""
					}
					{bestSellingProduct?.map((item, inx) => (
						<div
							key={inx}
							className={`flex justify-between  rounded-lg z-50`}
						>
							<ProductCard item={item}></ProductCard>
						</div>
					))}
				</div>


			</div>
		</div>
	);
};

export default BestSelling;
