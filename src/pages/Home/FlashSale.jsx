import React, { useState } from 'react';
import Countdown from "react-countdown";

import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
import ProductCard from '../../Components/ProductCard';
import { useGetFlashSaleQuery } from '../../redux/api/baseApi';
const FlashSale = () => {


	const { data: flashSale } = useGetFlashSaleQuery()

	console.log(flashSale?.endTime)



	const renderer = ({ days, hours, minutes, seconds, completed }) => {
		return (
			<div className="flex items-center font-bold gap-5">
				<div>
					<h1 className="text-base">Days</h1>
					<h1 className="text-3xl lg:text-5xl font-bold">{days}</h1>
				</div>
				<span className="text-primary text-3xl lg:text-5xl font-bold">:</span>
				<div>
					<h1 className="text-base">Hours</h1>
					<h1 className="text-3xl lg:text-5xl font-bold">{hours}</h1>
				</div>
				<span className="text-primary text-3xl lg:text-5xl font-bold">:</span>
				<div>
					<h1 className="text-base">Munite</h1>
					<h1 className="text-3xl lg:text-5xl font-bold">{minutes}</h1>
				</div>
				<span className="text-primary text-3xl lg:text-5xl font-bold">:</span>
				<div>
					<h1 className="text-base">Second</h1>
					<h1 className="text-3xl lg:text-5xl font-bold">{seconds}</h1>
				</div>
			</div>
		);
	};


	const [currentSlider, setCurrentSlider] = useState(0)

	const prevSlider = () =>
		setCurrentSlider((currentSlider) =>
			currentSlider === 0 ? flashSale?.products.length - 4 : currentSlider - 1
		);
	const nextSlider = () =>
		setCurrentSlider((currentSlider) =>
			currentSlider === flashSale?.products.length - 4 ? 0 : currentSlider + 1
		);
	const isSmallScreen = window.innerWidth <= 768;


	return (
		
			flashSale?.products.length > 0 ? <div className='lg:px-0 px-5'>
			<div className="mt-10 lg:mt-20 mb-5 lg:mb-8">
				<div className="flex ">
					<span className="p-2 rounded-sm bg-primary"></span>
					<h1 className="text-xl font-medium border-l-primary border-l- pl-4">
						Today's <span className='lg:hidden '>Flash Sale</span>
					</h1>
				</div>
			</div>
			<div className="flex gap-20 items-center  ">
				<h1 className="text-4xl hidden lg:block font-medium font-inter">Flash Sale</h1>
					<div className="text-xl">
						<Countdown
							className="tet-xl "
							date={new Date(flashSale?.endTime).getTime() || Date.now() }
							renderer={renderer}
						/>
					</div>
				
			</div>
			<div>
				<div className="w-full  hidden lg:flex  h-60 sm:h-96 md:h-[540px]  flex-col xl:flex-row items-center justify-center gap-5 lg:gap-10 relative">
					{/* arrow */}
					<div className="absolute   -top-12 right-0 text-2xl  flex gap-8 z-50 pl-5">
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
					<div className=" overflow-hidden  a z-50 py-5  lg:py-10">
						<div
							className="ease-linear duration-300 flex gap-4 items-center"
							style={{
								transform: `translateX(-${currentSlider * (isSmallScreen ? 98 : 330)
									}px)`,
							}}
						>
							{/* sliders */}
							{flashSale?.products?.map((item, inx) => (
								<div
									key={inx}
									className={`mr-16  ${currentSlider - 1 === inx
										? "scale-0"
										: "scale-100 delay-500"
										} duration-300 rounded-lg z-50`}
								>
									<ProductCard discount={flashSale?.discount} item={item} ></ProductCard>
								</div>
							))}
						</div>
					</div>


				</div>
			</div>

			<div className="lg:hidden grid mt-10 gap-5 grid-cols-2">
				{flashSale?.products?.map((item, inx) => (

					<ProductCard discount={flashSale?.discount} item={item} ></ProductCard>

				))}
			</div>
		</div> : null
		
		
	);
};

export default FlashSale;