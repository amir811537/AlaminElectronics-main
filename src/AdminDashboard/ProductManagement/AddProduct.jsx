import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import imageUpload from "../../assets/Others/image-removebg-preview (14).svg";
import { categoryItems } from "../../../public/categoryObject";
import { useSetProductsMutation } from "../../redux/api/baseApi";
import toast, { Toaster } from 'react-hot-toast';
import RichTextEditor from "../../Components/RichTextEditor";
import auth, { app } from "../../../firebase.config";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const AddProduct = () => {
  const { register, handleSubmit, reset } = useForm();
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [buttonText, setButtonText] = useState("Add product");

  const [setProduct, { data, isSuccess }] = useSetProductsMutation();
  const [description, setDescription] = useState('');

  console.log(description);
  useEffect(() => {
    if (isSuccess) {

      toast.success('New Product Added', {
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
      setButtonText("Product Added");
      reset()
      setDescription("")
      setImageUrl("")
    }
  }, [isSuccess])

  const onSubmit = (data) => {
    setButtonText("Adding Product...");

    
    // console.log({ imageUrl, ...data });
    setProduct({ imageUrl, description, ...data });

  };



  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
  
    if (image) {
      try {
        setUploading(true); // Start uploading
        const storage = getStorage(app); // Initialize storage
        const storageRef = ref(storage, `images/${image.name}`); // Create reference to the file
  
        // Upload the image
        await uploadBytes(storageRef, image);
  
        // Get the download URL
        const downloadUrl = await getDownloadURL(storageRef);
        console.log("Image URL:", downloadUrl);
  
        // Set the URL in state
        setImageUrl(downloadUrl);
  
        setUploading(false); // End uploading state
  
      } catch (error) {
        console.error("Error uploading the image", error);
        setUploading(false); // Ensure we stop the loading state
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
  };
  

  return (
    <div className="px-4">
      <h1 className="border-l-[16px] border-l-primary pl-5 text-xl font-medium">
        Add Product
      </h1>
      <Toaster />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="md:flex gap-5 ">
          <div className="mt-8  flex-1 ">
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
            <div>
              <input
                type="file"
                id="file-upload"
                className="hidden input-file"
                onChange={handleImageUpload}
              />

              <div className="md:w-[250px] flex  justify-center items-center w-full h-full md:h-[250px] bg-base-200">
                <img
                  src={imageUrl || imageUpload}
                  alt=""
                  className="w-full "
                />
              </div>

              <label
                htmlFor="file-upload"
                className="btn w-full md:w-[250px] mt-6 btn-error bg-primary text-white rounded-sm"
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
        >
          {buttonText}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
