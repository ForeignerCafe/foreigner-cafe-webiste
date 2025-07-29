"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const storyElements = [
	{
		id: 1,
		layout: "right", // Media on the right, text on the left
		title: "Our Humble Beginnings",
		text: "Foreigner Cafe began as a dream to create a space where community and craft coffee intersect. Our industrial-modern aesthetic was inspired by art, rooted in Founder and Director, Emily Chen's cherished Sunday afternoons with her Nonna's cooking. Here, you can taste world-class coffee and food in a space that feels like home.",
		media: {
			type: "image",
			src: "/images/interior.webp",
			alt: "Cafe interior with warm lighting",
			linkHref: "#",
		},
	},
	{
		id: 2,
		layout: "left", // Media on the left, text on the right
		title: "The Art of the Bean",
		text: "Our coffee is sourced from the finest growers around the world, roasted in-house with passion and precision. Our drinks combine exceptional craft coffee, from our signature espresso to exciting new menu items from around the globe. For those on the move, grab a tasty breakfast or lunch from our selection of sandwiches, wraps, salads, and sweets.",
		media: {
			type: "image",
			src: "/images/art.webp",
			alt: "Barista pouring latte art",
			linkHref: "#",
		},
	},
	{
		id: 3,
		layout: "right",
		title: "Beyond the Cup",
		text: "With everything baked fresh daily in our pastry kitchen, every dish promises high-quality, fresh, and memorable moments, whether you're dining in or taking something to go. We believe in fostering authentic experiences and celebrating the art of hospitality. Our space is designed to be a warm invitation to slow down, connect, and create lasting memories.",
		media: {
			type: "video",
			src: "https://res.cloudinary.com/dxtclcoxh/video/upload/v1752141159/yt1z.net_-_BARISTA_Cafe_Promo_Video_Cinematic_Real_Estate_video_Epic_B-Roll_1080p60_httacw.mp4",
			alt: "",
		},
	},
	{
		id: 4,
		layout: "left",
		title: "A Place to Connect",
		text: "Foreigner Cafe is more than just a place to grab a coffee; it's a hub where stories are shared, ideas are born, and friendships flourish. Our commitment to quality extends beyond our menu to the very fabric of our community. Join us for an experience that nourishes both body and soul.",
		media: {
			type: "image",
			src: "/images/connect.webp",
			alt: "People chatting in a cafe",
			linkHref: "#",
		},
	},
];

export default function CafeStorySection() {
	const [isVisible, setIsVisible] = useState(false);
	const sectionRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
				}
			},
			{ threshold: 0.1 }
		);

		if (sectionRef.current) {
			observer.observe(sectionRef.current);
		}

		return () => observer.disconnect();
	}, []);

	return (
		<section
			ref={sectionRef}
			id="story"
			className="bg-white py-12 lg:py-20">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div
					className={`text-center mb-16 transition-all duration-1000 ${
						isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
					}`}>
					<h2 className="text-4xl md:text-5xl font-bold text-black mb-4 uppercase">
						Our Cafe Story
					</h2>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto">
						Discover the heart and soul behind Foreigner Cafe, where every
						detail tells a story.
					</p>
				</div>

				<div className="space-y-20">
					{storyElements.map((story, index) => (
						<div
							key={story.id}
							className={`flex flex-col lg:flex-row items-center gap-12 transition-all duration-1000 ${
								story.layout === "left" ? "lg:flex-row-reverse" : ""
							} ${
								isVisible
									? "opacity-100 translate-y-0"
									: "opacity-0 translate-y-10"
							}`}
							style={{ transitionDelay: `${index * 200}ms` }}>
							{/* Media Block */}
							<div className="w-full lg:w-1/2 relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200">
								{story.media.type === "image" && (
									<Link
										href={story.media.linkHref || "#"}
										className="block group">
										<Image
											src={story.media.src || "/placeholder.svg"}
											alt={story.media.alt}
											width={0} // Required prop but overridden by className
											height={0} // Required prop but overridden by className
											sizes="100vw"
											className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
											style={{
												objectFit: "cover", // Ensures identical behavior to object-cover
											}}
										
										/>
										<div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
											<span className="text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity">
												{story.media.alt}
											</span>
										</div>
									</Link>
								)}
								{story.media.type === "video" && (
									<div className="relative w-full h-80 overflow-hidden">
										<video
											src={story.media.src}
											className="w-full h-full object-cover"
											autoPlay
											loop
											muted
											playsInline
											aria-label={story.media.alt}
										/>
										<div className="absolute inset-0 bg-black/30 flex items-center justify-center">
											<span className="text-white text-lg font-bold">
												{story.media.alt}
											</span>
										</div>
									</div>
								)}
							</div>

							{/* Text Block */}
							<div className="w-full lg:w-1/2 bg-gray-50 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200">
								<h3 className="text-3xl font-bold text-black mb-4">
									{story.title}
								</h3>
								<p className="text-lg text-gray-700 leading-relaxed">
									{story.text}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
