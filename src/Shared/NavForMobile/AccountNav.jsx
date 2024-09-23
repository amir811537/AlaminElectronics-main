import { signOut } from 'firebase/auth';
import React from 'react';
import { FiShoppingBag } from 'react-icons/fi';
import { MdAccountCircle } from 'react-icons/md';
import { SlLogout } from 'react-icons/sl';
import { TiDeleteOutline } from 'react-icons/ti';
import { Link } from 'react-router-dom';
import auth from '../../../firebase.config';
import { setUser } from '../../redux/features/user/userSlice';
import { useGetSingleUserQuery, useRemoveTokenMutation } from '../../redux/api/baseApi';
import { useSelector } from 'react-redux';

const AccountNav = () => {
    const [removeToken, { data: status }] = useRemoveTokenMutation()

	const { email } = useSelector((state) => state.userSlice);
    const {data:isAdmin , isLoading} = useGetSingleUserQuery(email)

    console.log(isAdmin)

    const routes = [
        { path: "/admin/overview", title: "Overview" },
        { path: "/admin/orders", title: "Manage Orders" },
        { path: "/admin/productlist", title: "View Product" },
        { path: "/admin/addProduct", title: "Add Product" },
        { path: "/admin/manageCategories", title: "Manage Category" },
        { path: "/admin/managecoupons", title: "Manage Coupon" },
        { path: "/admin/userlist", title: "User Management" },
    ];
    


    const handleLogout = () => {
        signOut(auth).then(() => {
            dispatch(setUser({
                name: "",
                email: ""
            }))
            removeToken({})
        }).catch((error) => {
            // An error happened.
        });
    }

    return (
        <div className='min-h-[500px] mx-2 mt-5'>

           

            {
                isAdmin?.role ==="admin" ? routes?.map(item =>  <Link to={item?.path} className='flex mt-2 bg-[#F2F2F2]'>
                    <div className='clippath'></div>
                    <button className=" flex-1 btn  btn-lg border-none shadow-none  "><div className="flex gap-2 flex-row">
                        
                        <span>
                           {item?.title}
                        </span>{" "}
                    </div></button>
                    <div className='clippath-right'></div>

                </Link>  ) :  <div className="join w-full gap-2 join-vertical">
                <Link to="/Dashboard/myaccount" className='flex bg-[#F2F2F2]'>
                    <div className='clippath'></div>
                    <button className=" flex-1 btn  btn-lg border-none shadow-none  "><div className="flex gap-2 flex-row">
                        <span>
                            {" "}
                            <MdAccountCircle className="text-xl "></MdAccountCircle>
                        </span>{" "}
                        <span>
                            Manage My account
                        </span>{" "}
                    </div></button>
                    <div className='clippath-right'></div>

                </Link>
                <Link to="/Dashboard/myorders" className='flex bg-[#F2F2F2]'>
                    <div className='clippath'></div>
                    <button className=" flex-1 btn  btn-lg border-none shadow-none  "> <div className="flex gap-2 flex-row">
                        <span>
                            {" "}
                            <FiShoppingBag className="text-xl "></FiShoppingBag>
                        </span>{" "}
                        <span>
                            My Order
                        </span>{" "}
                    </div></button>
                    <div className='clippath-right'></div>

                </Link>
                <Link to="/Dashboard/mycancellation" className='flex bg-[#F2F2F2]'>
                    <div className='clippath'></div>
                    <button className=" flex-1 btn  btn-lg border-none shadow-none  "> <div className="flex gap-2 flex-row">
                        <span>
                            {" "}
                            <TiDeleteOutline className="text-xl "></TiDeleteOutline>
                        </span>{" "}
                        <span>
                            {" "}
                            My Cancellation
                        </span>{" "}
                    </div></button>
                    <div className='clippath-right'></div>

                </Link>
                <div onClick={handleLogout} className='flex bg-[#F2F2F2]'>
                    <div className='clippath'></div>
                    <button className=" flex-1 btn  btn-lg border-none shadow-none  "> <div  className="flex gap-2 flex-row">
                        <span>
                            {" "}
                            <SlLogout className="text-xl "></SlLogout>
                        </span>{" "}
                        Logout{" "}
                    </div></button>
                    <div className='clippath-right'></div>

                </div>

            </div>
            
            }
             <div onClick={handleLogout} className='flex bg-[#F2F2F2]'>
                    <div className='clippath'></div>
                    <button className=" flex-1 btn  btn-lg border-none shadow-none  "> <div  className="flex gap-2 flex-row">
                       
                        Logout{" "}
                    </div></button>
                    <div className='clippath-right'></div>

                </div>
           
        </div>
    );
};

export default AccountNav;