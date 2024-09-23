import React from "react";
import { CiMenuBurger } from "react-icons/ci";
import { Link, NavLink, Outlet } from "react-router-dom";

const AdminDashboardLayout = () => {
	return (

		<div className="drawer lg:drawer-open">
			<input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
			<div className="drawer-content ">

				
				{/* Page content here */}
				

				<div className="flex items-center justify-between gap-2 sticky lg:hidden z-[998] bg-white top-0 p-4 px-4">
						<div className="flex-1 ">
							<h1 className="text-3xl ">BikroyElectronics</h1>

						</div>
						<label htmlFor="my-drawer-2" className="  text-5xl drawer-button lg:hidden">
							<CiMenuBurger className=" -mr-1" />

						</label>
					</div>

				<div className="w-full pt-10 ">
					<Outlet></Outlet>
				</div>


			</div>
			<div className="drawer-side z-[999] ">
				<label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
				<ul className="menu  bg-white text-base-content min-h-full w-80 px-5 lg:px-10">
					<div className=" font-medium text-base  lg:border-r pt-5 lg:pt-10  pb-0 pl-0  ">
						<div className="mb-5">
							<NavLink
								to="/admin/overview"
								className={({ isActive, isPending }) =>
									isPending
										? "pending"
										: isActive
											? "text-primary font-semibold  "
											: ""
								}
							>Dashboard Overview</NavLink>
						</div>
						<div className="mb-5">

							<NavLink
								to="/admin/orders"
								className={({ isActive, isPending }) =>
									isPending
										? "pending"
										: isActive
											? "text-primary font-semibold  "
											: ""
								}
							>Orders Management </NavLink>{" "}

						</div>
						<div className="mb-5">
							<Link to="/admin/manageCategories">Category & coupon</Link>
							<div className="flex text-sm flex-col mt-3 gap-1 ml-12 font-normal">
								<NavLink
									to="/admin/manageCategories"
									className={({ isActive, isPending }) =>
										isPending
											? "pending"
											: isActive
												? "text-primary font-semibold  "
												: ""
									}
								>Manage Category </NavLink>{" "}
								<NavLink
									to="/admin/managecoupons"
									className={({ isActive, isPending }) =>
										isPending
											? "pending"
											: isActive
												? "text-primary font-semibold  "
												: ""
									}
								>Manage coupon</NavLink>{" "}

							</div>
						</div>
						<div className="mb-5">
							<Link to="/admin/productlist">Product Management</Link>
							<div className="flex text-sm flex-col mt-3 gap-1 ml-12 font-normal">
								<NavLink
									to="/admin/productlist"
									className={({ isActive, isPending }) =>
										isPending
											? "pending"
											: isActive
												? "text-primary font-semibold  "
												: ""
									}
								>Product List </NavLink>{" "}
								<NavLink
									to="/admin/addproduct"
									className={({ isActive, isPending }) =>
										isPending
											? "pending"
											: isActive
												? "text-primary font-semibold  "
												: ""
									}
								>Add Product </NavLink>{" "}
								<NavLink
									to="/admin/bestsellings"
									className={({ isActive, isPending }) =>
										isPending
											? "pending"
											: isActive
												? "text-primary font-semibold  "
												: ""
									}
								>Best Selling Product </NavLink>{" "}
								<NavLink
									to="/admin/createflashsale"
									className={({ isActive, isPending }) =>
										isPending
											? "pending"
											: isActive
												? "text-primary font-semibold  "
												: ""
									}
								>Create Flash Sale event </NavLink>{" "}

							</div>
						</div>
						<div className="mb-5">
							<h1>User Management</h1>
							<div className="flex text-sm flex-col mt-3 gap-1 ml-12 font-normal">
								<NavLink
									to="/admin/userlist"
									className={({ isActive, isPending }) =>
										isPending
											? "pending"
											: isActive
												? "text-primary font-semibold  "
												: ""
									}
								>Site users List </NavLink>{" "}
								<NavLink
									to="/admin/customerList"
									className={({ isActive, isPending }) =>
										isPending
											? "pending"
											: isActive
												? "text-primary font-semibold  "
												: ""
									}
								>customers List </NavLink>{" "}

							</div>

						</div>
						<NavLink
							to="/"
							className={({ isActive, isPending }) =>
								isPending
									? "pending"
									: isActive
										? "text-primary font-semibold  "
										: ""
							}
						>Back to Homepage </NavLink>

					</div>
				</ul>	
			</div>
		</div>
		
	);
};

export default AdminDashboardLayout;
