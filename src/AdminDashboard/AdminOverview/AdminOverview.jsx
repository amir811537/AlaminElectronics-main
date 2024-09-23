import React from 'react';
import { FaBangladeshiTakaSign } from 'react-icons/fa6';
import LineCharts from './Charts/LineCharts';
import PieChart from './Charts/PieChart';
import BarChart from './Charts/BarChart';
import { useGetStatisticsQuery, useGetusersQuery } from '../../redux/api/baseApi';

const AdminOverview = () => {

    //total products , total sold products , total sold price , total customers , total orders , pending orders  

    const {data: statistics} = useGetStatisticsQuery()
    
    const {totalUsers , totalProducts, totalOrderPrice, totalOrder , pendingOrder , totalCompletedOrder , cancelledOrders    } = statistics?.overviewData || {}


    console.log(statistics?.overviewData)

    const convertToShortFormat = (number) => {
        if (number < 1000) {
            return number.toString();
        } else if (number >= 1000 && number < 100000) {
            return (number / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
        } else if (number >= 100000 && number < 10000000) {
            return (number / 100000).toFixed(1).replace(/\.0$/, '') + 'L';
        } else if (number >= 10000000) {
            return (number / 10000000).toFixed(1).replace(/\.0$/, '') + 'Cr';
        }
    }


    console.log(statistics)




    return (
        <div>
            <div className='flex px-4 '>
                <div className=' w-2/3 gap-5 grid grid-cols-2 lg:grid-cols-3 w-full'>
                    <div className="flex-1 h-28 text-white bg-gradient-to-r from-[#f22929] to-[#fc5050] p-4 rounded-lg shadow-lg">
                        <span className='text-3xl lg:text-5xl font-bold'>{totalProducts || 0}</span>
                        <p className='text-sm mt-2'>Total Products</p>
                    </div>
                    <div className="flex-1 flex flex-col justify-between h-28 text-white bg-gradient-to-r from-[#1eac44] to-[#5ebc62] p-4 rounded-lg shadow-lg">
                        <div className='flex items-center gap-1 text-4xl font-bold'>
                            <FaBangladeshiTakaSign />
                            <span>{convertToShortFormat(totalOrderPrice) || 0}</span>
                        </div>
                        <p className='text-sm mt-2'>Total Sales</p>
                    </div>
                    <div className="flex-1 h-28 text-white bg-gradient-to-r from-[#246ee6] to-[#6c9be8] p-4 rounded-lg shadow-lg">
                        <span className='text-3xl lg:text-5xl font-bold'>{totalOrder || 0}</span>
                        <p className='text-sm mt-2'>Orders</p>
                    </div>
                    <div className="flex-1 h-28 text-white bg-gradient-to-r from-[#ffbf00] to-[#f7c635] p-4 rounded-lg shadow-lg">
                        <span className='text-3xl lg:text-5xl font-bold'>{pendingOrder || 0}</span>
                        <p className='text-sm mt-2'>Pending Order</p>
                    </div>
                    <div className="flex-1 h-28 text-white bg-gradient-to-r from-[#fe5c11] to-[#fa6d42] p-4 rounded-lg shadow-lg">
                        <span className='text-3xl lg:text-5xl font-bold'>{totalCompletedOrder || 0}</span>
                        <p className='text-sm mt-2'>Completed Order</p>
                    </div>
                    <div className="flex-1 h-28 text-white bg-gradient-to-r from-[#fe5c11] to-[#fa6d42] p-4 rounded-lg shadow-lg">
                        <span className='text-3xl lg:text-5xl font-bold'>{totalUsers || 0}</span>
                        <p className='text-sm mt-2'>Users</p>
                    </div>

                </div>
                
            </div>

            <div className='my-10 gap-5 px-4 '>
                <div className='h-[500px] py-10 lg:h-[500px]'>
                    <BarChart value={statistics?.BarChart}></BarChart>
                </div>
                <div className=' lg:w-1/3 my-5  '>
                    <PieChart></PieChart>
                </div>

               
            </div>

            

        </div>
    );
};

export default AdminOverview;
