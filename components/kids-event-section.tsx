import Link from "next/link";
import Image from "next/image";

const events = [
  {
    id: 1,
    type: "large",
    imageSrc: "/images/uniCorn.webp",
    title: "MAGICAL UNICORN SHOW",
    description:
      "These school holidays, embark on a fairytale adventure at The Grounds, where unicorns roam and magic is real!",
    // linkText: "Visit Magical Unicorn Show",
    // linkHref: "#",
  },
  {
    id: 2,
    type: "large",
    imageSrc: "/images/kids.webp",
    title: "KIDS' FLORAL CROWN WORKSHOP",
    description:
      "Let their creativity bloom at The Grounds these school holidays, crafting a beautiful flower crown to wear and take home!",
    // linkText: "Visit Kids' Floral Crown Workshop",
    // linkHref: "#",
  },
  {
    id: 3,
    type: "small",
    imageSrc: "/images/playingKids.webp",
    title: "KIDS' LEGO® WORKSHOP",
    // linkText: "Visit Kids' Lego Workshop",
    // linkHref: "#",
  },
  {
    id: 4,
    type: "small",
    imageSrc: "/images/cookieSession.webp",
    title: "KIDS' COOKIE DECORATING WORKSHOP",
    // linkText: "Visit Kids' Cookie Decorating Workshop",
    // linkHref: "#",
  },
  {
    id: 5,
    type: "small",
    imageSrc: "/images/playGround.webp",
    title: "KIDS' INFLATABLE PLAYGROUND",
//     linkText: "Visit Kids' Inflatable Playground",
//     linkHref: "#",
  },
];

export default function KidsEventsSection() {
  return (
    <section className="bg-white py-12 lg:py-20 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Matches the style from the image, but uses project's branding */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-black">
            WHAT'S ON
          </h2>
          {/* The "BOOK TABLE" button is part of the Navigation component, not this section */}
        </div>

				{/* Top Row: Large Event Cards with specific desktop widths */}
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
					{events
						.filter((event) => event.type === "large")
						.map((event, index) => (
							<div
								key={event.id}
								className={`group ${
									index === 0 ? "lg:col-span-5" : "lg:col-span-7"
								}`}>
								<div className="overflow-hidden mb-6">
									<Image
										src={event.imageSrc || "/placeholder.svg"}
										alt={event.title}
										width={0} // Required but overridden by className
										height={0} // Required but overridden by className
										sizes="100vw"
										className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
										style={{
											objectFit: "cover", // Ensures object-cover works consistently
										}}
									
									/>
								</div>
								<h3 className="text-xl font-bold text-black mb-3">
									{event.title}
								</h3>
								<p className="text-sm text-gray-700 leading-relaxed mb-4">
									{event.description}
								</p>
								{/* <Link
									href={event.linkHref}
									className="text-sm text-cafeGreen font-medium hover:text-orange transition-colors duration-200 hover:underline">
									{event.linkText}
								</Link> */}
							</div>
						))}
				</div>

				{/* Bottom Row: Small Event Cards with Overlay */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{events
						.filter((event) => event.type === "small")
						.map((event) => (
							<div
								key={event.id}
								className="group relative overflow-hidden rounded-lg">
								<Image
									src={event.imageSrc || "/placeholder.svg"}
									alt={event.title}
									width={800} // You should adjust this to match your actual image width
									height={256} // Matches h-64 (64 * 4 = 256) since Next.js uses pixels
									className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
									style={{
										maxWidth: "100%",
										height: "auto",
									}}
								/>
								<div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
									<h3 className="text-lg font-bold text-white">
										{event.title}
									</h3>
								</div>
								{/* Optional: Add a hidden link for accessibility or hover effect */}
								{/* <Link
									href={event.linkHref}
									className="absolute inset-0 z-10"
									aria-label={event.linkText}
								/> */}
							</div>
						))}
				</div>
			</div>
		</section>
	);
}
