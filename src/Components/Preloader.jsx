import React from 'react';
import "./Preloader.css"
import logo from "../assets/Logo/glasses-svgrepo-com.svg"
import drone from "../assets/Logo/Drone.svg"
// import drone from ""


const Preloader = () => {
    return (
        <div className="">

            <div className="preloader ">
                <div className="circle1 relative"></div>
                <div className="logo-container">
                </div>
                <div className="">
                <img src={logo} alt="Logo" className="logo absolute top-1/2 -translate-x-1/2 -translate-y-1/2  left-1/2  " />


                </div>
                <img src={drone} className='drone' alt="" />
                <div className="text font-Enter">
                    <span>A</span>
                    <span>I</span>
                    <span > &nbsp;</span>
                    <span>A</span>
                    <span>M</span>
                    <span>I</span>
                    <span>N</span>
                    <span > &nbsp;</span>
                    <span > &nbsp;</span>
                    
                    <span> </span>
                    <span>E</span>
                    <span>L</span>
                    <span>E</span>
                    <span>C</span>
                    <span>T</span>
                    <span>R</span>
                    <span>O</span>
                    <span>N</span>
                    <span>I</span>
                    <span>C</span>
                    <span>S</span>
                </div>
            </div>

        </div>
    );
};

export default Preloader;
