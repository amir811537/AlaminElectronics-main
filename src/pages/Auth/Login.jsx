import React, { useEffect, useState } from "react";
import signUpImage from "../../assets/Signup/Sign Up.webp";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
	loginUser,
	setIsLoggedIn,
	setUser,
	signInWithGoogle,
} from "../../redux/features/user/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../../../firebase.config";
import { IoEyeOutline } from "react-icons/io5";
import { RiEyeCloseLine } from "react-icons/ri";

const Login = () => {
	const { register, handleSubmit } = useForm();
	const [passView , setPassView] = useState(false)

	const dispatch = useDispatch();
	const navigate = useNavigate()
	const { isLoading, isInitializing, isLoggedIn, email } = useSelector((state) => state.userSlice);



	const onSubmit = async (data) => {
		try {
			await dispatch(
				loginUser({ email: data.email, password: data.password })
			);


		} catch (error) {
			console.error("Login error:", error);
		}
		console.log(data);
	};

	const handleGoogleSignin = async () => {
		try {
		  await dispatch(signInWithGoogle()).unwrap(); // unwrap to handle rejected promises
		  navigate('/');
		} catch (error) {
		  console.error("Google sign-in error:", error);
		}
	  };
	  


	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				dispatch(setUser({
					name: user?.displayName,
					email: user?.email,
					isInitializing: true,
					
				}))

				// if(isInitializing){
				// 	navigate('/')

				// }

				if (isLoggedIn) {
					navigate('/')
					dispatch(setIsLoggedIn({
						isLoggedIn: false
					}))

				}


			}
			else {
				console.log("user singed out")
				dispatch(setUser({
					isInitializing: false,
				}))
			}
		})
	}, [handleGoogleSignin]);

	return (
		<div className="h-screen flex justify-center  items-center">
			<div className="flex flex-col lg:flex-row gap-0 lg:gap-10 xl:gap-20 justify-center  mx-auto ">
				<div className="block lg:w-1/2">
					<img className="w-full md:h-[500px] lg:h-full object-cover" src={signUpImage} alt="" />
				</div>
				<div className="lg:w-1/2  lg:h-screen flex lg:items-center">
					<div className=" max-w-[500px] h md:-mt-24 lg:-mt-0 md:shadow-2xl lg:shadow-none bg-white font-poppins py-5 lg:py-20 px-10">
						<h1 className="font-inter font-medium text-2xl lg:text-3xl">
							Log in to BikroyElectronics
						</h1>

						<p className="mt-10 lg:mt-5 font-medium">
							Enter your detail below
						</p>

						<form onSubmit={handleSubmit(onSubmit)}>
							<input
								{...register("email", { required: true })}
								type="text"
								className="outline-none mt-8 py-2 w-full border-b-2 border-gray-400"
								placeholder="Email"
							/>
							
							<div className="flex mt-8 py-2 w-full border-b-2 border-gray-400 items-center">
							<input
								{...register("password", { required: true })}
								className="outline-none w-full"
								placeholder="password"
																type={passView ? "text" : "password"}

							/>
							<span onClick={() => setPassView(!passView)} className="pr-2 text-xl"> { passView ? <IoEyeOutline />  : <RiEyeCloseLine /> }

							</span>
							</div>

							<button className="btn mt-8 btn-primary border-none bg-primary text-white w-full rounded-md">
								{isLoading ? (
									<div className="flex gap-2 justify-center items-center">
										<span className="loading loading-spinner loading-sm"></span>
										<span>Logging In ...</span>
									</div>
								) : (
									"Log In"
								)}{" "}
							</button>
							<button
								onClick={handleGoogleSignin}
								className="btn mt-2 btn-outline  w-full rounded-md"
							>

								<FcGoogle className="mr-2 text-xl" />
								Sign in with google
							</button>
						</form>

						<p className="text-center mt-8">
							Didn't have an account{" "}
							<Link
								to="/signUp"
								className="ml-4 border-b-2 border-gray-500 pb-1"
							>
								sign up
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
