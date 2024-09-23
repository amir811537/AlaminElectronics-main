// Assuming you have actions like `logoutUser` in your Redux slice
import { Navigate, useNavigate } from "react-router-dom";
import { setInitializing, setUser } from "../redux/features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../../firebase.config";
import { useGetSingleUserQuery } from "../redux/api/baseApi";

const AdminRoute = ({ children }) => {
    const { email, isInitializing } = useSelector((state) => state.userSlice);
    const {data:isAdmin , isLoading} = useGetSingleUserQuery(email)
	const dispatch = useDispatch();
	const navigate = useNavigate();


    console.log(isAdmin?.role , "isAdmin")


	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				dispatch(
					setUser({
						name: user?.displayName,
						email: user?.email,
						
					})
				);
				dispatch(setInitializing({ isInitializing: false }));
			} else {
				navigate("/login");
				dispatch(
					setUser({
						name: null,
						email: null,
					})
				);
				dispatch(setInitializing({ isInitializing: false }));
			}
		});

		return unsubscribe; // Cleanup on unmount
	}, [dispatch]);

	

	if (isInitializing || isLoading) {
		return (
			<div className="h-screen min-h-[500px] w-full flex justify-center items-center">
				<div className="loader">
					<div className="loader-square"></div>
					<div className="loader-square"></div>
					<div className="loader-square"></div>
					<div className="loader-square"></div>
					<div className="loader-square"></div>
					<div className="loader-square"></div>
					<div className="loader-square"></div>
				</div>
               
			</div>
		);
	}

	
	if (email && (isAdmin?.role == "admin")) {
		return children;
	}
    

	return <Navigate to="/lomiangin" />;
};

export default AdminRoute;
