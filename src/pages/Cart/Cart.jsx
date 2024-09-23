import React, { useEffect, useState } from "react";
import { useDeleteAllCartProductMutation, useGetCartProductQuery, useSetSingleCouponMutation, useUpdateCartMutation } from "../../redux/api/baseApi";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import image from "../../assets/Others/cart.svg"
import { Form, Link } from "react-router-dom";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import {  setCartTotal , setDiscount, setDiscountedCartTotal } from "../../redux/features/Cart/CartSlice";
import warningImage from "../../assets/Others/Error_Warning.svg"

const Cart = () => {

	const { email } = useSelector((state) => state.userSlice)

	const { data: cartData, isLoading, error ,isError} = useGetCartProductQuery(email)
	const [deleteProducts, { data: deletedStatus }] = useDeleteAllCartProductMutation()
	const [checkCoupon ,{data: couponData}] = useSetSingleCouponMutation()
	
	let cartTotal = cartData?.reduce((accumulator, product) => {
		return accumulator + ((product?.discountedPrice || product?.price) * product?.quantity);
	}, 0);
	const [newCartTotal , setNewCartTotal] = useState(cartTotal)
	const dispatch = useDispatch()


	

	const discountedCartTotal = 0


	console.log(cartData)
	console.log(couponData)

	


	const handleDeleteAllCartProduct = () => {

		Swal.fire({
			title: "Remove This Product from cart?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, remove it!"
		}).then((result) => {



			if (result.isConfirmed) {
				deleteProducts()
				Swal.fire({
					title: "Removed!",
					text: "This product has been removed.",
					icon: "success"
				});
			}
		});

	}


	useEffect(() =>{
		dispatch(
			setCartTotal({
				cartTotal : cartTotal || 0,

			})
		);

	}, [cartTotal])


	useEffect(() => {
		if (couponData) {
		  if (couponData.success) {
			const discountedTotal = cartTotal - (cartTotal * (couponData?.discount / 100));
			setNewCartTotal(discountedTotal)
			dispatch(
				setDiscount({
					discount: couponData?.discount
				})
			)
			dispatch(
				setDiscountedCartTotal({
					discountedCartTotal: discountedTotal ||  0
				})
			)
			console.log("Discounted Cart Total:", discountedTotal);
			toast.success(`Coupon applied! You saved ${couponData.discount}%`, {
			  style: {
				padding: '16px',
				color: '#ffffff',
				background: '#28a745',
			  },
			  iconTheme: {
				primary: '#ffffff',
				secondary: '#28a745',
			  },
			});
		  } else {
			toast.error(couponData.message || 'Invalid coupon code', {
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
		  }
		}
	  }, [couponData, cartTotal]);
	  


	const handleSubmitCoupon = async (e) => {
		e.preventDefault()
		const coupon = e.target.coupon.value
		await checkCoupon({coupon})

		console.log(couponData, "success")
		if(couponData?.success){
			console.log(couponData, "failed")
		}

		console.log(coupon)
		
	}

	if(isError) {
		return <div className="w-full h-[500px] flex-col gap-2 flex justify-center items-center">
			<img src={warningImage} className="w-28 h-28" alt="" srcset="" />
			<h1>{error?.data?.message}</h1>
			<p>Please try to logOUt and reLogin</p>
		</div>
	} 

	return (
		<div className=" px-5 lg:px-0  mx-auto">
			<div className="w-full overflow-x-auto">

				
				{
					cartData?.length < 1 ? <div className="w-2/3 flex items-center flex-col my-20 mx-auto text-center">
						<img src={image} className="w-32" alt="" srcset="" />

						<h1 className="text-xl font-semibold mb-2 font-inter">
							Your Cart is Empty

						</h1>

					</div> : <div className="px-5 min-w-[600px]  lg:px-16">
						<div className="grid  grid-cols-9 mb-8 mt-16 font-medium my-16">
							<h1 className="col-span-2">Product</h1>
							<h1 className="col-span-2">Title</h1>
							<h1 className="col-span-2">Price</h1>
							<h1 className="col-span-2">Quantity</h1>
							<h1 className="col-span-1 ">Subtotal</h1>
						</div>



						<div className="" >

							{
								cartData?.map(item => <CartItem item={item} ></CartItem>)
							}

						</div>



					</div>
				}


{
					isLoading ? <div>
						<div className="grid  grid-cols-9 mb-8 mt-16 px-5 min-w-[600px]  lg:px-16 justify-between items-center ">

							<div className="col-span-1 skeleton w-10 h-10 rounded-md"></div>
							<div className="col-span-3 skeleton w-56 h-7 rounded-md"></div>
							<div className="col-span-2 skeleton w-20 h-7 rounded-md"></div>
							<div className="col-span-2 skeleton w-16 h-12 rounded-md "></div>
							<div className="col-span-1 skeleton w-20 h-7 rounded-md"></div>
						</div><div className="grid grid-cols-9 mb-8 mt-16 px-5 min-w-[600px]  lg:px-16 justify-between items-center ">

							<div className="col-span-1 skeleton w-10 h-10 rounded-md"></div>
							<div className="col-span-3 skeleton w-56 h-7 rounded-md"></div>
							<div className="col-span-2 skeleton w-20 h-7 rounded-md"></div>
							<div className="col-span-2 skeleton w-16 h-12 rounded-md "></div>
							<div className="col-span-1 skeleton w-20 h-7 rounded-md"></div>
						</div><div className="grid grid-cols-9 mb-8 mt-16 px-5 min-w-[600px]  lg:px-16 justify-between items-center ">

							<div className="col-span-1 skeleton w-10 h-10 rounded-md"></div>
							<div className="col-span-3 skeleton w-56 h-7 rounded-md"></div>
							<div className="col-span-2 skeleton w-20 h-7 rounded-md"></div>
							<div className="col-span-2 skeleton w-16 h-12 rounded-md "></div>
							<div className="col-span-1 skeleton w-20 h-7 rounded-md"></div>
						</div>
					</div> : ""
				}
			</div>

			<div className="flex justify-between mt-8 ">
				<Link to="/allProduct" className="btn btn-outline rounded-none ">
					Return To Shop{" "}
				</Link>
				<button onClick={handleDeleteAllCartProduct} disabled={cartData?.length < 1} className="btn btn-outline rounded-none ">
					Remove all product
				</button>
			</div>

			<div className="    mt-20 ">
				<form onSubmit={handleSubmitCoupon} className="flex gap-4 ">
					<input
						type="text"
						placeholder="Coupon code "
						className="input w-full lg:w-auto  border-black  rounded-sm  input-bordered "
						name="coupon"
					/>
					<button type="submit" className="btn btn-error bg-primary text-white rounded-sm ">
						Apply coupon
					</button>
				</form>

				<div className="flex justify-end mt-10 lg:-mt-10">
					<div className=" p-8 space-y-4 border-2 border-black w-full lg:w-1/3">
						<h1 className="text-xl font-medium mb-8 ">cart total</h1>
						<div className="flex justify-between border-b-2 pb-4 border-b-black">
							<span>subtotal:</span>
							<span>{cartTotal}</span>
						</div>
						<div className="flex justify-between border-b-2 pb-4 border-b-black">
							<span>Shipping:</span>
							<span>Free</span>
						</div>
						<div className="flex border-b-2  pb-4 border-b-black	justify-between ">
							<span>Discount:</span>
							<span>{couponData?.discount || 0}%</span>
						</div>
						<div className="flex  justify-between ">
							<span>Total:</span>
							<span>{newCartTotal || cartTotal}</span>
						</div>
						<div className="flex justify-center items-center">
							<Link to="/checkout"  className="btn btn-error text-white bg-primary rounded-sm px-8 mt-8">
								Proceed to checkout{" "}
							</Link>
						</div>{" "}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cart;




// const handleUpdateCart = (e, data) => {

	// 	// console.log(data)
	// 	const { quantity, ...rest } = 

	// 	const obj = {
	// 		quantity: e.target.value,
	// 		...rest

	// 	}

	// 	console.log(obj)
	// 	// setUpdateText("Updating Product...");
	// 	// console.log({ imageUrl, ...data });
	// 	// updateProduct({
	// 	// 	id,
	// 	// 	data: {
	// 	// 		imageUrl : imageUrl || product.imageUrl,
	// 	// 		...data,
	// 	// 	},
	// 	// });
	// };