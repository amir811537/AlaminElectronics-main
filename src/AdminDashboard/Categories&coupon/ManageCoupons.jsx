import React from "react";
import { useDeleteCouponsMutation, useGetCouponsQuery, useSetCouponMutation } from "../../redux/api/baseApi";
import { MdDelete } from "react-icons/md";
import { RiDeleteBin3Line } from "react-icons/ri";
import Swal from "sweetalert2";

const ManageCoupons = () => {

	const { data: coupons ,  isLoading} = useGetCouponsQuery()
	const [setCoupons, { data: couponSubmitStatus }] = useSetCouponMutation()
	const [deleteCoupons, { data: couponDeleteStatus }] = useDeleteCouponsMutation()

	console.log(couponSubmitStatus)

	const handleSubmit = (e) => {
		e.preventDefault()
		const couponCode = e.target.couponCode.value
		const discount = e.target.discount.value

		const couponData = { couponCode, discount }
		setCoupons(couponData)
		e.target.reset()
	}

	const handleDelete = (id) => {
		console.log(id)
		Swal.fire({
			title: "Do you want to delete the Coupon?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!"
		}).then((result) => {

			if (result.isConfirmed) {
				deleteCoupons(id)
				Swal.fire({
					title: "Deleted!",
					text: "Your coupon has been deleted.",
					icon: "success"
				});
			}
		});
	}

	 




	return (
		<div className="px-4">
			<div>
				<h1 className="text-xl  font-medium mb-10">Available coupons </h1>

				
				{	
					isLoading ? <div className="space-y-4">
						<div className="grid grid-cols-6">
						<div className="skeleton h-6 w-24 rounded-sm" ></div>
						<div className="skeleton h-6 w-12  rounded-sm" ></div>
						<div className="skeleton h-6 w-6  rounded-sm" ></div>
					</div><div className="grid grid-cols-6">
						<div className="skeleton h-6 w-24 rounded-sm" ></div>
						<div className="skeleton h-6 w-12  rounded-sm" ></div>
						<div className="skeleton h-6 w-6  rounded-sm" ></div>
					</div><div className="grid grid-cols-6">
						<div className="skeleton h-6 w-24 rounded-sm" ></div>
						<div className="skeleton h-6 w-12  rounded-sm" ></div>
						<div className="skeleton h-6 w-6  rounded-sm" ></div>
					</div>
					</div>  : coupons?.length > 0 ? <div><div className="my-5 ">
					<div className="grid grid-cols-5 lg:grid-cols-6 ">
						<h1 className="text-primary col-span-1 lg:col-span-3 font-medium">Coupon </h1>
						<h1 className="font-medium text-primary">Discount</h1>
					</div>
				</div>
					{
						coupons?.map(item => <div key={item?._id} className="my-5 ">
							<div className="grid grid-cols-5 lg:grid-cols-6 ">
								<h1 className="md:col-span-1  col-span-3">{item?.couponCode}</h1>
								<h1 className="md:col-span-1 col-span-1">{item?.discount}%</h1>
								<button  onClick={() => handleDelete(item?._id)} className="text-red-500 text-xl"><RiDeleteBin3Line></RiDeleteBin3Line></button>
							</div>
						</div>)
					}</div> : <div>No coupons available at the moment. Please use the form below to add new coupons.	</div>
				}

				

			</div>
			<div>
				<h1 className="text-xl font-medium mt-16">Create new coupon</h1>

				<form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-5 lg:gap-10 mt-5">
					<input
						type="text"
						placeholder="Coupon Code"
						required
						name="couponCode"
						className=" input focus:border-none focus:outline-none  rounded-sm w-full  bg-[#F5F5F5]"
					/>
					<input
						type="number"
						placeholder="Discount percent"
						required
						min={1}
						max={100}
						name="discount"
						className=" input focus:border-none focus:outline-none  rounded-sm w-full  bg-[#F5F5F5]"
					/>

					<button type="submit" className="btn rounded-sm">Submit</button>
				</form>	
			</div>
		</div>
	);
};

export default ManageCoupons;
