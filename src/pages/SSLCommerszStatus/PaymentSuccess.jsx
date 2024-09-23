import React from 'react';
import { FaCheckCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';


const PaymentSuccess = () => {
    return (
<div className='flex justify-center items-center h-screen w-screen bg-gray-100'>
  <div className='bg-white p-8 rounded-lg shadow-lg text-center'>
    <div className='flex justify-center'>
      <FaCheckCircle className='text-9xl text-green-600 animate-bounce' />
    </div>
    <h1 className='text-2xl font-bold mt-4'>Payment Successful!</h1>
    <p className='text-gray-600 mt-2'>Thank you for your purchase. Your payment has been processed successfully.</p>
    <div className="flex justify-center gap-4 mt-6">
      <Link to="/Dashboard/myorders" className='btn border-none rounded-md px-6 py-2 text-white bg-green-600 hover:bg-green-700 transition-all duration-200'>
        View Order
      </Link>
      <Link to="/" className='btn border-none rounded-md px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200'>
        Return to Home
      </Link>
    </div>
  </div>
</div>

    );
};

export default PaymentSuccess;