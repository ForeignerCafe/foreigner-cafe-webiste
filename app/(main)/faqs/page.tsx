"use client";
import { Button } from "@/components/ui/button";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";

export default function Component() {
	const faqs = [
		{
			question: "What types of events can I host at Foreigner Cafe?",
			answer:
				"Foreigner Cafe is the perfect setting for a wide range of events. From intimate birthday gatherings and baby showers, to elegant bridal events, corporate meetings, and versatile spaces can be tailored to suit your occasion.",
		},
		{
			question: "Do you deliver catering orders?",
			answer:
				"Yes, we offer catering services for various events. Please contact us directly to discuss your specific needs and delivery options.",
		},
		{
			question: "What's your cancellation policy for bookings or events?",
			answer:
				"Our cancellation policy varies depending on the type and size of the booking. We recommend reviewing the terms and conditions provided during the booking process or contacting our team for detailed information.",
		},
		{
			question: "How far in advance should I place a catering order?",
			answer:
				"To ensure the best service and availability, we recommend placing catering orders at least 48-72 hours in advance. For larger events, more notice may be required.",
		},
	];

	 const scrollToSection = (sectionId: string) => {
		const element = document.getElementById(sectionId);
		if (element) {
			element.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	};

	return (
		<main className="flex flex-col min-h-screen">
			{/* Hero Section */}
			<section className="relative h-[600px] md:h-[700px] lg:h-[800px] flex items-center justify-center text-center text-white overflow-hidden">
				<Image
					src="/images/faqs.webp"
					alt="People gathering under string lights"
					fill
					className="object-cover"
					priority
				/>
				<div className="absolute inset-0 bg-black/50" aria-hidden="true"></div>{" "}
				{/* Dark overlay */}
				<div className="relative z-10 px-4 max-w-4xl mx-auto space-y-6">
					<h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-8 mt-24">
						Got Questions? We’re Here to Help.
					</h1>
					<p className="text-base md:text-lg lg:text-xl max-w-2xl mx-auto pb-6">
						From planning your perfect event to finding the right cake we’ve
						gathered the answers to your most asked questions, all in one place.
					</p>
					<Button
						  onClick={() => scrollToSection("faq")}
						className="hover:scale-110  bg-[#EC4E20] hover:bg-[#f97316] hover:text-black text-white px-8 py-3 text-lg   ">
						Learn More
					</Button>
				</div>
			</section>

			{/* FAQs Section */}
			<section
				id="faq"
				className="w-full py-12 md:py-20 lg:py-24 bg-white">
                <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                    <div className="text-center mb-10 md:mb-12">
                        <h2 className="text-5xl font-bold text-black mb-4">FAQS</h2>
                        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
                            We&apos;ve compiled the most common queries about our cafe,
                            catering, and experiences to make things easier for you.
                        </p>
                    </div>
                    
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                            <AccordionItem
                                key={index}
                                value={`item-${index + 1}`}
                                className="border-b border-gray-200 last:border-b-0 py-4"
                            >
                                <AccordionTrigger className="flex justify-between items-center w-full text-left text-lg md:text-xl font-medium text-gray-800 hover:no-underline hover:text-[#EC4E20] focus:no-underline focus:ring-0 focus:outline-none transition-colors duration-200">
                                    <span className="flex items-center gap-2">
                                        <span className="text-gray-500 text-base md:text-lg">
                                            {index + 1}.
                                        </span>
                                        {faq.question}
                                    </span>
                                    
                                </AccordionTrigger>
                                <AccordionContent className="pt-4 pb-2 text-gray-600 text-base md:text-md leading-relaxed pl-6">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>
		</main>
	);
}
