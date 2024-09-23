import React, { useState } from "react";

import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useGetCategoryListQuery } from "../../redux/api/baseApi";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCategories } from "../../redux/features/filter/filterSlice";

const Categories = ({ categories  , isLoading}) => {
	const [currentSlider, setCurrentSlider] = useState(0);
	const dispatch = useDispatch()

	const handleSelectCategory = (category) => {
		dispatch(setCategories({
			categories: category
		}))
		console.log(category);
	}

	



	const prevSlider = () =>
		setCurrentSlider((currentSlider) =>
			currentSlider === 0 ? categories.length - 6 : currentSlider - 1
		);
	const nextSlider = () =>
		setCurrentSlider((currentSlider) =>
			currentSlider === categories.length - (isSmallScreen ? 3 : 6) ? 0 : currentSlider + 1
		);
	const isSmallScreen = window.innerWidth <= 768;
	return (
		<div className="my-12 p-5 lg:p-0">
			<div className="flex ">
				<span className="p-2 rounded-sm bg-primary"></span>
				<h1 className="text-xl font-medium border-l-primary border-l- pl-4">
					Categories
				</h1>
			</div>
			<h1 className="text-2xl lg:text-4xl mt-10 font-medium font-inter">
				Browse By Category
			</h1>


			<div className="  flex flex-col xl:flex-row items-center justify-center gap-5 lg:gap-10 relative">
				{/* arrow */}
				<div className="absolute   -top-12 right-0 text-2xl  flex gap-2 lg:gap-8 z-50 pl-5">
					{/* arrow left */}
					<button
						onClick={prevSlider}
						className="bg-base-200 p-4 rounded-full"
					>
						<FaArrowLeftLong />
					</button>
					{/* arrow right */}
					<button
						onClick={nextSlider}
						className="bg-base-200 p-4 rounded-full"
					>
						{" "}
						<FaArrowRightLong />
					</button>
				</div>
				{/* text container here */}

				{/* slider container */}
				<div className="w-screen  px-4 md:px-0 overflow-hidden mt-10 a z-50  ">
					<div
						className="ease-linear duration-300 flex  lg:gap-4 items-center"
						style={{
							transform: `translateX(-${currentSlider * (isSmallScreen ? 140 : 220)
								}px)`,
						}}
					>
						{/* sliders */}

						{
							isLoading ? <div className="flex gap-6">
									<div className="skeleton rounded-none min-h-32 lg:min-h-44 min-w-28 lg:min-w-44 "></div>
									<div className="skeleton rounded-none min-h-32 lg:min-h-44 min-w-28 lg:min-w-44 "></div>
									<div className="skeleton rounded-none min-h-32 lg:min-h-44 min-w-28 lg:min-w-44 "></div>
									<div className="skeleton rounded-none min-h-32 lg:min-h-44 min-w-28 lg:min-w-44 "></div>
									<div className="skeleton rounded-none min-h-32 lg:min-h-44 min-w-28 lg:min-w-44 "></div>
									<div className="skeleton rounded-none min-h-32 lg:min-h-44 min-w-28 lg:min-w-44 "></div>
									<div className="skeleton rounded-none min-h-32 lg:min-h-44 min-w-28 lg:min-w-44 "></div>
									<div className="skeleton rounded-none min-h-32 lg:min-h-44 min-w-28 lg:min-w-44 "></div>
							</div> : null
						}
						{categories?.map((item, inx) => (
							<Link to={`/allproduct`} >
								<div onClick={() => handleSelectCategory(item?.title)}
									key={inx}
									className={`  ${currentSlider - 1 === inx
										? "scale-0"
										: "scale-100 delay-500"
										} duration-300 rounded-lg z-50`}
								>
									<div className="flex  mr-7 md:mr-7 md:ml-5 lg:ml-0 lg:mr-7  justify-center items-center lg:p-2 border-2   md:min-w-44 text-center md:min-h-44 min-h-40 min-w-28 space-y-2">
										<div className="">
											<div className="flex mb-2 lg:mb-4 justify-center items-center">
												{" "}
												<img
													src={item?.imageurl}
													alt=""
													className="w-14 h-14 "
												/>
											</div>{" "}
											<h1>{item?.title}</h1>
										</div>
									</div>
								</div>
							</Link>
						))}
					</div>
				</div>
			</div>

		</div>
	);
};

export default Categories;
//to={`/allproduct`}	