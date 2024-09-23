import React from "react";
import { TiDelete } from "react-icons/ti";
import { useSelector } from "react-redux";
import { useGetOrdersQuery, useUpdateOrderStatusMutation } from "../../../redux/api/baseApi";
import image from "../../../assets/Others/no-orders.svg"
import { Link } from "react-router-dom";
import warningImage from "../../../assets/Others/Error_Warning.svg"


const MyOrder = () => {

	const { email } = useSelector((state) => state.userSlice)
	const { data: orders, isLoading ,error , isError} = useGetOrdersQuery(email)
	const [updateOrder, { data: updateStatus }] = useUpdateOrderStatusMutation()

	const formatDateString = (dateString) => {
		const date = new Date(dateString);
		const options = { day: '2-digit', month: 'short', year: 'numeric' };
		return date.toLocaleDateString('en-GB', options);
	};

	const handleCancelOrder = (id) => {

		updateOrder({ id, status: "cancelled" })
	}




	if(isError) {
		return <div className="w-full h-[500px] flex-col gap-2 flex justify-center items-center">
			<img src={warningImage} className="w-28 h-28" alt="" srcset="" />
			<h1>{error?.data?.message}</h1>
			<p>Please try to logOUt and reLogin</p>
		</div>
	} 


	return (
		<div className=" mt-5 lg:mt-10">
			

			{
				isLoading ? <div className="mb-16 border-2">
					<div className="border-b-2">
					<div className="flex gap-0 p-5 lg:p-10  items-center justify-between">
						<div>
							<div className="skeleton w-40 lg:w-80 h-7 rounded-md"></div>
							<div className="skeleton w-28 lg:w-52 mt-2 h-7 rounded-md"></div>
						</div>
						<div>
							<div className="skeleton w-16 lg:w-32 h-7 rounded-md"></div>
							<div className="skeleton w-14 lg:w-28  h-7 mt-2"></div>

						</div>
					</div>
					</div>
					<div className="p-10 pt-0">
						<div className="grid   gap-5 lg:gap-10 items-center grid-cols-8  font-medium mt-8 lg:mt-16">
							<div className="flex  items-center  col-span-5 lg:col-span-4 gap-2">

								<div className='skeleton h-10 w-1/4 lg:w-10'>

								</div>

								<h1 className="skeleton w-3/4 h-7 lg:max-w-72 text-sm col-span-2">
									{" "}

								</h1>
							</div>
							<div className="skeleton h-7 w-10 col-span-2 lg:col-span-3"></div>

							<div className="skeleton h-7 col-span-1"></div>
						</div>
						<div className="grid mt-10  gap-5 lg:gap-10 items-center grid-cols-8  font-medium ">
							<div className="flex  items-center  col-span-5 lg:col-span-4 gap-2">

								<div className='skeleton h-10 w-1/4 lg:w-10'>

								</div>

								<h1 className="skeleton w-3/4 h-7 lg:max-w-72 text-sm col-span-2">
									{" "}

								</h1>
							</div>
							<div className="skeleton h-7 w-10 col-span-2 lg:col-span-3"></div>

							<div className="skeleton h-7 col-span-1"></div>
						</div>
					</div>
					<div className="skeleton h-10 w-full rounded-none"></div>
				</div> : ""
			}

			{
				orders?.length == 0 ? <div>
					<div class="flex justify-center gap-2 h-[500px] items-center flex-col text-center">
						<img src={image} className="w-20 h-20" alt="" />

						<h2 className=" text-3xl">No Orders Yet</h2>
						<p>It looks like you haven't placed any orders yet.</p>
						<Link to="/allproduct" className="btn btn-primary bg-primary rounded-sm border-none mt-4">Start Shopping</Link>
					</div>
				</div> : orders?.map(item => <div className="mb-16 border-2  ">
					<div className="border-b-2 ">
						<div className="flex gap-0 p-5 lg:p-10  items-center justify-between">
							<div className="">
								<h1>

									Order ID :{" "}
									<span className="text-primary text-sm">
										{item?.TransID  || item?._id}
									</span>
								</h1>
								<p> Placed on {formatDateString(item?.date)}</p>
							</div>
							<div className="">
								<h1> Total : {item?.totalPrice}</h1>{" "}
								<p className="bg-base-200 p-1 text-center mt-1 rounded-full">{item?.status}</p>
							</div>
						</div>

					</div>

					<div className="p-10 pt-0">
						{
							item?.OrderDetails.map(OrderedItem => <div className="grid gap-5 lg:gap-10 items-center grid-cols-8  font-medium mt-8 lg:mt-16">
								<div className="flex  items-center  col-span-5 lg:col-span-4 gap-2">

									<div className='w-1/4 lg:w-10'>
										<img src={OrderedItem?.imageUrl} className="min-w-full   p-0" alt="" />
									</div>

									<h1 className="w-3/4 lg:max-w-72 text-sm col-span-2">
										{" "}
										{OrderedItem?.title}
									</h1>
								</div>
								<h1 className="col-span-1 lg:col-span-3">x {OrderedItem?.quantity}</h1>

								<h1 className="col-span-1">{item?.discountedPrice || OrderedItem?.price * OrderedItem?.quantity}</h1>
							</div>)
						}
					</div>
					<button onClick={() => handleCancelOrder(item?._id)} className="btn w-full rounded-sm">	cancel Order</button>

				</div>)
			}




		</div>
	);
};

export default MyOrder;
