"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default function MenuHighlight() {
	const menuItems = [
		{
			id: 1,
			image: { src: "/images/latte.webp", alt: "Signature Espresso" },
			title: "Signature Espresso",
			description: "Rich, balanced with notes of dark chocolate and caramel",
			price: "$4",
		},
		{
			id: 2,
			image: { src: "/images/crossiant.webp", alt: "Artisan Croissant" },
			title: "Artisan Croissant",
			description: "Buttery, flaky pastry baked fresh daily",
			price: "$3",
		},
		{
			id: 3,
			image: { src: "/images/matcha.webp", alt: "Matcha Latte" },
			title: "Matcha Latte",
			description: "Ceremonial grade matcha with steamed oat milk",
			price: "$5",
		},
		{
			id: 4,
			image: { src: "/images/drinks.webp", alt: "Coffee & Drinks" },
			title: "Coffee & Drinks",
			description: "Expertly roasted beans and signature beverages",
			price: "$4",
		},
		{
			id: 5,
			image: { src: "/images/specials.webp", alt: "Seasonal Specials" },
			title: "Seasonal Specials",
			description: "Fresh baked goods and seasonal dishes",
			price: "$10",
		},
		{
			id: 6,
			image: { src: "/images/pastry.webp", alt: "Food & Pastries" },
			title: "Food & Pastries",
			description: "Limited time offerings and chef's favorites",
			price: "$12",
		},
	];

	return (
		<section className="bg-white py-12">
			<div className="mt-[3rem] container mx-auto px-4 md:px-8 lg:px-16 text-center">
				<h2 className="text-3xl md:text-4xl font-bold text-black">
					MENU HIGHLIGHTS
				</h2>
				<p className="mt-[1rem] text-gray-600 text-md mx-auto">
					Discover our carefully crafted selection of artisanal coffee, fresh
					pastries, and seasonal dishes
				</p>
				<div className="relative mt-10">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{menuItems.map((item) => (
							<Card
								key={item.id}
								className="flex flex-col items-center shadow-lg rounded-3xl bg-white overflow-hidden">
								<div className="w-full h-64 relative">
									<Image
										src={item.image.src}
										alt={item.image.alt}
										fill
										className="object-cover hover:scale-110  rounded-b-[1rem] hover:rounded-b-[1rem]"
									/>
								</div>
								<CardHeader className="text-center p-4 pb-2 w-full">
									<CardTitle className="text-xl font-normal text-black">
										{item.title}
									</CardTitle>
								</CardHeader>
								<CardContent className="text-center text-gray-600 text-sm px-4 w-full">
									<p>{item.description}</p>
									<p className="font-bold text-sm mt-2 text-[#e65100]">
										{item.price}
									</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
				<div>
					<Button
						onClick={() =>
							window.open(
								"https://mhm-timber.s3.amazonaws.com/public/member/r9bJd/lurgtAi7r1j5/morningbreakfastmenuexamplecompressed.pdf",
								"_blank",
								"noopener,noreferrer"
							)
						}
						className="rounded-[0.5rem] uppercase border border-[#EC4E20] bg-transparent text-[#EC4E20] hover:bg-[#f97316] hover:text-black hover:scale-110 text-xs sm:text-sm px-6 py-3 mt-10">
						VIEW FULL MENU
					</Button>
				</div>
			</div>
		</section>
	);
}
