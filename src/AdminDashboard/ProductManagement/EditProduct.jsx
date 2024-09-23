import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import imageUpload from "../../assets/Others/image-removebg-preview (14).svg";
import { categoryItems } from "../../../public/categoryObject";
import {
	useGetSingleProductsQuery,
	useSetProductsMutation,
	useUpdateSingleProductMutation,
} from "../../redux/api/baseApi";
import { useParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import RichTextEditor from "../../Components/RichTextEditor";
import { data } from "autoprefixer";

const EditProduct = () => {
	const { id } = useParams();

	const { register, handleSubmit, reset } = useForm();
	const { data: product, isLoading } = useGetSingleProductsQuery(id);
	const [updateProduct, { isSuccess, data: updateStatus }] = useUpdateSingleProductMutation();


	const imageBBApiKey = "c696443c798ad9c58798852ae8d4166a";
	const imageBBUrl = `https://api.imgbb.com/1/upload?key=${imageBBApiKey}`;


	const [imageUrl, setImageUrl] = useState('');
	const [uploading, setUploading] = useState(false);
	const [updateText, setUpdateText] = useState("Update product");
	const [description, setDescription] = useState('');
	const [selectedCategory , setSelectedCategory] = useState('')


	useEffect(() => {
		if (product) {
			setDescription(product.description);
			setImageUrl(product.imageUrl);
			setSelectedCategory(product?.category)
		}
	}, [product]);

	
	useEffect(() => {
	    if (isSuccess) {
	      setUpdateText("Product Updateed");

	    }
	  }, [isSuccess])


	const handleCategoryChange = (event) => {
		setSelectedCategory(event.target.value);
	  };


	const onSubmit = (data) => {
		setUpdateText("Updating Product...");
		console.log(selectedCategory)
		console.log("the data of onsubmi form is ", { imageUrl, description, ...data });
		updateProduct({
			id,
			data: {
				imageUrl: imageUrl || product.imageUrl,
				...data,
				description,
				category : selectedCategory


			},
		});
	};

	

	const handleImageUpload = async (event) => {
		setUploading(true);
		const file = event.target.files[0];

		if (file) {
			const formData = new FormData();
			formData.append("image", file);

			try {
				const res = await axios.post(imageBBUrl, formData, {
					headers: {
						"content-type": "multipart/form-data",
					},
				});

				const imageUrl = res?.data.data.image.url;
				setImageUrl("");
				await checkImageAvailability(imageUrl);
				setImageUrl(imageUrl);
			} catch (err) {
				console.error("Error uploading image", err);
			} finally {
				setUploading(false);
			}
		}
	};

	const checkImageAvailability = (url, retries = 5, delay = 1000) => {
		return new Promise((resolve, reject) => {
			let attempts = 0;

			const tryLoadImage = () => {
				const img = new Image();
				img.onload = () => resolve(true);
				img.onerror = () => {
					if (attempts < retries) {
						attempts++;
						setTimeout(tryLoadImage, delay);
					} else {
						reject(new Error("Image not found"));
					}
				};
				img.src = url;
			};

			tryLoadImage();
		});
	}



	return (
		<div className="mb-5 lg:my-10 px-4">


			<h1 className="border-l-[16px] border-l-primary pl-5 text-xl font-medium">
				Update Product
			</h1>
			<Toaster />

			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="lg:flex gap-5 ">
					<div className="mt-8 flex-1 ">
						<input
							type="text"
							placeholder="Product Title"
							defaultValue={product?.title}
							required
							{...register("title", { required: true })}
							className="input focus:border-none focus:outline-none rounded-sm w-full mb-8 bg-[#F5F5F5]"
						/>

						<RichTextEditor value={description} onChange={setDescription} />

						<input
							type="text"
							placeholder=" $ Price "
							defaultValue={product?.price}
							required
							{...register("price", { required: true })}
							className="input mt-28 lg:mt-20 focus:border-none focus:outline-none rounded-sm w-full bg-[#F5F5F5]"
						/>
					</div>
					<div className="mt-8">
						<div>
							<input
								type="file"
								id="file-upload"
								className="hidden input-file"
								onChange={handleImageUpload}
							/>

							<div className="lg:w-[250px] flex  justify-center items-center w-full h-full lg:h-[250px] bg-base-200">
								<img
									src={imageUrl || imageUpload}
									alt=""
									className="w-full "
								/>
							</div>

							<label
								htmlFor="file-upload"
								className="btn w-full lg:w-[250px] mt-6 btn-error bg-primary text-white rounded-sm"
							>
								{uploading ? (
									<div className="flex gap-2 justify-center items-center">
										<span className="loading loading-spinner loading-sm"></span>
										<span>Uploading ...</span>
									</div>
								) : (
									"Upload Image"
								)}
							</label>
						</div>
						<select
							
							onChange={handleCategoryChange}

							defaultChecked={product?.category}
							className="select block rounded-sm focus:border-none focus:outline-none  mt-10 select-bordered w-full lg:w-[250px]"
						>	
							<option disabled>Category</option>
							px
							{categoryItems?.map((item, inx) => (
								<option
									selected={
										item?.title == product?.category
											? "true"
											: "false"
									}
									key={inx}
								>
									{" "}
									{item?.title}
								</option>
							))}
						</select>
					</div>
				</div>

				<button
					type="submit"
					className="w-full btn mt-6 btn-error bg-primary text-white rounded-sm"
				>
					{updateText}
				</button>
			</form>
		</div>
	);
};

export default EditProduct;
