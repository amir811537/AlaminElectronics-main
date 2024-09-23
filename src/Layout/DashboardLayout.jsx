import React from "react";
import { NavLink, Outlet } from "react-router-dom";

import { VscAccount } from "react-icons/vsc";
import { FiShoppingBag } from "react-icons/fi";
import { SlLogout } from "react-icons/sl";
import { CiStar } from "react-icons/ci";
import { TiDeleteOutline } from "react-icons/ti";
import { CiMenuBurger } from "react-icons/ci";
import TopNav from "../Shared/NavForMobile/TopNav";

const DashboardLayout = () => {
	return (
		
		<div className="drawer  font-poppins mx-auto lg:drawer-open">
			<input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
			<div className="drawer-content ">
				<div className="">
					{/*  */}

				</div>
				<div className=" px-5 lg:px-0 lg:pl-10">
					<div className="flex gap-2 sticky lg:hidden z-[998] bg-white top-0 p-4 px-0">
						<div className="flex-1 ">
							<TopNav ></TopNav>

						</div>
						<label htmlFor="my-drawer-2" className="  text-5xl drawer-button lg:hidden">
							<CiMenuBurger className=" -mr-1" />

						</label>
					</div>
					<Outlet></Outlet>
				</div>


			</div>
			<div className="drawer-side  z-[999]">
				<label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
				<ul className="menu  border-r p-5 lg:p-0   bg-white !pt-5 text-base-content min-h-full w-72 ">
					{/* Sidebar content here */}
					<NavLink
						to="/Dashboard/myaccount"
						className={({ isActive, isPending }) =>
							isPending
								? "pending"
								: isActive
									? "text-primary    border-primary"
									: ""
						}
					>
						<div className="flex items-center  mb-5 gap-2 flex-row">
							<span>
								{" "}
								<VscAccount className="text-xl "></VscAccount>
							</span>{" "}
							Manage My account{" "}
						</div>
					</NavLink>

					<NavLink
						to="/Dashboard/myorders"
						className={({ isActive, isPending }) =>
							isPending
								? "pending"
								: isActive
									? "text-primary items-center   border-primary"
									: ""
						}
					>
						<div className="flex items-center mb-5 gap-2 flex-row">
							<span>
								{" "}
								<FiShoppingBag className="text-xl "></FiShoppingBag>
							</span>{" "}
							My Order{" "}
						</div>
					</NavLink>
					<NavLink
						to="/Dashboard/mycancellation"
						className={({ isActive, isPending }) =>
							isPending
								? "pending"
								: isActive
									? "text-primary   border-primary"
									: ""
						}
					>
						<div className="flex gap-1 items-center flex-row">
							<span>
								{" "}
								<TiDeleteOutline className="text-2xl p-0 "></TiDeleteOutline>
							</span>{" "}
							My Cancellation{" "}
						</div>
					</NavLink>
				</ul>
			</div>
		</div>
	);
};

export default DashboardLayout;
