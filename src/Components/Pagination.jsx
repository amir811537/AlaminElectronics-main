
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../redux/features/filter/filterSlice';
import { useGetProductsCountQuery, useGetProductsQuery } from '../redux/api/baseApi';

export default function Pagination() {

    const [pageNumber, setPageNumber] = useState(0);
    const {data:productCount} = useGetProductsCountQuery()
    const {products} = useGetProductsQuery()
    const {limit} = useSelector((state) => state.filterSearch)
    const dispatch = useDispatch()
    const page = Math.ceil(productCount?.count / limit) || 0 // Adjust the page numbers the way you want

    // console.log(productCount);
    
    const updatePageNumber = (num) => {
        if (num > page - 1 || 0 > num) {
            return setPageNumber(0);
        }
        setPageNumber(num);
    };

    useEffect(() => {
        dispatch(setPage({
            page: pageNumber
        }));

       
    } , [pageNumber , products ])
    
    return (
        <div className="mx-auto flex w-fit select-none items-center justify-center divide-x divide-primary overflow-hidden rounded-sm border border-primary bg-white ">
            {/* previous button */}
            <button
                disabled={pageNumber === 0}
                onClick={() => {
                    updatePageNumber(pageNumber - 1);
                }}
                className="w-20 cursor-pointer px-3 py-2 text-center text-sm outline-none transition-all duration-200 hover:bg-gray-500/20 disabled:bg-primary disabled:text-white "
            >
                Previous
            </button>
            <div className="flex items-center justify-center divide-x divide-primary">
                {[...Array(page).keys()].map((item, ind) => (
                    <div
                        onClick={() => {
                            setPageNumber(item);
                        }}
                        className={`cursor-pointer px-4 text-sm  transition-all duration-200 ${pageNumber === item ? 'bg-primary text-white' : 'hover:bg-gray-500/20'}  py-[8px] font-semibold`}
                        key={item}
                    >
                        {item + 1}
                    </div>
                ))}
            </div>
            {/* next button */}
            <button
                disabled={pageNumber === page - 1}
                onClick={() => {
                    updatePageNumber(pageNumber + 1);
                }}
                className="w-20 cursor-pointer px-3 py-2 text-center text-sm outline-none transition-all duration-200 hover:bg-gray-500/20 disabled:bg-primary disabled:text-white"
            >
                Next
            </button>
        </div>
    );
}

