// components/EventsPageSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton"

export default function EventsPageSkeleton() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      {/* Hero Section Skeleton */}
      <section className="relative w-full min-h-screen overflow-hidden">
        <Skeleton className="absolute inset-0 w-full h-full" />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-4 mt-0 pt-0 sm:mt-[2rem] sm:pt-[2rem] md:mt-[4rem] md:pt-[3rem]">
          <Skeleton className="h-12 w-3/4 max-w-4xl mb-4" />
          <Skeleton className="h-6 w-1/2 max-w-2xl" />
          <Skeleton className="h-12 w-32 mt-8" />
        </div>
      </section>

      {/* Carousel Section Skeleton */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2">
              <Skeleton className="h-8 w-1/4 mb-4" />
              <Skeleton className="h-10 w-3/4 mb-4" />
              <Skeleton className="h-24 w-full" />
            </div>
            <div className="w-full md:w-1/2 flex flex-col gap-4">
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-6 w-1/3" />
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections Skeleton */}
      <section className="bg-white">
        <div className="container mx-auto px-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
              <div className={item % 2 === 0 ? "order-1" : "order-2"}>
                <Skeleton className="h-4 w-1/4 mb-4" />
                <Skeleton className="h-8 w-3/4 mb-4" />
                <Skeleton className="h-24 w-full" />
              </div>
              <div className={item % 2 === 0 ? "order-2" : "order-1"}>
                <Skeleton className="h-96 w-full" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Event Spaces Section Skeleton */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <Skeleton className="h-10 w-1/4 mx-auto mb-4" />
            <Skeleton className="h-6 w-1/2 mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-4 mx-4 sm:mx-8 md:mx-16 lg:mx-[8rem]">
            {[1, 2, 3, 4].map((space) => (
              <div key={space} className="overflow-hidden shadow-lg">
                <Skeleton className="w-full h-64" />
                <div className="p-7">
                  <Skeleton className="h-6 w-1/2 mx-auto mb-4" />
                  <Skeleton className="h-16 w-full mb-4" />
                  <Skeleton className="h-10 w-24 mx-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
