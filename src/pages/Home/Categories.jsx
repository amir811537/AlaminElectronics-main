import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { setCategories } from "../../redux/features/filter/filterSlice";
import { Link } from "react-router-dom";

const Categories = ({ categories, isLoading }) => {
  const dispatch = useDispatch();
  const swiperRef = useRef(null); // Create a reference for the swiper instance

  const handleSelectCategory = (category) => {
    dispatch(setCategories({ categories: category }));
  };

  // Function to slide to the previous slide
  const slidePrev = () => {
    swiperRef.current.swiper.slidePrev();
  };

  // Function to slide to the next slide
  const slideNext = () => {
    swiperRef.current.swiper.slideNext();
  };

  return (
    <div className="my-12 p-5 lg:p-0">
      {/* Category Title */}
      <div className="flex">
        <span className="p-2 rounded-sm bg-primary"></span>
        <h1 className="text-xl font-medium border-l-primary border-l- pl-4">
          Categories
        </h1>
      </div>

      {/* Header Title */}
      <div className="flex justify-between items-center my-10">
        <h1 className="text-xl lg:text-4xl font-medium font-inter">
          Browse By Category
        </h1>
        <div className="flex items-center justify-between gap-4">
          <button onClick={slidePrev}>
            <FaArrowLeftLong className="text-xl" />
          </button>
          <button onClick={slideNext}>
            <FaArrowRightLong className="text-xl" />
          </button>
        </div>
      </div>

      {/* Swiper Container */}
      <div className="relative">
        <Swiper
          modules={[Navigation]}
          ref={swiperRef} // Set the ref to the swiper component
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            300: { slidesPerView: 3 },
            640: { slidesPerView: 3 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 6 },
          }}
        >
          {isLoading ? (
            <div className="flex gap-6">
              {Array(6)
                .fill()
                .map((_, index) => (
                  <div
                    key={index}
                    className="skeleton rounded-none min-h-32 lg:min-h-44 min-w-28 lg:min-w-44"
                  ></div>
                ))}
            </div>
          ) : (
            categories?.map((item, index) => (
              <SwiperSlide key={index}>
                <Link to={`/allproduct`} onClick={() => handleSelectCategory(item?.title)}>
                  <div className="flex flex-col items-center justify-center border-2 p-4 md:min-w-44 md:min-h-44 min-h-40 min-w-28">
                    <img src={item?.imageurl} alt={item?.title} className="w-14 h-14 mb-2" />
                    <h1>{item?.title}</h1>
                  </div>
                </Link>
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default Categories;
