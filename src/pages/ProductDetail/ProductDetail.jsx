import React, { useEffect,useRef, useState } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from 'swiper/react';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './productdetail.css';

// import required modules
import { Pagination } from 'swiper/modules';




import {
  useGetSingleProductsQuery,
  useSetCartProductMutation,
  useSetWishListProductMutation
} from "../../redux/api/baseApi";
import toast from "react-hot-toast";
import InnerImageZoom from 'react-inner-image-zoom'; // Correct import
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';


const ProductDetail = () => {
  const { id } = useParams();
  const { data: product, isLoading: productLoading } = useGetSingleProductsQuery(id);
  // console.log("=============>",product)
  const { email } = useSelector((state) => state.userSlice);
  const [wishListStatus, setWishListStatus] = useState(null); // State to hold wish list status
  const [setWishListProduct, { data: wishListData, error, isLoading }] = useSetWishListProductMutation();
  const [setCart, { data: cartData, error: cartError }] = useSetCartProductMutation()
  const [actionStatus, setActionStatus] = useState(null); // null for no action, 'success', 'error'
  const navigate = useNavigate()

 // Scroll to top when the component is rendered
 useEffect(() => {
  window.scrollTo(0, 0);
}, []);
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
  useEffect(() => {
    if (actionStatus === 'success') {
      console.log('Product added to wishlist successfully!');
    } else if (actionStatus === 'error') {
      console.log('Error: Failed to add product to wishlist');
    }
  }, [actionStatus]);

// Function to get all images (from either `imageUrl` or `imageUrls`)
const getImages = () => {
  if (product?.imageUrls && Array.isArray(product.imageUrls)) {
    return product.imageUrls; // Use array of images
  } else if (product?.imageUrl) {
    return [product.imageUrl]; // Wrap single image in an array
  } else {
    return [];
  }
};
const images = getImages();

  

  if (productLoading) return <div className="mx-5 lg:mx-28 flex flex-col lg:flex-row gap-12 my-5 lg:my-10">

    <div className="skeleton h-[350px] lg:h-[500px] w-full lg:w-[500px] rounded-none" ></div>
    <div>
      <div className="skeleton h-7 w-80 rounded-sm"></div>
      <div className="skeleton  mt-4 lg:mt-10 h-6 w-24 rounded-md"></div>
      <div className="skeleton  mt-10 h-10 w-40 rounded-md"></div>
      <div className="skeleton  mt-10 h-6 w-50 rounded-md"></div>
      <div className="skeleton  mt-4 h-6 w-40 rounded-md"></div>
      <div className="skeleton  mt-4 h-6 w-48 rounded-md"></div>
      <div className="skeleton  mt-4 h-6 w-50 rounded-md"></div>
      <div className="skeleton  mt-4 h-6 w-44 rounded-md"></div>
    </div>
  </div>

  return (
    <div className="mx-5 lg:mx-auto flex flex-col lg:flex-row gap-12 my-5 lg:my-10">
    <div className="max-w-[400px] w-full lg:w-1/3 bg-[#F5F5F5] flex justify-center items-center h-[400px] mx-auto">
        {images.length > 1 ? (
          <Swiper
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Pagination]}
         
            className="w-full mySwiper h-full"
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <InnerImageZoom
                  src={img}
                  zoomSrc={img}
                  zoomPreload={true}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <InnerImageZoom
            src={images[0] || ""}
            zoomSrc={images[0] || ""}
            zoomPreload={true}
          />
        )}
      </div>
  
    {/* Product details section */}
    <div className="w-full lg:w-2/3 space-y-5">
      <h1 className="text-xl text-primary font-medium">{product?.title}</h1>
      <div className="flex gap-4 items-center mt-4">
        <span className="text-green-400 pl-2 border-l-2">In stock</span>
      </div>
      <h1 className="text-3xl font-medium">
        BDT {product?.discountedPrice ? product?.discountedPrice : product?.price}
        <span className={`${product?.discountedPrice ? "" : "hidden"} text-[#00000090] line-through ml-4`}>{product?.price}</span>
      </h1>
  
      <div className="flex gap-4">
          <button onClick={addToWishList} className="bg-[#F5F5F5] p-2 px-3 flex items-center b text-black rounded-none">
            {
              wishListStatus?.wishListed === 'success' ? <GoHeartFill className=" text-2xl" /> : <GoHeart className=" text-2xl" />
            }
          </button>

          <div>
            <button onClick={addToCart} className="flex hover:text-black rounded-none w-full text-white bg-black btn">
              <h1>Add to Cart</h1>
            </button>
          </div>

          <div>
            <button onClick={buyNow} className="btn btn-error bg-primary rounded-none w-full text-white btn">
              <h1>Buy Now</h1>
            </button>
          </div>
        </div>
  
      <p className="inline-block" dangerouslySetInnerHTML={{ __html: product?.description }}></p>
    </div>
  </div>
  
  );
};

export default ProductDetail;
