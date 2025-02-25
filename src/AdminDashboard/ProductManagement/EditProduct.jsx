import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import imageUpload from "../../assets/Others/image-removebg-preview (14).svg";
import { categoryItems } from "../../../public/categoryObject";
import {
  useGetSingleProductsQuery,
  useUpdateSingleProductMutation,
} from "../../redux/api/baseApi";
import { useParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import RichTextEditor from "../../Components/RichTextEditor";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "../../../firebase.config";

const EditProduct = () => {
  const { id } = useParams();
  const { register, handleSubmit, reset } = useForm();
  const { data: product, isLoading } = useGetSingleProductsQuery(id);
  const [updateProduct, { isSuccess }] = useUpdateSingleProductMutation();

  const [imageUrls, setImageUrls] = useState(["", "", ""]);
  const [uploading, setUploading] = useState(false);
  const [updateText, setUpdateText] = useState("Update Product");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    if (product) {
      setDescription(product.description);
      setImageUrls(product.imageUrls || ["", "", ""]);
      setSelectedCategory(product.category || "");
    }
  }, [product]);

  useEffect(() => {
    if (isSuccess) {
      setUpdateText("Product Updated");
    }
  }, [isSuccess]);

  const handleImageUpload = async (e, index) => {
    const image = e.target.files[0];
    if (image) {
      try {
        setUploading(true);
        const storage = getStorage(app);
        const storageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(storageRef, image);
        const downloadUrl = await getDownloadURL(storageRef);

        const updatedUrls = [...imageUrls];
        updatedUrls[index] = downloadUrl; // Update the specific image slot
        setImageUrls(updatedUrls);
      } catch (error) {
        console.error("Error uploading the image", error);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const onSubmit = (data) => {
    setUpdateText("Updating Product...");
    updateProduct({
      id,
      data: {
        imageUrls,
        description,
        ...data,
        category: selectedCategory,
      },
    });
  };

  return (
    <div className="mb-5 lg:my-10 px-4">
      <h1 className="border-l-[16px] border-l-primary pl-5 text-xl font-medium">
        Update Product
      </h1>
      <Toaster />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="lg:flex gap-5">
          <div className="mt-8 flex-1">
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
            {[0, 1, 2].map((index) => (
              <div key={index} className="mb-6">
                <input
                  type="file"
                  id={`file-upload-${index}`}
                  className="hidden"
                  onChange={(e) => handleImageUpload(e, index)}
                />
                <div
                  onClick={() => document.getElementById(`file-upload-${index}`).click()}
                  className="cursor-pointer md:w-[150px] flex justify-center items-center w-full h-full md:h-[150px] bg-base-200"
                >
                  <img
                    src={imageUrls[index] || imageUpload}
                    alt={`Image ${index + 1}`}
                    className="w-full"
                  />
                </div>
                <p className="text-start">Image {index + 1}</p>
              </div>
            ))}

            <select
              required
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="select block rounded-sm focus:border-none focus:outline-none mt-10 select-bordered w-full lg:w-[250px]"
            >
              <option disabled value="">
                Category
              </option>
              {categoryItems?.map((item, inx) => (
                <option key={inx} value={item.title}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full btn mt-6 btn-error bg-primary text-white rounded-sm"
          disabled={uploading}
        >
          {uploading ? "Uploading Images..." : updateText}
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
