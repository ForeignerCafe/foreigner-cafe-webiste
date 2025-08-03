"use client";

import { useEffect, useState } from "react";
import type React from "react";
import { Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { DialogTitle } from "@radix-ui/react-dialog";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useLenis } from "lenis/react";

interface ReservationModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	customerName?: string;
	isContactForm?: boolean; // New prop to distinguish between contact and reservation
}

interface FormErrors {
	customerName?: string;
	requestType?: string;
	numberOfPeople?: string;
	date?: string;
	time?: string;
	email?: string;
	phone?: string;
}

export function ReservationModal({
	open,
	onOpenChange,
	customerName,
	isContactForm = false,
}: ReservationModalProps) {
	const [requestType, setRequestType] = useState<string>(
		isContactForm ? "General" : ""
	);
	const [date, setDate] = useState<string>("");
	const [time, setTime] = useState<string>("");
	const [numberOfPeople, setNumberOfPeople] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [phone, setPhone] = useState<string>("");
	const [specialRequests, setSpecialRequests] = useState<string>("");
	const [errors, setErrors] = useState<FormErrors>({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [customerNameState, setCustomerNameState] = useState<string>(
		customerName || ""
	);

	const isEventOrReservation =
		!isContactForm &&
		(requestType === "Event" || requestType === "Reservation");

	const validateField = (name: string, value: string): string | undefined => {
		switch (name) {
			case "customerName":
				if (!value.trim()) return "Name is required";
				if (value.length < 2) return "Name must be at least 2 characters";
				return;
			case "requestType":
				if (!isContactForm && !value) return "Please select a request type";
				return;
			case "numberOfPeople":
				if (isEventOrReservation && !value)
					return "Number of people is required";
				if (
					isEventOrReservation &&
					(Number.parseInt(value) < 1 || isNaN(Number.parseInt(value)))
				)
					return "Please enter a valid number";
				return;
			case "date":
				if (isEventOrReservation && !value) return "Date is required";
				if (
					isEventOrReservation &&
					new Date(value) < new Date(new Date().setHours(0, 0, 0, 0))
				)
					return "Date cannot be in the past";
				return;
			case "time":
				if (isEventOrReservation && !value) return "Time is required";
				return;
			case "email":
				if (!value) return "Email is required";
				if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
					return "Please enter a valid email";
				return;
			case "phone":
				if (!value) return "Phone number is required";
				if (!/^[\d\s().-]{10,}$/.test(value))
					return "Please enter a valid phone number";
				return;
			default:
				return;
		}
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		switch (name) {
			case "numberOfPeople":
				setNumberOfPeople(value);
				break;
			case "email":
				setEmail(value);
				break;
			case "phone":
				setPhone(value);
				break;
			case "specialRequests":
				setSpecialRequests(value);
				break;
		}

		if (errors[name as keyof FormErrors]) {
			const error = validateField(name, value);
			setErrors((prev) => ({ ...prev, [name]: error }));
		}
	};

	const resetForm = () => {
		setRequestType(isContactForm ? "General" : "");
		setDate("");
		setTime("");
		setNumberOfPeople("");
		setEmail("");
		setPhone("");
		setSpecialRequests("");
		setErrors({});
		setCustomerNameState("");
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		const formData = {
			customerName: customerNameState,
			requestType: isContactForm ? "General" : requestType,
			numberOfPeople,
			date,
			time,
			email,
			phone,
		};

		const newErrors: FormErrors = {};
		Object.entries(formData).forEach(([key, value]) => {
			if (key === "requestType" && isContactForm) return; // Skip validation for hidden field
			const error = validateField(key, value);
			if (error) newErrors[key as keyof FormErrors] = error;
		});

		setErrors(newErrors);

		if (Object.keys(newErrors).length === 0) {
			const toastId = toast.loading("Submitting request...");
			try {
				const payload = {
					name: formData.customerName,
					email,
					phone,
					message:
						specialRequests ||
						(isEventOrReservation
							? `${requestType} request for ${numberOfPeople} people on ${date} at ${time}`
							: "General inquiry"),
					type: isContactForm ? "general" : requestType.toLowerCase(),
					date: isEventOrReservation ? date : null,
					people: isEventOrReservation ? Number.parseInt(numberOfPeople) : null,
				};

				const response = await axios.post("/api/contact", payload, {
					headers: {
						"Content-Type": "application/json",
					},
				});

				toast.success("Request submitted successfully!", { id: toastId });
				resetForm();
				onOpenChange(false);
			} catch (error: any) {
				const errorMessage =
					error.response?.data?.message ||
					error.response?.data ||
					"Failed to submit request.";
				toast.error(errorMessage, { id: toastId });
			} finally {
				setIsSubmitting(false);
			}
		} else {
			setIsSubmitting(false);
		}
	};

	const lenis = useLenis();

	useEffect(() => {
		if (open) {
			lenis?.stop();
			document.body.style.overflow = "hidden";
		} else {
			lenis?.start();
			document.body.style.overflow = "";
		}

		return () => {
			lenis?.start();
			document.body.style.overflow = "";
		};
	}, [open, lenis]);

	return (
		<Dialog open={open} onOpenChange={onOpenChange}  >
			<DialogContent className="max-w-auto max-h-[90vh] rounded-3xl bg-background p-0 shadow-lg md:max-w-lg lg:max-w-xl overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
				<DialogTitle className="sr-only">
					{isContactForm ? "Contact Us" : "Make a Reservation"}
				</DialogTitle>
				<style jsx global>{`
					.custom-scrollbar::-webkit-scrollbar {
						width: 4px;
						height: 2px;
					}
					.custom-scrollbar::-webkit-scrollbar-track {
						background: transparent;
						margin: 8px 0;
					}
					.custom-scrollbar::-webkit-scrollbar-thumb {
						background: #d1d5db;
						border-radius: 10px;
					}
					.custom-scrollbar::-webkit-scrollbar-thumb:hover {
						background: #9ca3af;
					}
					/* Fix for focus border clipping */
					.input-container {
						padding: 2px;
					}
					.input-container input:focus-visible {
						outline: 2px solid hsl(var(--ring));
						outline-offset: -1px;
					}
				`}</style>
				<div className="relative p-6 sm:p-8  h-full flex flex-col">
					<div className="custom-scrollbar overflow-y-auto h-full pr-2 -mr-2">
						<div className="space-y-6 ">
							<div className="text-center">
								<h2 className="text-2xl font-bold tracking-tight sm:text-3xl uppercase text-[#EC4E20]">
									{isContactForm
										? "Contact Us"
										: requestType
										? `${requestType} Request`
										: "Make a Reservation"}
								</h2>
								<p className="text-muted-foreground mt-2 text-[12px]">
									Please fill out the form below to submit your request
								</p>
							</div>

							<form onSubmit={handleSubmit} className="space-y-4">
								{/* Customer Name */}
								<div>
									<Label htmlFor="customerName">Customer Name *</Label>
									<div className="input-container mt-2">
										<Input
											name="customerName"
											id="customerName"
											className="rounded-[0.5rem]"
											placeholder="Your name"
											value={customerNameState}
											onChange={(e) => setCustomerNameState(e.target.value)}
											onBlur={(e) => {
												const error = validateField(
													"customerName",
													e.target.value
												);
												setErrors((prev) => ({ ...prev, customerName: error }));
											}}
										/>
									</div>
									{errors.customerName && (
										<p className="mt-1 text-sm text-red-600">
											{errors.customerName}
										</p>
									)}
								</div>

								{/* Request Type - hidden for contact form */}
								{!isContactForm && (
									<div>
										<Label htmlFor="requestType">Request Type *</Label>
										<Select
											onValueChange={(value) => {
												setRequestType(value);
												setErrors((prev) => ({
													...prev,
													requestType: undefined,
												}));
											}}
											required
											value={requestType}>
											<SelectTrigger
												className="rounded-[0.5rem] mt-2"
												id="requestType">
												<SelectValue placeholder="Select request type" />
											</SelectTrigger>
											<SelectContent className="rounded-[0.5rem]">
												<SelectItem value="Event">Event</SelectItem>
												<SelectItem value="Reservation">Reservation</SelectItem>
												<SelectItem value="General">General</SelectItem>
												<SelectItem value="Feedback">Feedback</SelectItem>
												<SelectItem value="Other">Other</SelectItem>
											</SelectContent>
										</Select>
										{errors.requestType && (
											<p className="mt-1 text-sm text-red-600">
												{errors.requestType}
											</p>
										)}
									</div>
								)}

								{/* Number of People - only shown for Event or Reservation */}
								{isEventOrReservation && (
									<div>
										<Label htmlFor="numberOfPeople">Number of People *</Label>
										<div className="input-container mt-2">
											<Input
												name="numberOfPeople"
												id="numberOfPeople"
												className="rounded-[0.5rem]"
												type="number"
												min="1"
												value={numberOfPeople}
												onChange={handleChange}
												onBlur={(e) => {
													const error = validateField(
														"numberOfPeople",
														e.target.value
													);
													setErrors((prev) => ({
														...prev,
														numberOfPeople: error,
													}));
												}}
												placeholder="How many people?"
											/>
										</div>
										{errors.numberOfPeople && (
											<p className="mt-1 text-sm text-red-600">
												{errors.numberOfPeople}
											</p>
										)}
									</div>
								)}

								{/* Date and Time - only shown for Event or Reservation */}
								{isEventOrReservation && (
									<div className="grid grid-cols-2 gap-4">
										<div>
											<Label htmlFor="date">Date *</Label>
											<div className="relative mt-2 input-container">
												<Input
													name="date"
													id="date"
													className="rounded-[0.5rem] pl-10"
													type="date"
													value={date}
													onChange={(e) => {
														setDate(e.target.value);
														setErrors((prev) => ({ ...prev, date: undefined }));
													}}
													onBlur={(e) => {
														const error = validateField("date", e.target.value);
														setErrors((prev) => ({ ...prev, date: error }));
													}}
												/>
												<Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 pointer-events-none" />
											</div>
											{errors.date && (
												<p className="mt-1 text-sm text-red-600">
													{errors.date}
												</p>
											)}
										</div>
										<div>
											<Label htmlFor="time">Time *</Label>
											<div className="relative mt-2 input-container">
												<Input
													name="time"
													id="time"
													className="rounded-[0.5rem] pl-10"
													type="time"
													value={time}
													onChange={(e) => {
														setTime(e.target.value);
														setErrors((prev) => ({ ...prev, time: undefined }));
													}}
													onBlur={(e) => {
														const error = validateField("time", e.target.value);
														setErrors((prev) => ({ ...prev, time: error }));
													}}
												/>
												<Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 pointer-events-none" />
											</div>
											{errors.time && (
												<p className="mt-1 text-sm text-red-600">
													{errors.time}
												</p>
											)}
										</div>
									</div>
								)}

								{/* Special Requests */}
								<div>
									<Label htmlFor="specialRequests">
										{isContactForm ? "Your Message" : "Special Requests"}
									</Label>
									<div className="input-container mt-2">
										<Textarea
											name="specialRequests"
											id="specialRequests"
											className="rounded-[0.5rem]"
											rows={3}
											value={specialRequests}
											onChange={handleChange}
											placeholder={
												isContactForm
													? "How can we help you?"
													: "Any special requests or dietary restrictions?"
											}
										/>
									</div>
								</div>

								{/* Contact Information */}
								<div className="space-y-4 pt-2">
									<h3 className="text-lg font-medium">Contact Information</h3>
									<div>
										<Label htmlFor="email">Email *</Label>
										<div className="input-container mt-2">
											<Input
												name="email"
												id="email"
												className="rounded-[0.5rem]"
												type="email"
												value={email}
												onChange={handleChange}
												onBlur={(e) => {
													const error = validateField("email", e.target.value);
													setErrors((prev) => ({ ...prev, email: error }));
												}}
												placeholder="your.email@example.com"
											/>
										</div>
										{errors.email && (
											<p className="mt-1 text-sm text-red-600">
												{errors.email}
											</p>
										)}
									</div>
									<div>
										<Label htmlFor="phone">Phone Number *</Label>
										<div className="input-container mt-2">
											<Input
												name="phone"
												id="phone"
												className="rounded-[0.5rem]"
												type="tel"
												value={phone}
												onChange={handleChange}
												onBlur={(e) => {
													const error = validateField("phone", e.target.value);
													setErrors((prev) => ({ ...prev, phone: error }));
												}}
												placeholder="(123) 456-7890"
											/>
										</div>
										{errors.phone && (
											<p className="mt-1 text-sm text-red-600">
												{errors.phone}
											</p>
										)}
									</div>
								</div>

								<Button
									type="submit"
									className="w-full bg-[#EC4E20] rounded-[0.5rem] hover:bg-[#f97316] mt-4"
									disabled={isSubmitting}>
									{isSubmitting ? "Submitting..." : "Submit Request"}
								</Button>
							</form>

							{/* Additional Information */}
							<div className="pt-4 border-t border-gray-200">
								<h3 className="text-lg font-medium">Need help?</h3>
								<p className="text-sm text-muted-foreground mt-2">
									For immediate assistance, please call us at +1 (650) 620 1888
									during our business hours.
								</p>
							</div>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
