import Image from "next/image";
export default function InteriorSection() {
	return (
		<section id="gallery" className="bg-white">
			<div className="h-[600px] overflow-hidden">
				<Image
					src="/images/team.webp"
					alt="Foreigner Cafe interior with hanging plants and warm lighting"
					width={0} // Required but overridden by className
					height={0} // Required but overridden by className
					sizes="100vw"
					className="w-full h-full object-cover object-center hover:scale-110 transition-transform duration-700 cursor-pointer"
					style={{
						objectFit: "cover",
						objectPosition: "center",
					}}
					
				/>
			</div>
		</section>
	);
}
