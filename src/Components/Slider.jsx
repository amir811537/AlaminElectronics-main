import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

import Banner2 from "../assets/banner/banner1.webp";
import Banner3 from "../assets/banner/banner2-Photoroom.webp";
import Banner1 from "../assets/banner/banner3.webp";
import Banner4 from "../assets/banner/banner4.webp";
import Banner5 from "../assets/banner/banner5.webp";

export default function Slider() {
	return (
		<>
			<Swiper
				spaceBetween={30}
				centeredSlides={true}
				autoplay={{
					delay: 2500,
					disableOnInteraction: false,
				}}
				pagination={{
					clickable: true,
				}}
				// navigation={true}
				modules={[Autoplay, Pagination, Navigation]}
				className="mySwiper"
			>
				<SwiperSlide>
					<img
						src={Banner3}
						className="w-full h-[220px] md:h-[330px] lg:h-[450px] 2xl:h-[500px]"
						alt=""
						srcset=""
					/>
				</SwiperSlide> 
				<SwiperSlide>
					<img
						src={Banner4}
						className="w-full h-[220px] md:h-[330px] lg:h-[450px] 2xl:h-[500px]"
						alt=""
						srcset=""
					/>
				</SwiperSlide>
				<SwiperSlide>
					<img
						src={Banner1}
						className="w-full h-[220px] md:h-[330px] lg:h-[450px] 2xl:h-[500px]"
						alt=""
						srcset=""
					/>
				</SwiperSlide>
				<SwiperSlide>
					<img
						src={Banner2}
						className="w-full h-[220px] md:h-[330px] lg:h-[450px] 2xl:h-[500px]"
						alt=""
						srcset=""
					/>
				</SwiperSlide>
				<SwiperSlide>
					<img
						src={Banner5}
						className="w-full h-[220px] md:h-[330px] lg:h-[450px] 2xl:h-[500px]"
						alt=""
						srcset=""
					/>
				</SwiperSlide>
			</Swiper>
		</>
	);
}
