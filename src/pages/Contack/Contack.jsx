import React, { useState } from "react";
import { IoCallOutline } from "react-icons/io5";
import { IoMailOutline } from "react-icons/io5";
import emailjs from '@emailjs/browser';

const Contack = () => {

	const [btnText , setBtnText]  = useState("Send Message")

	const handleContackUs = (e) => {

		setBtnText("Sending ...")
		e.preventDefault()

		const name = e.target.name.value
		const phone = e.target.phone.value
		const email = e.target.email.value
		const message = e.target.message.value

		const serviceId = "service_yev8zd8"
		const templeteId = "template_6xulcht"
		const publicKey = "1basqFKWSgsXJyEOu"


		const templateParams = {
			from_name: name,
			from_email: email,
			from_phone: phone,
			message: message,
			to_email: "mustafiz8260@gmail.com",
			to_name:"Mustafiz"
		}


		console.log(name, phone, email, message)

		emailjs
			.send(serviceId, templeteId, templateParams, publicKey)
			.then(
				() => {
					console.log('SUCCESS!');
					setBtnText("Email Sent")
				},
				(error) => {
					console.log('FAILED...', error.text);
					setBtnText("Send Failed")
				},
			);

	}
	return (
		<div className=" flex flex-col lg:flex-row px-5 lg:px-0 gap-2 lg:gap-20  mx-auto my-5 lg:my-20">
			<div className="">
				<div className="space-y-2 font-medium font-poppins">
					<div className="font-medium mb-5  flex  items-center gap-4">
						<div className="p-2 inline-block text-white bg-primary rounded-full text-xl">
							<IoCallOutline />
						</div>
						<h1 className="text-xl"> Call to Us</h1>
					</div>

					<p>We are available 24/7, 7 days a week.</p>
					<p className="">phone : +8801742950624</p>
				</div>
				<div className="w-80 h-[2px] mt-10 bg-black"></div>
				<div className="space-y-2 my-10 font-medium font-poppins">
					<div className="font-medium  mb-5 flex  items-center gap-4">
						<div className="p-2  inline-block text-white bg-primary rounded-full text-xl">
							<IoMailOutline />
						</div>
						<h1 className="text-xl mt-5 lg:mt-0"> Write to Us</h1>
					</div>

					<p>
						Fill out the form and we will contack <br />
						you within 24 hours
					</p>
					<p className="">Emails :</p>
					<div>
						<p className="">customer@alaminelectronics.com</p>
						<p className="">support@alaminelectronics.com</p>
					</div>
				</div>
			</div>
			<form onSubmit={handleContackUs} className="w-full ">
				<div className="flex  gap-5">
					<input
						type="text"
						placeholder="Name" required
						className=" input focus:border-none focus:outline-none  rounded-sm w-full  bg-[#F5F5F5]"
						name="name"
					/>
					<input
						type="tel"
						placeholder="Phone" required
						className=" input focus:border-none focus:outline-none  rounded-sm w-full  bg-[#F5F5F5]"
						name="phone"
					/>
					<input
						type="email"
						placeholder="Email"
						className=" input focus:border-none focus:outline-none  rounded-sm w-full  bg-[#F5F5F5]"
						name="email"
					/>
				</div>
				<div className="mt-5">
					<textarea placeholder="Your Message" required className="textarea resize-none focus:border-none focus:outline-none rounded-sm outline-none w-full h-64  bg-[#F5F5F5]" name="message" id=""></textarea>
					<div className="flex justify-end">
						<button className="btn btn-error bg-primary  px-8  mt-5 rounded-sm text-white ">{btnText}</button>

					</div>
				</div>
			</form>
		</div>
	);
};

export default Contack;
