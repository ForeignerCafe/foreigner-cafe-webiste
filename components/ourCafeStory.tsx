import Image from "next/image";

export default function OurCafeStory() {
	return (
		<section className="w-full pt-[4rem] bg-white">
			<div className="container px-4 md:px-6">
				{/* Global Heading */}
				<div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 md:mb-16">
					<h2 className="text-3xl md:text-4xl font-bold text-black">
						OUR CAFE STORY
					</h2>
					<p className="mt-[1rem] text-gray-600 text-md mx-auto max-w-[80%] md:max-w-none">
						A place where people, stories, and stillness meet and every detail
						invites you to stay a little longer
					</p>
				</div>

				{/* Section 1: Our Humble Beginning */}
				<div className="relative mb-16 md:mb-24 mx-4 md:m-[10rem] mt-6">
					<div className="grid md:grid-cols-1 gap-8 justify-between">
						<div className="space-y-4">
							<h3 className="text-2xl font-bold tracking-tighter sm:text-3xl">
								OUR HUMBLE BEGINING
							</h3>
							<p className="text-gray-500 md:text-lg/relaxed dark:text-gray-400 text-wrap md:mr-[20rem]">
								Foreigner Cafe began as a dream to create a space where
								community and craft coffee intersect. Our industrial-modern
								aesthetic was inspired by art, rooted in Founder and Director,
								Emily Chen's cherished Sunday afternoons with her Nonna's
								cooking. Here, you can taste world-class coffee and food in a
								space that feels like home
							</p>
						</div>
						<div className="relative mt-8 md:mt-0">
							<Image
								src="/images/interior.webp"
								width={500}
								height={300}
								alt="Cafe Interior"
								className="rounded-[0.5rem] object-cover w-full inset-0 bg-black/50 h-[20rem] md:h-[30rem]"
							/>
							<Image
								src="/images/1lil.webp"
								width={150}
								height={150}
								alt="People at Cafe"
								className="absolute -top-20 right-4 md:-top-40 md:right-24 rounded-[0.5rem] object-cover shadow-lg h-[10rem] w-[8rem] md:h-[16rem] md:w-[12rem] bg-black/50"
							/>
						</div>
					</div>
					{/* Orange line bottom right */}
					<div className="absolute bottom-[-20px] right-[-20px] w-[180px] h-[160px] md:w-[280px] md:h-[240px] pointer-events-none">
						<div className="absolute bottom-0 right-0 w-[2px] h-full bg-orange-500"></div>
						<div className="absolute bottom-0 right-0 h-[2px] w-full bg-orange-500"></div>
					</div>
				</div>

				{/* Section 2: The Art of the Bean */}
				<div className="relative mb-16 md:mb-24 mx-4 md:m-[10rem] mt-6">
					{/* Orange line top left */}
					<div className="absolute top-[-20px] left-[-20px] w-[190px] h-[190px] md:w-[290px] md:h-[290px] pointer-events-none">
						<div className="absolute top-0 left-0 w-[2px] h-full bg-orange-500"></div>
						<div className="absolute top-0 left-0 h-[2px] w-full bg-orange-500"></div>
					</div>
					<div className="space-y-4">
						<h3 className="text-2xl font-bold tracking-tighter sm:text-3xl">
							The Art of the Bean
						</h3>
						<p className="text-gray-500 md:text-lg/relaxed dark:text-gray-400 text-wrap md:mr-[20rem]">
							Our coffee is sourced from the finest growers around the world,
							roasted in-house with passion. Our drinks combine exceptional
							craft coffee, from our signature espresso to exciting new menu
							items from around the globe. Grab a tasty breakfast from our
							selection of sandwiches, wraps, salads, and sweets.
						</p>
					</div>
					<div className="grid md:grid-cols-1 gap-8 items-center md:flex-row-reverse">
						<div className="relative mt-8 md:mt-0">
							<Image
								src="/images/2big.webp"
								width={500}
								height={300}
								alt="Cafe Interior"
								className="rounded-[0.5rem] object-cover w-full bg-black/100 h-[20rem] md:h-[30rem]"
							/>
							<Image
								src="/images/2lil.webp"
								width={150}
								height={150}
								alt="People at Cafe"
								className="absolute -top-20 right-4 md:-top-40 md:right-24 rounded-[0.5rem] object-cover shadow-lg h-[10rem] w-[8rem] md:h-[16rem] md:w-[12rem]"
							/>
						</div>
					</div>
				</div>

				{/* Section 3: A Place to Connect */}
				<div className="relative mb-16 md:mb-24 mx-4 md:m-[10rem] mt-6">
					<div className="grid md:grid-cols-1 gap-8 justify-between">
						<div className="space-y-4">
							<h3 className="text-2xl font-bold tracking-tighter sm:text-3xl">
								A Place to Connect
							</h3>
							<p className="text-gray-500 md:text-lg/relaxed dark:text-gray-400 text-wrap md:mr-[20rem]">
								Foreigner Cafe is more than just a place to grab a coffee; it's
								a hub where stories are shared, ideas are born, and friendships
								flourish. Our commitment to quality extends beyond our menu to
								the very fabric of our community. Join us for an experience that
								nourishes both body and soul.
							</p>
						</div>
						<div className="relative mt-8 md:mt-0">
							<Image
								src="/images/3big.webp"
								width={500}
								height={300}
								alt="Cafe Interior"
								className="rounded-[0.5rem] object-cover w-full h-[20rem] md:h-[30rem]"
							/>
							<Image
								src="/images/3lil.webp"
								width={150}
								height={150}
								alt="People at Cafe"
								className="absolute -top-20 right-4 md:-top-40 md:right-24 rounded-[0.5rem] object-cover shadow-lg h-[10rem] w-[8rem] md:h-[16rem] md:w-[12rem]"
							/>
						</div>
					</div>
					{/* Orange line bottom right */}
					<div className="absolute bottom-[-20px] right-[-20px] w-[180px] h-[160px] md:w-[280px] md:h-[240px] pointer-events-none">
						<div className="absolute bottom-0 right-0 w-[2px] h-full bg-orange-500"></div>
						<div className="absolute bottom-0 right-0 h-[2px] w-full bg-orange-500"></div>
					</div>
				</div>
			</div>
		</section>
	);
}
