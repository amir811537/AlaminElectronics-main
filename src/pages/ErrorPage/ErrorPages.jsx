import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPages = () => {
    return (
       <div className='w-full h-[600px] flex flex-col justify-center items-center text-center'>
         <div className=''>
         <h1 className='text-8xl'>404 Not Found</h1>
         <p className='mt-6'>Your visited page not found. <span className='font-poppins'>You may go home page</span>.</p>
         <Link to="/" className='btn btn-primary mt-12'>Back to home page</Link>
        </div>
       </div>
    );
};

export default ErrorPages;