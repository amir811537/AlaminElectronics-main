import React from 'react';
import { FaHome } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import './BottomNav.css';
import { FaCartPlus, FaHeart } from 'react-icons/fa6';
import { MdAccountCircle } from 'react-icons/md';
import { RiLayoutGridFill } from 'react-icons/ri';

const BottomNav3 = () => {
    
    
    const { pathname } = useLocation();   
    const routes = ['/', '/allproduct', '/wishlist', '/cart', '/accountNav'];

    
    return (
        <div className="body">
            <div className="navigation">
                <ul>
                    <li className={`list ${pathname === '/' ? 'active' : ''}`}>
                        <Link to="/">
                            <span className="icon">
                                <FaHome className="text-xl text-white" />
                            </span>
                            <span className="text">Home</span>
                            <span className="circle"></span>
                        </Link>
                    </li>
                    <li className={`list ${pathname === '/allproduct' ? 'active' : ''}`}>
                        <Link to="/allproduct">
                            <span className="icon">
                                <RiLayoutGridFill className="text-xl text-white" />
                            </span>
                            <span className="text">All Product</span>
                            <span className="circle"></span>
                        </Link>
                    </li>
                    <li className={`list ${pathname === '/wishlist' ? 'active' : ''}`}>
                        <Link to="/wishlist">
                            <span className="icon">
                                <FaHeart className="text-xl text-white" />
                            </span>
                            <span className="text">Wishlist</span>
                            <span className="circle"></span>
                        </Link>
                    </li>
                    <li className={`list ${pathname === '/cart' ? 'active' : ''}`}>
                        <Link to="/cart">
                            <span className="icon">
                                <FaCartPlus className="text-xl text-white" />
                            </span>
                            <span className="text">Cart</span>
                            <span className="circle"></span>
                        </Link>
                    </li>
                    <li className={`list ${pathname === '/accountNav' ? 'active' : ''}`}>
                        <Link to="/accountNav">
                            <span className="icon">
                                <MdAccountCircle className="text-xl text-white" />
                            </span>
                            <span className="text">Account</span>
                            <span className="circle"></span>
                        </Link>
                    </li>
                    <div  className={ routes.includes(pathname) ? "indicator" : "hidden" }></div>
                </ul>
            </div>
        </div>
    );
};

export default BottomNav3;
