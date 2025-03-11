import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDeleteAllCartProductMutation, useGetCartProductQuery, useGetSingleUserQuery, useSetOrdersMutation, useSetSSLOrdersMutation } from '../../redux/api/baseApi';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const Checkout = () => {

    const { email } = useSelector((state) => state.userSlice)
    const { data: cartData, isLoading: cartDataLoading } = useGetCartProductQuery(email)
    const { data: userData, } = useGetSingleUserQuery(email)
    const [setOrder, { data: orderStatus, isLoading, isSuccess }] = useSetOrdersMutation()
    const [setSSLOrder, { data: sslStatus, isLoading: sslLoading }] = useSetSSLOrdersMutation()
    const { register, handleSubmit, reset } = useForm();
    const [orderButtonText, setOrderButtonText] = useState("Proceed Order")
    const [deleteProducts, { data: deletedStatus }] = useDeleteAllCartProductMutation()
    const { discount, discountedCartTotal } = useSelector((state) => state.CartSlice);
    const [paymentMethod, setPaymentMethod] = useState("COD")


   


    const cartTotal = cartData?.reduce((accumulator, product) => {
        return accumulator + ((product?.discountedPrice || product?.price) * product?.quantity);
    }, 0);

    const navigate = useNavigate()

    // Scroll to top when the component is rendered
 useEffect(() => {
	window.scrollTo(0, 0);
  }, []);
    const onSubmit = async (data) => {
        setOrderButtonText("proceeding...")


        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Proceed Order"
        }).then(async (result) => {
            if (result.isConfirmed) {

                const ordersData = {
                    customerDetail: {
                        email: email,
                        ...data
                    },
                    OrderDetails: cartData,
                    totalPrice: discountedCartTotal || cartTotal,
                    discount: discount,

                    paymentMethod: paymentMethod,
                    date: new Date(),
                    status: "pending"


                }

                if (paymentMethod == "COD") {
                    console.log("payment methiod id cod")

                    const result = await setOrder(ordersData)
                    if (result?.data) {
                        setOrderButtonText("Order proceed")
                        deleteProducts()
                        navigate("/Dashboard/myorders")
                    }
                }

                else {
                    console.log("payment methiod id SSL")
                    const result = await setSSLOrder(ordersData)
                    console.log(result?.data?.url)
                    window.location.replace(result?.data?.url)
                    setOrderButtonText("Proceed Order")


                }

             
            }
        });






        // setOrder(data)



        // console.log(cartData)



    }
    // console.log(userData)

    return (<div className=' px-5 lg:px-0 my-10  mx-auto  '>
        <h1 className='text-2xl font-semibold font-inter  '>Billing Details</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col lg:flex-row justify-between gap-10 lg:gap-24  '>
            <div className='flex-1'>


                <div className='mt-10 font-poppins space-y-6'>
                    <div  >
                        <label htmlFor="first-name " className='text-[#00000090]'>
                            Name<sup className='text-primary'>*</sup>
                        </label>
                        <input  {...register("name",)}
                            type="text"
                            required
                            className=" input mt-2 focus:border-none focus:outline-none  rounded-sm w-full  bg-[#F5F5F5]"
                            defaultValue={userData?.name || ""}
                        />
                    </div>
                    {/* <div  >
                        <label htmlFor="companyName" className='text-[#00000090]'>
                            Company Name  (optional) <sup></sup>
                        </label>
                        <input
                            type="text"
                            {...register("companyName")}
                            className=" input mt-2 focus:border-none focus:outline-none  rounded-sm w-full  bg-[#F5F5F5]"
                        />
                    </div> */}
                    <div  >
                        <label htmlFor="streetAddress" className='text-[#00000090]'>
                            Address<sup className='text-primary'>*</sup>
                        </label>
                        <input  {...register("address")}
                            type="text"
                            required
                            className=" input mt-2 focus:border-none focus:outline-none  rounded-sm w-full  bg-[#F5F5F5]"
                        />
                    </div>
                    <div  >
                        <label htmlFor="apartMentFloor" className='text-[#00000090]'>
                            Apartment, road no, floor no, etc. (optional)<sup></sup>
                        </label>
                        <input
                            type="text"
                            {...register("apartMentFloor")}
                            className=" input mt-2 focus:border-none focus:outline-none  rounded-sm w-full  bg-[#F5F5F5]"

                        />
                    </div>
                    <div  >
                        <label htmlFor="PhoneNumber" className='text-[#00000090]'>
                            Phone Number<sup className='text-primary'>*</sup>
                        </label>
                        <input
                            type="tel"
                            required
                            className=" input mt-2 focus:border-none focus:outline-none  rounded-sm w-full  bg-[#F5F5F5]"
                            {...register("PhoneNumber")}
                        />
                    </div>
                    <div  >
                        <label htmlFor="email" className='text-[#00000090]'>
                            Email Address<sup className='text-primary'>*</sup>
                        </label>
                        <input
                            type="email"
                            defaultValue={email ? email : ""}
                            id='email'
                            disabled
                            className=" input mt-2 focus:border-none focus:outline-none  rounded-sm w-full  bg-[#F5F5F5]"

                        />
                    </div>

                </div>
            </div>
            <div className='flex-1 space-y-5 mt-10'>


                {
                    cartDataLoading ? <div>
                        <div className="skeleton w-full my-8 rounded-md h-9"></div>
                        <div className="skeleton w-full my-8 rounded-md  h-9"></div>
                        <div className="skeleton w-full my-8 rounded-md  h-9"></div>
                    </div> : ""
                }

                {
  cartData?.map(item => (
    <div className='grid grid-cols-2 lg:flex justify-between mb-10 items-center' key={item?.id}>
      <div className='flex gap-2 items-center'>
        <div>
          <img src={item?.imageUrl || item?.imageUrls[0]} className="w-16 p-0" alt="" />
        </div>
        <h1 className="max-w-72 font-semibold col-span-2">
          {item?.title?.split(" ").slice(0, 5).join(" ")}{item?.title?.split(" ").length > 5 ? "..." : ""} 
          x <span className='text-primary'>{item?.quantity}</span>
        </h1>
      </div>

      <h1 className='text-right lg:text-left font-semibold'>
        BDT {(item?.discountedPrice || item?.price) * item?.quantity}
      </h1>
    </div>
  ))
}

                <div className=" space-y-4 pt-10 font-medium ">
                    <div className="flex justify-between border-b-2 pb-4 border-b-black">
                        <span>subtotal:</span>
                        <span>{cartTotal}</span>
                    </div>
                    <div className="flex justify-between border-b-2 pb-4 border-b-black">
                        <span>Shipping: inside dhaka </span>
                        <span>60 taka</span>
                    </div>
                    <div className="flex justify-between border-b-2 pb-4 border-b-black">
                        <span>Discount:</span>
                        <span>{discount}%</span>
                    </div>
                    <div className="flex justify-between ">
                        <span>Total:</span>
                        <span>{discountedCartTotal ? discountedCartTotal : cartTotal}</span>
                    </div>

                    <div className='pt-5'>
                        <div className='flex items-center gap-2 my-4'>
                            <input defaultChecked onChange={() => setPaymentMethod("COD")} type="radio" name="radio-8" className="radio radio-error" /> <span> Cash On Delivery</span>
                        </div>
                        <div className='flex items-center gap-2 my-4'>
                            <input  name='radio-8' type='radio' className='radio radio-error'/>  <span> Online payment (send money only) </span>

                        </div>
                        <div>
                         <p>Bkash : 01795044545</p>
                         <p>Nagod : 01904722779 </p>
                         </div>
                        {/* <div className='flex  items-center gap-2 my-4'>
                            <input  onChange={() => setPaymentMethod("SSL")} type="radio" name="radio-8" className="radio radio-error " /> <span className=''> Pay with SSLCOMMERZ </span>
                        </div> */}

                    </div>
                    <div className="flex items-center">
                        <button id='submitButton' type='submit' className="btn btn-error text-white bg-primary rounded-sm px-8 mt-6">
                            {orderButtonText}
                        </button>
                    </div>{" "}
                </div>
            </div>
        </form>
    </div>);
};

export default Checkout;