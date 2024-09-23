import React, { useState } from 'react';
import { TiDelete } from "react-icons/ti";
import { useSelector } from 'react-redux';
import { useDeleteCartProductMutation, useUpdateCartMutation } from '../../redux/api/baseApi';
import Swal from 'sweetalert2';

const CartItem = ({ item }) => {

    const [updateCart, { data: updateStatus }] = useUpdateCartMutation()

    // console.log(cartData)


    const [deleteItem, { data, error }] = useDeleteCartProductMutation()
    
    // console.log(error, data);


    const handleDelete = (id) => {
        console.log(id)
        Swal.fire({
            title: "Remove This Product from cart?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, remove it!"
        }).then((result) => {

            if (result.isConfirmed) {
                deleteItem(id)
                Swal.fire({
                    title: "Removed!",
                    text: "This product has been removed.",
                    icon: "success"
                });
            }
        });
    }


    const handleUpdateCart = (e, data) => {
        const id = data?._id
        console.log(id, data)

        const updatedItem = { quantity: parseInt(e.target.value) };
        console.log("Updating item:", updatedItem);

        updateCart({ id, data: updatedItem })

    };


    return (
        <div className="grid grid-cols-9  font-medium mb-8 mt-16">
            <div className="flex mr-5 relative items-center col-span-4  gap-2">
                <div className='w-1/4'>
                    <img src={item?.imageUrl} className="w-10  p-0" alt="" />
                </div>
                <h1 className="lg:max-w-72 w-3/4 col-span-2">
                    {" "}
                    {item?.title}
                </h1>
                <button onClick={() => { handleDelete(item?._id) }} className="text-red-500 text-xl   -top-1 absolute"><TiDelete />
                </button>

            </div>
            <h1 className="col-span-2">BDT {item?.discountedPrice ? item?.discountedPrice : item?.price }</h1>
            <div className="col-span-2">
                <input min={1}
                    onChange={(e) => handleUpdateCart(e, item)}
                    type="number"
                    defaultValue={item?.quantity}
                    className="input w-16 input-bordered"
                />
            </div>
            <h1 className="">BDT {parseInt( item?.discountedPrice || item?.price) * (item?.quantity)}</h1>

        </div>
    );
};

export default CartItem;