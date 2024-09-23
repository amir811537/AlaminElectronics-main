import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home";
import ErrorPages from "../pages/ErrorPage/ErrorPages";
import About from "../pages/About/About";
import Contack from "../pages/Contack/Contack";
import Login from "../pages/Auth/Login";
import Regestration from "../pages/Auth/Regestration";
import Wishlist from "../pages/Wishlist/Wishlist";
import Cart from "../pages/Cart/Cart";
import MyAccount from "../pages/userDashborad/MyAccount/MyAccount";
import MyOrder from "../pages/userDashborad/MyOrder/MyOrder";
import MyCancellations from "../pages/userDashborad/MyCancellation/MyCancellations";
import DashboardLayout from "../Layout/DashboardLayout";
import ProductList from "../AdminDashboard/ProductManagement/ProductList";
import ManageCategories from "../AdminDashboard/Categories&coupon/ManageCategories";
import AddProduct from "../AdminDashboard/ProductManagement/AddProduct";
import AdminDashboardLayout from "../Layout/AdminDashboardLayout"
import AdminOverview from "../AdminDashboard/AdminOverview/AdminOverview";
import ManageCoupons from "../AdminDashboard/Categories&coupon/ManageCoupons";
import BestSelling from "../pages/Home/BestSelling";
import UserList from "../AdminDashboard/UserManagement/UserList";
import CreateFlashSale from "../AdminDashboard/ProductManagement/CreateFlashSale";
import BestSellingProducts from "../AdminDashboard/ProductManagement/BestSellingProducts";
import OrderList from "../AdminDashboard/OrderManagement/OrderList";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import AllProduct from "../pages/AllProduct/AllProduct";
import PrivateRoute from "./PrivateRoute";
import EditProduct from "../AdminDashboard/ProductManagement/EditProduct";
import Checkout from "../pages/Checkout/Checkout";
import AccountNav from "../Shared/NavForMobile/AccountNav";
import SingleOrder from "../AdminDashboard/OrderManagement/SingleOrder";
import CustomerList from "../AdminDashboard/UserManagement/CustomerList";
import AdminRoute from "./AdminRoute";
import PaymentSuccess from "../pages/SSLCommerszStatus/PaymentSuccess";
import PayemntFailed from "../pages/SSLCommerszStatus/PayemntFailed";


const router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout></MainLayout>,
		errorElement: <ErrorPages></ErrorPages>,
		children: [
			{
				path: "/",
				element: <Home></Home>,
			},
			{
				path: "/about",
				element: <About></About>,
			},
			{
				path: "/contact",
				element: <Contack></Contack>
			},
			
			{
				path: "/wishlist",
				element: <PrivateRoute><Wishlist></Wishlist></PrivateRoute>,
			},
			{
				path: "/cart",
				element: <PrivateRoute><Cart></Cart></PrivateRoute>  ,
			},
			{
				path: "/productdetail/:id",
				element: <ProductDetail></ProductDetail>
			},
			{
				path: "/allproduct/productdetail/:id",
				element: <ProductDetail></ProductDetail>
			},
			{
				path: "/allproduct",
				element: <AllProduct></AllProduct>
			},
			{
				path : "/accountNav",
				element :<PrivateRoute><AccountNav></AccountNav></PrivateRoute> 
			},
			{
				path: "/checkout",
				element: <Checkout></Checkout>
			},

			{
				path: "/Dashboard",
				element: <DashboardLayout></DashboardLayout>,
				errorElement: <ErrorPages></ErrorPages>,
				children: [
					{
						path: "myaccount",
						element: <PrivateRoute><MyAccount></MyAccount></PrivateRoute>  ,
					},
					{
						path: "myorders",
						element: <PrivateRoute> <MyOrder></MyOrder></PrivateRoute> ,
					},
					{
						path: "mycancellation",
						element: <PrivateRoute> <MyCancellations></MyCancellations></PrivateRoute> ,
					},
				],
			},
		],
	},
	{
		path: "/admin",
		element: <AdminRoute><AdminDashboardLayout></AdminDashboardLayout></AdminRoute>,
		errorElement: <ErrorPages></ErrorPages>,
		children: [
			{
				path: "overview", 
				element: <AdminRoute> <AdminOverview></AdminOverview></AdminRoute>
			},
			{
				path: "addproduct",
				element: <AdminRoute><AddProduct></AddProduct></AdminRoute>,

			},
			{
				path: "editProducts/:id",
				element: <AdminRoute><EditProduct></EditProduct></AdminRoute>
			},
			{
				path: "productlist",
				element: <AdminRoute><ProductList></ProductList></AdminRoute>
			},
			{
				path: "manageCategories",
				element: <AdminRoute><ManageCategories></ManageCategories></AdminRoute>
			},
			{
				path: "managecoupons",
				element: <AdminRoute><ManageCoupons></ManageCoupons></AdminRoute>
			},
			{
				path: "bestsellings",
				element:<AdminRoute> <BestSellingProducts></BestSellingProducts></AdminRoute>
			},
			{
				path: "userlist",
				element: <AdminRoute><UserList></UserList></AdminRoute>
			},
			{
				path: "customerList",
				element:<AdminRoute> <CustomerList></CustomerList></AdminRoute>
			},
			{
				path: "createflashsale",
				element: <AdminRoute><CreateFlashSale></CreateFlashSale></AdminRoute>
			},
			
			{
				path: "orders",
				element: <AdminRoute><OrderList></OrderList></AdminRoute>
			},
			{
				path: "orders/:id",
				element: <AdminRoute><SingleOrder></SingleOrder></AdminRoute>
			},
		],
	},
	{
		path: "/login",
		element: <Login></Login>,
	},
	{
		path: "/signUp",
		element: <Regestration></Regestration>,
	},
	{
		path: "/payment/success",
		element: <PaymentSuccess></PaymentSuccess>
	},
	{
		path: "/payment/failed",
		element: <PayemntFailed></PayemntFailed>
	},
]);

export default router;
