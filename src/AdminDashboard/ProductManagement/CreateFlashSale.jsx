import React, { useState, useEffect } from 'react';
import { useGetProductsQuery, useSetFlashSaleMutation } from '../../redux/api/baseApi';

const CreateFlashSale = () => {
    //   const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [errorText, setErrorText] = useState('');
    const [buttonText, setButtonText] = useState('Create Flash Sale');

    const { data: products, isLoading } = useGetProductsQuery()
    const [setFlashSale, { data: status }] = useSetFlashSaleMutation()

    console.log(status)


    const handleProductSelection = (productId) => {
        setSelectedProducts((prevSelected) =>
            prevSelected.includes(productId)
                ? prevSelected.filter((id) => id !== productId)
                : [...prevSelected, productId]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setButtonText("creating Flash Sale...")

        const products = selectedProducts
        const startTime = e.target.startTime.value
        const endTime = e.target.endTime.value
        const discount = e.target.discount.value

        if (products?.length == 0) {
            return setErrorText("No product has been chosen . please select products to create flashSale")
        }
        setErrorText("")

        const object = {
            products, startTime, endTime, discount
        }

        console.log(object)
        await setFlashSale(object)
        setButtonText("Flash Sale Created ")
        e.target.reset()
    };

    console.log(selectedProducts)

    return (
        <div className="mx-auto px-4">
            <h1 className="text-2xl font-bold mb-4">Create Flash Sale</h1>
            <form className='' onSubmit={handleSubmit}>
                <div className='flex flex-col-reverse lg:flex-row justify-center gap-10   '>
                    <div className='flex-1 space-y-6'>
                        <label htmlFor='startTime' className="block mt-4">
                            <span className="text-gray-700">Start Time</span>
                            <input
                                type="datetime-local"
                                className="block w-full mt-2 p-2 border border-gray-300 rounded-md"
                                name='startTime'
                                required

                            />
                        </label>
                        <label className="block mt-4">
                            <span className="text-gray-700">End Time</span>
                            <input
                                type="datetime-local"
                                className="block w-full mt-2 p-2 border border-gray-300 rounded-md"
                                name='endTime'
                                required
                            />

                        </label>
                        <label className="block mt-4">
                            <span className="text-gray-700">Discount</span>
                            <input
                                type="number" min="01" max="100"
                                className="block w-full mt-2 p-2 border border-gray-300 rounded-md"
                                placeholder='%'
                                name='discount' required />
                        </label>
                        <button type="submit" className="btn w-full  btn-primary bg-primary my-4 rounded-sm border-none">
                            {buttonText}
                        </button>
                    </div>
                    <div className="mt-4 flex-1 ">
                        <h2 className="text-normal  mb-2">Select Products</h2>
                        <div className="max-h-80 overflow-y-auto border border-gray-300 p-2 rounded-md">

                            {
                                isLoading ? <div className='space-y-3'>
                                    <div className="skeleton w-56 h-5 rounded-sm"></div>
                                    <div className="skeleton w-60 h-5 rounded-sm"></div>
                                    <div className="skeleton w-48 h-5 rounded-sm"></div>
                                    <div className="skeleton w-56 h-5 rounded-sm"></div>
                                    <div className="skeleton w-64 h-5 rounded-sm"></div>
                                    <div className="skeleton w-56 h-5 rounded-sm"></div>
                                    <div className="skeleton w-60 h-5 rounded-sm"></div>
                                    <div className="skeleton w-48 h-5 rounded-sm"></div>
                                    <div className="skeleton w-56 h-5 rounded-sm"></div>
                                </div> : ""
                            }
                            {products?.map((product) => (
                                <div key={product?._id} className="flex items-center mb-2">
                                    <input
                                        type="checkbox"
                                        // id={`product-${product?._id}`}
                                        className="mr-2"
                                        // checked={selectedProducts.includes(product.id)}
                                        onChange={() => handleProductSelection(product?._id)}
                                    />
                                    <label htmlFor={`product-${product.id}`} className="text-gray-700">
                                        {product?.title}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className='text-primary mt-2' >
                    {
                        errorText
                    }
                </div>

            </form>
        </div>
    );
};

export default CreateFlashSale;
