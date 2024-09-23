import React from 'react';
import { IoSearch } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setCategories, setSearchText } from '../../redux/features/filter/filterSlice';

const TopNav = () => {

    const dispatch  = useDispatch()
	const navigate = useNavigate()
    
	
	const { email } = useSelector((state) => state.userSlice);
	console.log({userEmail : email})

    const handleSearch = (e) => {
		e.preventDefault();
		const searchText = e.target.search.value;
		dispatch(setSearchText({
			searchText : searchText
		}))
		dispatch(setCategories({
            categories: categories,
        }))
		navigate("/allproduct")
	};
    return (
        <div >

            <form
                onSubmit={handleSearch}
                className="flex items-center  py-1 px-6 text-base  bg-[rgb(235,235,235)]  "
            >
                <input
                    type="text"
                    name="search"
                    className="p-2 outline-none bg-transparent w-full "
                    placeholder="What are you looking for?"
                />
                <button type="submit">
                    <IoSearch className="ml-4 text-xl" />
                </button>
            </form>


        </div>
    );
};

export default TopNav;