import React from 'react';
import { useParams } from 'react-router-dom';
import { useCompleteOrderStatusMutation, useGetSingleOrdersQuery, } from '../../redux/api/baseApi';
import { FaBangladeshiTakaSign } from 'react-icons/fa6';

const SingleOrder = () => {

    const { id } = useParams()
    console.log("hello world")

    const { data: order, isLoading } = useGetSingleOrdersQuery(id)
    const [completeOrder, { data: status, isLoading: compleatingOrder }] = useCompleteOrderStatusMutation()


    const email = order?.customerDetail?.email
    console.log(email, "em")


    const formatDateString = (dateString) => {
        const date = new Date(dateString);
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-GB', options);
    };
    const formateTimeString = (date) => {
        return new Date(date).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        });
    };



    const handleCompleteOrder = () => {


        const productIDandQuantity = order?.OrderDetails?.map(item => ({
            ProductID: item?.productId,
            quantity: item?.quantity

        }))

        // console.log(productIDs)
        completeOrder({ id, email, productIDandQuantity: productIDandQuantity })


    }
    const elements = Array.from({ length: 3 });



    return (
        <div className='my-5 px-4 flex flex-col lg:flex-row gap-5'>
            <div className='border-r-black flex-1 lg:gitw-3/5 pr-5 lg:border-r-2'>
                <h1 className='text-xl mb-5'>Ordered Products</h1>

                <div className="" >

                    {
                        isLoading ? elements?.map(item =>  <div className='flex mt-2 justify-between items-center'>
                            <div className="flex gap-5 items-center">
                                <div className="skeleton w-10 h-10 "></div>
                                <div className="skeleton w-52 h-8 "></div>
                            </div>
                            <div className="skeleton h-6 w-16"></div>
                        </div> ): ""
                    }

                    {
                        order?.OrderDetails?.map(item => <div className='flex justify-between'>
                            <div className='flex gap-2  items-center' >
                                <img src={item?.imageUrl} className='w-14 h-14' alt="" />
                                <div>
                                    <h1>{item?.title}</h1>
                                    <p className='text-md text-sm text-slate-500'>{item?.category}</p>
                                </div>
                            </div>
                            <h1 className='flex gap-1 items-center'>{item?.price}<FaBangladeshiTakaSign></FaBangladeshiTakaSign></h1>
                        </div>)
                    }

                </div>
            </div>
            <div className='lg:w-2/5'>
                <h1 className='text-xl mb-5'>Order Details </h1>

                <div className='space-y-2'>
                    <h1 className='flex items-center '><span className='font-bold w-[150px]  '>Total Price</span> : {order?.totalPrice} <FaBangladeshiTakaSign></FaBangladeshiTakaSign> </h1>
                    <h1 className='flex '><div className='font-bold w-[150px]  '>Discount       </div>  : {order?.discount || 0} %</h1>
                    <h1 className='flex '><div className='font-bold w-[150px]  '>Pament Method </div> :   {order?.paymentMethod}</h1>
                    <h1 className='flex '><div className='font-bold w-[150px]  '>Ordered Date  </div> : {formatDateString(order?.date)} {formateTimeString(order?.date)} </h1>

                </div>


                <h1 className='text-xl mb-5 mt-12'>Customer Details </h1>

                <div className='space-y-2 mb-5'>
                    <h1 className='flex items-center '><span className='font-bold w-[150px]  '>Name</span> : {order?.customerDetail?.name}  </h1>
                    <h1 className='flex  items-center '><div className='font-bold w-[150px]  '>Email       </div>  : {order?.customerDetail?.email}</h1>
                    <h1 className='flex '><div className='font-bold w-[150px]  '>PhoneNumber  </div> : {order?.customerDetail?.PhoneNumber} </h1>
                    <h1 className='flex '><div className='font-bold w-[150px]  '>Address  </div> : {order?.customerDetail?.address} </h1>
                    <h1 className='flex '><div className='font-bold w-[150px]  '>Company Name </div> :   {order?.customerDetail?.companyName || "N/A"}</h1>
                    <h1 className='flex '><div className='font-bold w-[150px]  '>ApartMent/Floor  </div> : {order?.customerDetail?.apartMentFloor || "N/A"} </h1>



                </div>

                <button disabled={order?.status == "completed"} onClick={handleCompleteOrder} className='btn rounded-sm border-none outline-none  btn-primary bg-primary rounded-md '>{compleatingOrder ? "completing..." : order?.status == "completed" ? "Order Completed" : "complete Order"}</button>

            </div>
        </div>
    );
};

export default SingleOrder;