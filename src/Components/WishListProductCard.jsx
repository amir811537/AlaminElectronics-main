import React from "react";
import { IoCartOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDeleteWishlistProductMutation } from "../redux/api/baseApi";
import Swal from "sweetalert2";

const WishListProductCard = ({ item }) => {

	const [deleteItem, { data, error }] = useDeleteWishlistProductMutation()
	console.log(error, data);


	const handleDelete = (id) => {

		console.log(id)
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!"
		}).then((result) => {
			deleteItem(id)


			if (result.isConfirmed) {
				Swal.fire({
					title: "Deleted!",
					text: "Your file has been deleted.",
					icon: "success"
				});
			}
		});
	}

	return (
		<div className="max-w-[280px]  overflow-hidden">
			<div className="rounded-md bg-[#F5F5F5]  relative ">
				<div className="p-6 h-[250px] flex items-center">
					<img src={item?.imageUrl} className="mx-auto " alt="" />
				</div>
				<button className="flex rounded-b-md rounded-none w-full text-white  bg-black hover:text-black btn ">
					<IoCartOutline className="text-xl mr-2" />
					<h1>Add to Cart </h1>
				</button>
				<button onClick={() => handleDelete(item?._id)} className="bg-white p-2 top-3 right-3 rounded-full absolute">
					<RiDeleteBin6Line />

				</button>
			</div>

			<h1 className="mb-2 lg:mb-auto my-4 text-sm lg:min-h-12 font-medium">{item?.title}</h1>
			<h1 className="lg:text-xl   font-medium text-primary ">
				BDT {item?.discountedPrice ? item?.discountedPrice : item?.price} <span >{item?.discountedPrice ? <span className=" text-[#00000090] line-through	">{item?.price}</span> : <span className="text-black font-base font-normal text-base">({item?.sellCount || 0} sold)</span>}</span>
			</h1>		</div>
	);
};

export default WishListProductCard;