import React, { useEffect, useState, useRef } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./productdetail.css";
import {
  useGetSingleProductsQuery,
  useSetCartProductMutation,
  useSetWishListProductMutation,
} from "../../redux/api/baseApi";
import toast from "react-hot-toast";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";

const ProductDetail = () => {
  const { id } = useParams();
  const { data: product, isLoading: productLoading } = useGetSingleProductsQuery(id);
  const { email } = useSelector((state) => state.userSlice);
  const [setWishListProduct] = useSetWishListProductMutation();
  const [setCart] = useSetCartProductMutation();
  const navigate = useNavigate();
  const swiperRef = useRef(null); // Ref for Swiper instance

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Function to get all images (from either `imageUrl` or `imageUrls`)
  const getImages = () => {
    if (product?.imageUrls && Array.isArray(product.imageUrls)) {
      return product.imageUrls;
    } else if (product?.imageUrl) {
      return [product.imageUrl];
    }
    return [];
  };
  
  const images = getImages();

  // Handle Thumbnail Click
  const handleThumbnailClick = (index) => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

  if (productLoading)
    return <div>Loading...</div>;

 //  wishlist ---------------------------------------

 const addToWishList = async () => {
  if (!product || !email) {
    console.error('Product or email is undefined', { product, email });
    return navigate("/login")
  }

  const { _id, ...rest } = product;

  const wishListObject = {
    productId: _id,
    email: email,
    ...rest
  };

  // Lenovo IdeaPad Flex 5 14ALC7
  // BDT 93500 (0 sold)

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
    setActionStatus('error');
  }
};




// add ot cart ============================================

const addToCart = async () => {
  if (!product || !email) {
    console.error('Product or email is undefined', { product, email });
    return navigate("/login")
  }

  const { _id, ...rest } = product;

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
    });;
  } catch (error) {
    console.error('Error adding to cart:', error);
    setActionStatus('error');
  }
};

const buyNow =async()=>{

  if (!product || !email) {
    console.error('Product or email is undefined', { product, email });
    return navigate("/login")
  }

  const { _id, ...rest } = product;

  const cartObject = {
    productId: _id,
    email: email,
    quantity: 1,
    ...rest
  };

  try {
    await setCart(cartObject)
    navigate('/cart')
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
    });;
  } catch (error) {
    console.error('Error adding to cart:', error);
    setActionStatus('error');
  }

}




  

  return (
    <div className="mx-5 lg:mx-auto flex flex-col lg:flex-row gap-12 my-5 lg:my-10">
      {/* Image Section */}
      <div className="max-w-[400px] w-full lg:w-1/3">
        {/* Swiper for Main Image */}
        <div className="bg-[#F5F5F5] flex justify-center items-center h-[400px] mx-auto">
          <Swiper
            ref={swiperRef}
            pagination={{ dynamicBullets: true }}
            modules={[Pagination]}
            className="w-full mySwiper h-full"
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <InnerImageZoom src={img} zoomSrc={img} zoomPreload={true} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Thumbnails Section */}
        <div className="flex gap-2 mt-3 justify-center">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index}`}
              className="w-16 h-16 object-cover border border-gray-300 cursor-pointer hover:border-black"
              onClick={() => handleThumbnailClick(index)}
            />
          ))}
        </div>
      </div>

      {/* Product Details Section */}
      <div className="w-full lg:w-2/3 space-y-5">
        <h1 className="text-xl text-primary font-medium">{product?.title}</h1>
        <h1 className="text-3xl font-medium">
          BDT {product?.discountedPrice || product?.price}
          {product?.discountedPrice && (
            <span className="text-[#00000090] line-through ml-4">{product?.price}</span>
          )}
        </h1>

        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 w-full">
  {/* Wishlist Button */}
  <button 
    onClick={addToWishList} 
    className="bg-[#F5F5F5] p-2 px-3 flex items-center justify-center rounded-none border w-full md:w-auto text-black hover:bg-gray-200 transition"
  >
    <p className="px-2">Add to Wishlist</p> 
    <GoHeart className="text-2xl" />
  </button>

  {/* Add to Cart Button */}
  <button 
    onClick={addToCart} 
    className="flex justify-center items-center w-full md:w-auto text-white bg-black py-2 md:py-3 rounded-none btn hover:bg-gray-800 transition"
  >
    Add to Cart
  </button>

  {/* Buy Now Button */}
  <button 
    onClick={buyNow} 
    className="flex justify-center items-center w-full md:w-auto text-white bg-primary py-2 md:py-3 rounded-none btn btn-error hover:bg-red-700 transition"
  >
    Buy Now
  </button>
</div>


        <p dangerouslySetInnerHTML={{ __html: product?.description }}></p>
      </div>
    </div>
  );
};

export default ProductDetail;
