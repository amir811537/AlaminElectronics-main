import React from 'react';
import { FaTimesCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const PayemntFailed = () => {
    return (
        <div>

            <div className='flex justify-center items-center h-screen w-screen bg-gray-100'>
                <div className='bg-white p-8 rounded-lg shadow-lg text-center'>
                    <div className='flex justify-center'>
                        <FaTimesCircle className='text-9xl text-red-600 animate-shake' />
                    </div>
                    <h1 className='text-2xl font-bold mt-4 text-red-600'>Payment Failed!</h1>
                    <p className='text-gray-600 mt-2'>Unfortunately, your payment could not be processed. Please try again.</p>
                    <div className="flex justify-center gap-4 mt-6">
                        <Link to="/checkout" className='btn border-none rounded-md px-6 py-2 text-white bg-red-600 hover:bg-red-700 transition-all duration-200'>
                            Try Again
                        </Link>
                        <Link to="/" className='btn border-none rounded-md px-6 py-2 text-white bg-red-600 hover:bg-red-700 transition-all duration-200'>
                            Return to Home
                        </Link>
                    </div>
                </div>
            </div>        </div>
    );
};

export default PayemntFailed;