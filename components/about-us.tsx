import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function AboutUs() {
  return (
    <section className="w-full bg-white">
      <div className="container px-4 md:px-6">
        {/* Heading and Sub-text */}
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl text-black font-bold tracking-tighter">
            ABOUT US
          </h2>
          <p className="max-w-[700px] text-gray-600 text-lg sm:text-md dark:text-gray-400">
            At Foreigner, we&apos;ve created more than a cafe we&apos;ve built a
            space where presence matters, stories unfold, and strangers become
            familiar.
          </p>
        </div>

        {/* Main content grid with relative positioning for the connector */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_2fr] gap-6 md:gap-8 lg:gap-16 items-center pt-8 md:pt-14 mx-4 sm:mx-8 md:m-12">
          {/* Left Image Column */}
          <div className="flex justify-center md:justify-end h-[20rem] sm:h-[25rem] md:h-[30rem] lg:h-[35rem]">
            <Image
              src="/images/first.webp"
              width={400}
              height={600}
              alt="Cafe Interior"
              className="object-cover h-auto rounded-lg w-full max-w-[20rem] sm:max-w-[25rem] lg:w-[25rem]"
              priority
            />
          </div>

          {/* Right Content Column (contains middle and right sections) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* Middle Section */}
            <div className="flex flex-col items-start space-y-3 sm:space-y-4">
              <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm md:text-base">
                At Foreigner Cafe, we&apos;re redefining what it means to visit
                a café. It&apos;s a space designed to slow down, gather, and
                connect.
              </p>

              <Image
                src="/images/mid.webp"
                width={100}
                height={100}
                alt="People at Cafe"
                className="object-cover rounded-lg h-[15rem] sm:h-[20rem] md:h-[25rem] lg:h-[30rem] w-full max-w-[15rem] sm:max-w-[20rem] lg:w-[20rem] pt-4 sm:pt-8 md:pt-[5rem]"
              />
            </div>

            {/* Right Section */}
            <div className="flex flex-col items-start space-y-2 sm:space-y-3 mt-0 sm:mt-[1rem]">
              <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm md:text-base">
                We believe in the power of human connection through craft and
                community. Foreigner Cafe is where strangers become regulars,
                and every visit becomes a story.
              </p>
              <Button className=" uppercase border border-[#EC4E20] bg-transparent text-[#EC4E20] hover:bg-[#f97316] hover:text-black hover:scale-110 text-xs sm:text-sm">
                Explore Now
              </Button>
              <Image
                src="/images/end.webp"
                width={600}
                height={400}
                alt="People at Table"
                className="object-cover rounded-lg h-[15rem] sm:h-[20rem] md:h-[25.25rem] w-full max-w-[15rem] sm:max-w-[18rem] lg:w-[18rem] pt-2 sm:pt-4 md:pt-[2rem]"
              />
            </div>
          </div>

          {/* Horizontal segment 1 (from right of left image) */}
          {/* <div
            className="hidden lg:block absolute bg-orange-500 h-[2px] z-9999"
            style={{
              top: "155px", // Estimated vertical position relative to the grid container's top
              left: "384px", // Estimated horizontal start, aligned with the right edge of the left image
              width: "170px", // Length of this horizontal segment
            }}></div> */}

          {/* Vertical segment */}
          {/* <div
            className="hidden lg:block absolute bg-orange-500 w-[2px] z-10"
            style={{
              top: "156px", // Starts at the same vertical position as horizontal line 1
              left: "552px", // Ends at the right of horizontal line 1
              height: "60px", // Length of the vertical segment
            }}></div> */}

          {/* Horizontal segment 2 (to top-left of middle image) */}
          {/* <div
            className="hidden lg:block absolute bg-orange-500 h-[2px] z-10"
            style={{
              top: "250px", // Ends at the bottom of the vertical line, aligning with the top of the middle image
              left: "767px", // Starts at the left of the vertical line
              width: "150px", // Length of this horizontal segment
            }}></div> */}

          {/* Vertical segment */}
          {/* <div
            className="hidden lg:block absolute bg-orange-500 w-[2px] z-10"
            style={{
              top: "250px", // Starts at the same vertical position as horizontal line 1
              left: "915px", // Ends at the right of horizontal line 1
              height: "56px", // Length of the vertical segment
            }}></div> */}
        </div>
      </div>
    </section>
  );
}
