import React, { useEffect, useState } from "react";
import signUpImage from "../../assets/Signup/Sign Up.webp";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createUser, setIsLoggedIn, setUser, signInWithGoogle } from "../../redux/features/user/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../../../firebase.config";
import { IoEyeOutline } from "react-icons/io5";
import { RiEyeCloseLine } from "react-icons/ri";


const Regestration = () => {
	const { register, handleSubmit } = useForm();
	const [errorText, setErrorText] = useState("")
	const dispatch = useDispatch()
	const { isLoading, isInitializing, isLoggedIn, email } = useSelector((state) => state.userSlice);
	const navigate = useNavigate()
	const [passView , setPassView] = useState(false)


	

	const onSubmit = async (data) => {

		if (data?.password?.length < 8) {
			return setErrorText("Password must be at least 8 characters long.");
		}
		if (!/[A-Z]/.test(data.password)) {
			return setErrorText("Password must include at least one uppercase letter.");
		}
		if (!/[a-z]/.test(data.password)) {
			return setErrorText("Password must include at least one lowercase letter.");
		}
		if (!/[0-9]/.test(data.password)) {
			return setErrorText("Password must include at least one number.");
		}
		if (!/[!@#$%^&*(),.?":{}|<>]/.test(data.password)) {
			return setErrorText("Password must include at least one special character.");
		}

		// If all conditions are met
		setErrorText("");  // Clear error text if the password is strong



		try {
			await dispatch(createUser({ name: data.userName, email: data.email, password: data.password }));

			console.log(data.userName);

		} catch (error) {
			console.log('Registration error:', error);
			console.log("error")
			// Handle error (if createUser thunk rejects)
		}
	};
	const handleGoogleSignin = async (data) => {
		try {
			await dispatch(signInWithGoogle({ name: data.userName, email: data.email, password: data.password }));

			if (!data?.userName) {
				setErrorText("Error Creating user try with different Email")
			}

			console.log(data.userName);
			// Handle success if needed
		} catch (error) {
			console.error('Registration error:', error);
			// Handle error (if createUser thunk rejects)
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
		<div className="h-screen flex justify-center items-center">
			<div className="flex flex-col lg:flex-row gap-0 lg:gap-10 xl:gap-20 justify-center  mx-auto  ">
				<div className="  lg:block lg:w-1/2">
					<img className="w-full md:h-[500px] lg:h-full object-cover" src={signUpImage} alt="" />
				</div>
				<div className="lg:w-1/2  lg:h-screen flex lg:items-centergit ">
					<div className="bg-white md:-mt-28 md:shadow-2xl lg:shadow-none lg:-mt-0 max-w-[500px] font-poppins py-5 lg:py-10 px-10">
						<h1 className="font-inter md:mt-5 font-medium text-2xl lg:text-4xl">
							Create an Account
						</h1>

						<p className="mt-5 font-medium">Enter your detail below</p>

						<form onSubmit={handleSubmit(onSubmit)}>
							<input
								{...register("userName", { required: true })}
								type="text"
								className="outline-none mt-8 py-2 w-full border-b-2 border-gray-400"
								placeholder="Name"
							/>
							<input
								{...register("email", { required: true })}
								type="text"
								className="outline-none mt-8 py-2 w-full border-b-2 border-gray-400"
								placeholder="Email"
							/>
							<div className="flex mt-8 py-2 w-full border-b-2 border-gray-400 items-center">
							<input
								{...register("password", { required: true })}
								type={passView ? "text" : "password"}
								className="outline-none w-full "
								placeholder="password"
							/>
							<span onClick={() => setPassView(!passView)} className="pr-2 text-xl"> { passView ? <IoEyeOutline />  : <RiEyeCloseLine /> }

							</span>
							</div>


							<p className="text-red-500 mt-4">{errorText}</p>

							<button className="btn mt-4 btn-primary border-none bg-primary text-white w-full rounded-md">
								{isLoading ? (
									<div className="flex gap-2 justify-center items-center">
										<span className="loading loading-spinner loading-sm"></span>
										<span>Creating Account...</span>
									</div>
								) : (
									"Create Account"
								)}{" "}
							</button>
							<button onClick={handleGoogleSignin} className="btn mt-2 btn-outline  w-full rounded-md">
								<FcGoogle className="mr-2 text-xl" />
								Sign in with google
							</button>
						</form>

						<p className="text-center mt-8">
							Already have an account{" "}
							<Link
								to="/login"
								className="ml-4 border-b-2 border-gray-500 pb-1"
							>
								sign in
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Regestration;
