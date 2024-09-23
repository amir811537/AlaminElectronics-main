import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useGetSingleUserQuery, useUpdateUserMutation } from "../../../redux/api/baseApi";
import { getAuth, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from "firebase/auth";
import toast from "react-hot-toast";

const MyAccount = () => {
	const { register, handleSubmit } = useForm();
	const { email, isInitializing } = useSelector((state) => state.userSlice);
	const [updateUser, { data: updateStatus }] = useUpdateUserMutation();
	const {data:userDetails} = useGetSingleUserQuery(email)
	const [loading , setLoading] = useState(false)
	const [saveData , setSaveData ] = useState("Save")


	const auth = getAuth();
	const user = auth.currentUser;
	const provider = user?.providerData[0].providerId

	console.log(provider)

	const onSubmit = async (data) => {
		setSaveData("Saving...")

		const object = {
			firstName: data?.firstName || userDetails?.firstName,
			lastName: data?.lastName || userDetails?.firstName,
			email: email, 
			Address: data?.Address || userDetails?.Address
		};

		// Update other user details
		await updateUser(object);
		setSaveData("Saved")
		
	};


	const handleChangePassword = async (e) => {

		e.preventDefault()
		setLoading(true)

		const currentPassword = e.target.currentPassword.value
		const newPassword = e.target.newPassword.value
		const confirmPassword = e.target.confirmPassword.value

		console.log(currentPassword, newPassword, confirmPassword)

		if (newPassword !== confirmPassword) {
			setLoading(false)

			toast.error('New password and confirm password do not match', {
				style: {
					padding: '16px',
					color: '#ffffff',
					background: '#DB4444',
				},
				iconTheme: {
					primary: '#ffffff',
					secondary: '#DB4444',
				},
			});
			return;
		}

		const credential = EmailAuthProvider.credential(email, currentPassword);

		try {
			await reauthenticateWithCredential(user, credential);
			await updatePassword(user, newPassword);
			setLoading(false)
			e.target.reset()
			toast.success('Password Changed Successfully', {
				style: {
					padding: '16px',
					color: '#ffffff',
					background: '#22bb33',
				},
				iconTheme: {
					primary: '#ffffff',
					secondary: '#22bb33',
				},
			});

		} catch (error) {
				
			// console.error(erro);
			const errorMassage = error?.message.split(": ")[1]
			setLoading(false)

			toast.error(errorMassage	, {
				style: {
					padding: '16px',
					color: '#ffffff',
					background: '#DB4444',
				},
				iconTheme: {
					primary: '#ffffff',
					secondary: '#DB4444',
				},
			});
		}


	}

	console.log(userDetails , "userDetails")

	return (
		<div className=" m-10 mt-5 mx-auto">
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="flex items-center justify-between">
					<h1 className="font-medium-xl font-medium text-primary">Edit your Profile</h1>
					<button  className="btn btn-primary border-none bg-primary rounded-sm" type="submit">
						{saveData}
					</button>
				</div>

				<div className="flex flex-col lg:flex-row mt-5  lg:gap-20">
					<div className="mt-5 flex-1">
						<h1 className="mb-2 f onSubmit={handleSubmit(onSubmit)}nt-medium">First Name</h1>
						<input
							{...register("firstName")}
							type="text"
							placeholder=""
							defaultValue={userDetails?.firstName || ""}
							className="input focus:border-none focus:outline-none rounded-sm w-full bg-[#F5F5F5]"
						/>{" "}
					</div>
					<div className="mt-5 flex-1">
						<h1 className="mb-2 font-medium">Last Name</h1>
						<input
							{...register("lastName")}
							type="text"
							placeholder=""
							defaultValue={userDetails?.lastName ||""}
							className="input focus:border-none focus:outline-none rounded-sm w-full bg-[#F5F5F5]"
						/>{" "}
					</div>


				</div>
				<div className="flex lg:mt-5 flex-col lg:flex-row lg:gap-20">
					<div className="mt-5 flex-1">
						<h1 className="mb-2 font-medium">Email</h1>
						<input
							type="text"
							placeholder=""
							defaultValue={email}
							disabled
							className="input focus:border-none focus:outline-none rounded-sm w-full bg-[#F5F5F5]"
						/>{" "}
					</div>
					<div className="mt-5 flex-1">
						<h1 className="mb-2 font-medium">Address</h1>
						<input
							{...register("Address")}
							type="text"
							placeholder=""
							defaultValue={userDetails?.Address || ""}
							className="input focus:border-none focus:outline-none rounded-sm w-full bg-[#F5F5F5]"
						/>{" "}
					</div>
				</div>

			</form>

			<form onSubmit={handleChangePassword}>
				<div className="space-y-5">
					<h1 className="mb-2 font-medium mt-10">Password Changes</h1>
					{
						provider == "google.com" ? <p className="lg:text-sm text-[10px] text-primary">
							Since you signed in with Google, you can't change your password here. Please use Google account settings to update your password.
						</p> : ""
					}
					<input
						name="currentPassword"
						type="password" disabled={provider != "password"}
						placeholder="Current Password"
						className="input focus:border-none focus:outline-none rounded-sm w-full bg-[#F5F5F5]"
						
					/>{" "}

					<input disabled={provider != "password"}
						name="newPassword"
						type="password"
						placeholder="New Password"
						className="input focus:border-none focus:outline-none rounded-sm w-full bg-[#F5F5F5]"
					/>{" "}

					<input disabled={provider != "password"}
						name="confirmPassword"
						type="password"
						placeholder="Confirm Password"
						className="input focus:border-none focus:outline-none rounded-sm w-full bg-[#F5F5F5]"
					/>{" "}
				</div>

				<div className="flex justify-end items-center mt-8 gap-5">
					<button type="button">Cancel</button>
					<button disabled={provider != "password"} type="submit" className="btn btn-error bg-primary px-8 rounded-sm text-white">
						 {
							loading ? "changing ..." : "Change password"
						}
					</button>
				</div>
			</form>
		</div>
	);
};

export default MyAccount;
