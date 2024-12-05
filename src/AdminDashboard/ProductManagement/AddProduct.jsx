import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import imageUpload from "../../assets/Others/image-removebg-preview (14).svg";
import { categoryItems } from "../../../public/categoryObject";
import { useSetProductsMutation } from "../../redux/api/baseApi";
import toast, { Toaster } from "react-hot-toast";
import RichTextEditor from "../../Components/RichTextEditor";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "../../../firebase.config";

const AddProduct = () => {
  const { register, handleSubmit, reset } = useForm();
  const [imageUrls, setImageUrls] = useState(["", "", ""]); // Array to store image URLs
  const [uploading, setUploading] = useState(false);
  const [buttonText, setButtonText] = useState("Add product");
  const [description, setDescription] = useState("");

  const [setProduct, { isSuccess }] = useSetProductsMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("New Product Added", {
        style: { padding: "16px", color: "#ffffff", background: "#DB4444" },
        iconTheme: { primary: "#ffffff", secondary: "#DB4444" },
      });
      setButtonText("Product Added");
      reset();
      setDescription("");
      setImageUrls(["", "", ""]);
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

        setUploading(false);
      } catch (error) {
        console.error("Error uploading the image", error);
        setUploading(false);
      }
    }
  };

  const onSubmit = (data) => {
    setButtonText("Adding Product...");
    setProduct({ imageUrls, description, ...data });
  };

  return (
    <div className="px-4">
      <h1 className="border-l-[16px] border-l-primary pl-5 text-xl font-medium">
        Add Product
      </h1>
      <Toaster />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="md:flex gap-5 ">
          <div className="mt-8 flex-1">
            <input
              type="text"
              placeholder="Product Title"
              required
              {...register("title", { required: true })}
              className="input focus:border-none focus:outline-none rounded-sm w-full mb-8 bg-[#F5F5F5]"
            />
            <RichTextEditor value={description} onChange={setDescription} />
            <input
              type="text"
              placeholder=" $ Price "
              required
              {...register("price", { required: true })}
              className="input mt-28 md:mt-20 focus:border-none focus:outline-none rounded-sm w-full bg-[#F5F5F5]"
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
                <p className="text-center">Image {index + 1}</p>
              </div>
            ))}

            <select
              required
              {...register("category", { required: true })}
              className="select block rounded-sm focus:border-none focus:outline-none mt-10 select-bordered w-full md:w-[250px]"
            >
              <option disabled selected>
                Category
              </option>
              {categoryItems?.map((item, inx) => (
                <option key={inx}>{item?.title}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full btn mt-6 btn-error bg-primary text-white rounded-sm"
          disabled={uploading}
        >
          {uploading ? "Uploading Images..." : buttonText}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
