import React, { useState } from "react";
import { PiPlusBold } from "react-icons/pi";
import { useGetCategoryListQuery, useSetCategoryListMutation } from "../../redux/api/baseApi";
import { useForm } from "react-hook-form";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "../../../firebase.config";
import Swal from "sweetalert2";

const ManageCategories = () => {
  const { register, handleSubmit, reset } = useForm();
  const { data: categoryItems, isLoading, refetch } = useGetCategoryListQuery(); // Added refetch
  const [setCategory] = useSetCategoryListMutation();
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (file) => {
    if (!file) return null;
    try {
      setUploading(true);
      const storage = getStorage(app);
      const storageRef = ref(storage, `categories/${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(storageRef);
      setUploading(false);
      return downloadUrl;
    } catch (error) {
      console.error("Error uploading the image", error);
      setUploading(false);
      return null;
    }
  };

  const onSubmit = async (data) => {
    const imageUrl = await handleImageUpload(data?.CategoryImage[0]);
    if (imageUrl) {
      await setCategory({ title: data?.CategoryName, imageurl: imageUrl });
      reset();
      document.getElementById("category_modal").checked = false;
      Swal.fire({
        title: "Success!",
        text: "Category added successfully.",
        icon: "success",
      });
      refetch(); // 🔄 Refresh the category list
    }
  };

  if (isLoading) {
    return (
      <div className="px-4">
        <div className="flex flex-wrap justify-center gap-5">
          {[...Array(9)].map((_, index) => (
            <div key={index} className="skeleton w-44 h-44 p-2 rounded-sm"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-4 mb-5">
      <div className="flex flex-wrap gap-5 justify-center">
        {categoryItems?.map((item, index) => (
          <div key={index} className="duration-300 rounded-lg z-50">
            <div className="flex justify-center items-center p-2 border-2 min-w-44 text-center min-h-44 space-y-2">
              <div>
                <div className="flex w-24 mx-auto h-24 mb-4 justify-center items-center">
                  <img src={item?.imageurl} alt={item?.title} />
                </div>
                <h1>{item?.title}</h1>
              </div>
            </div>
          </div>
        ))}

        <label htmlFor="category_modal" className="cursor-pointer">
          <div className="flex justify-center items-center p-2 border-2 min-w-44 text-center min-h-44 space-y-2">
            <div>
              <div className="flex mb-4 justify-center items-center">
                <PiPlusBold className="text-5xl text-primary" />
              </div>
              <h1>New Category</h1>
            </div>
          </div>
        </label>
      </div>

      {/* Modal */}
      <input type="checkbox" id="category_modal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("CategoryName", { required: true })}
              type="text"
              placeholder="Category Name"
              required
              className="input focus:border-none focus:outline-none rounded-sm w-full bg-[#F5F5F5]"
            />
            <input
              {...register("CategoryImage", { required: true })}
              type="file"
              className="file-input my-5 file-input-bordered focus:border-none focus:outline-none w-full"
            />
            <button type="submit" className="btn w-full rounded-sm" disabled={uploading}>
              {uploading ? "Uploading..." : "Add New Category"}
            </button>
          </form>
        </div>
        <label className="modal-backdrop" htmlFor="category_modal">
          Close
        </label>
      </div>
    </div>
  );
};

export default ManageCategories;
