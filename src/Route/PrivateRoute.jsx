// Assuming you have actions like `logoutUser` in your Redux slice
import { Navigate, useNavigate } from "react-router-dom";
import { setInitializing, setUser } from "../redux/features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../../firebase.config";

const PrivateRoute = ({ children }) => {
	const { email, isInitializing } = useSelector((state) => state.userSlice);
	const dispatch = useDispatch();
	const navigate = useNavigate();




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

	

	if (isInitializing) {
		return (
			<div className="h-[500px] w-full flex justify-center items-center">
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

	if (email) {
		return children;
	}

	return <Navigate to="/login" />;
};

export default PrivateRoute;
