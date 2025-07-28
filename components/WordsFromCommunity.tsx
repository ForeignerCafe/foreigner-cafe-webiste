"use client"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";
import { useRouter } from "next/navigation";

export default function WordsFromCommunity() {
	const testimonials = [
		{
			quote:
				"Foreigner Cafe has truly redefined my coffee experience. The ambiance is perfect for deep conversations and quiet reflection.",
			name: "Sarah J.",
			avatar: "/placeholder.svg?height=40&width=40",
		},
		{
			quote:
				"Every time I step into Foreigner Cafe, the aroma of freshly brewed coffee instantly uplifts my spirits. It's my go-to place for a peaceful start to the day.",
			name: "Michael B.",
			avatar: "/placeholder.svg?height=40&width=40",
		},
		{
			quote:
				"Foreigner Cafe exceeds expectations with its friendly staff and delicious pastries. It's a hidden gem that deserves all the praise. Highly recommended!",
			name: "Emily R.",
			avatar: "/placeholder.svg?height=40&width=40",
		},
		{
			quote:
				"Foreigner Cafe exceeds expectations with its friendly staff and delicious pastries. It's a hidden gem that deserves all the praise. Highly recommended!",
			name: "Emily R.",
			avatar: "/placeholder.svg?height=40&width=40",
		},
	];
	const router = useRouter();
	return (
		<main className="flex flex-col min-h-screen mt-0">
			{/* Words From Community Section */}
			<section className="bg-white">
				<div className="container mx-auto px-4 md:px-6 text-center">
					<h2 className="text-3xl md:text-4xl font-semibold text-black mb-4 mt-6 md:mt-10 tracking-wide">
						WORDS FROM COMMUNITY
					</h2>
					<p className="text-gray-600 text-sm md:text-md lg:text-xl max-w-3xl mx-auto mb-8 md:mb-14 px-2 md:px-0">
						Hear from the people who've made Foreigner part of their everyday a
						place for reflection, conversation, and good coffee.
					</p>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mx-4 sm:mx-6 md:m-20 mb-0 mt-6 md:mt-10 gap-y-10 md:gap-y-14">
						{testimonials.map((testimonial, index) => (
							<Card
								key={index}
								className="bg-white shadow-lg p-4 md:p-6 flex flex-col text-left rounded-[0.5rem] items-center">
								<CardContent className="p-0">
									<Quote className="text-[#EC4E20] w-6 h-6 md:w-8 md:h-8 mb-3 md:mb-4 mx-auto" />
									<p className="text-gray-700 text-xs md:text-sm leading-relaxed text-wrap mb-4 md:mb-6">
										{testimonial.quote}
									</p>
									<div className="flex items-center space-x-3 md:space-x-4 justify-start">
										<Avatar className="w-8 h-8 md:w-10 md:h-10">
											<AvatarImage
												src={testimonial.avatar || "/placeholder.svg"}
												alt={testimonial.name}
											/>
											<AvatarFallback>
												{testimonial.name
													.split(" ")
													.map((n) => n[0])
													.join("")}
											</AvatarFallback>
										</Avatar>
										<div>
											<p className="font-semibold text-black text-xs md:text-sm">
												{testimonial.name}
											</p>
											<p className="text-xs md:text-sm text-gray-500">
												San Francisco
											</p>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
					<div className="text-center mt-8 md:mt-12">
						<Button
							onClick={() => router.push("/experiences")}
							className="rounded-[0.5rem] uppercase border border-[#EC4E20] bg-transparent text-[#EC4E20] hover:bg-[#f97316] hover:text-black hover:scale-110 text-xs sm:text-sm mb-6 md:mb-8 px-4 py-2">
							View All Experiences
						</Button>
					</div>
				</div>
			</section>
		</main>
	);
}
