import Link from "next/link";
import Image from "next/image";

const events = [
	{
		id: 1,
		imageSrc: "/images/workshop.webp",
		title: "CREATIVE WORKSHOPS",
		description:
			"These school holidays, embark on a fairytale adventure at The Grounds, where unicorns roam and magic is real!",
		linkText: "VISIT WORKSHOPS",
		linkHref: "#",
	},
	{
		id: 2,
		imageSrc: "/images/playGround.webp",
		title: "PLAYGROUND ACTIVITIES",
		description:
			"These school holidays, embark on a fairytale adventure at The Grounds, where unicorns roam and magic is real!",
		linkText: "VISIT PLAYGROUNDS",
		linkHref: "#",
	},
	{
		id: 3,
		imageSrc: "/images/uniCorn.webp",
		title: "MAGICAL UNICORN SHOW",
		description:
			"These school holidays, embark on a fairytale adventure at The Grounds, where unicorns roam and magic is real!",
		linkText: "VISIT SHOWS",
		linkHref: "#",
	},
];

export default function WhatsOn() {
	return (
		<section className="bg-white py-12 lg:py-12 ">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Header - Matches the style from the image */}
				<div className="text-center mb-12">
					<h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
						WHAT'S ON
					</h2>
					<p className="mx-auto max-w-2xl text-gray-700 text-lg">
						See what's on the calendar from school holidays to creative camps
						and playtime fun.
					</p>
				</div>

				{/* Event Cards Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{events.map((event) => (
						<div key={event.id} className="group">
							<div className="relative overflow-hidden rounded-3xl mb-6">
								<Image
									src={event.imageSrc || "/placeholder.svg"}
									alt={event.title}
									width={400} // Aspect ratio for placeholder
									height={300} // Aspect ratio for placeholder
									className="w-full rounded-3xl rounded-b-3xl h-[28rem] object-cover group-hover:scale-110 transition-transform duration-500"
								/>
								{/* Overlay for title */}
								<div className="absolute bottom-0 left-0 right-0 h-[4rem] bg-black/50 to-transparent flex items-center text-center justify-center p-4 ">
									<h3 className="text-lg  text-white uppercase">
										{event.title}
									</h3>
								</div>
							</div>
							{/* Description and Link below image */}
							<p className="text-sm text-gray-700 leading-relaxed mb-4">
								{event.description}
							</p>
							<Link
								href={event.linkHref}
								className="text-sm text-cafeGreen hover:text-orange transition-colors duration-200 font-semibold hover:underline uppercase tracking-wider">
								{event.linkText}
							</Link>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
