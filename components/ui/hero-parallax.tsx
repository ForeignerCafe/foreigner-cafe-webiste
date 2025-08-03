"use client"
import { useState, useRef, useEffect } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import axiosInstance from "@/lib/axios"
import Image from "next/image"

interface Product {
  id: number
  title: string
  link: string
  thumbnail: string
}

interface HeroParallaxData {
  products: Product[]
  rowConfiguration: {
    firstRowCount: number
    secondRowCount: number
    thirdRowCount: number
  }
}

export const HeroParallax = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isAutoScrolling, setIsAutoScrolling] = useState(false)
  const [heroParallaxData, setHeroParallaxData] = useState<HeroParallaxData>({
    products: [],
    rowConfiguration: {
      firstRowCount: 8,
      secondRowCount: 8,
      thirdRowCount: 9,
    },
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchHeroParallaxData()
  }, [])

  const fetchHeroParallaxData = async () => {
    try {
      setIsLoading(true)
      const response = await axiosInstance.get("/api/cms/hero-parallax")
      if (response.data.success) {
        setHeroParallaxData(response.data.data)
      }
    } catch (error) {
      console.error("Failed to fetch hero parallax data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  // Parallax effect always enabled
  const translateX1 = useTransform(scrollYProgress, [0, 1], [0, -250]) // Moves left
  const translateX2 = useTransform(scrollYProgress, [0, 1], [0, 500]) // Moves right
  const translateX3 = useTransform(scrollYProgress, [0, 1], [0, -500]) // Moves left

  // Auto-scroll to next section when reaching the end
  const nextSectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      if (latest > 0.95 && !isAutoScrolling) {
        setIsAutoScrolling(true)
        nextSectionRef.current?.scrollIntoView({ behavior: "smooth" })

        // Reset auto-scrolling flag after animation completes
        setTimeout(() => {
          setIsAutoScrolling(false)
        }, 1000)
      }
    })

    return () => unsubscribe()
  }, [scrollYProgress, isAutoScrolling])

  if (isLoading) {
    return (
      <div className="max-h-[500vh] overflow-hidden antialiased relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-10">
          {/* Loading skeleton for three rows */}
          {[1, 2, 3].map((row) => (
            <div key={row} className="flex mb-10 space-x-8 justify-center">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-64 sm:h-96 w-48 sm:w-[30rem] bg-gray-200 animate-pulse rounded-xl shrink-0" />
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Split products based on row configuration
  const { firstRowCount, secondRowCount, thirdRowCount } = heroParallaxData.rowConfiguration
  const firstRow = heroParallaxData.products.slice(0, firstRowCount)
  const secondRow = heroParallaxData.products.slice(firstRowCount, firstRowCount + secondRowCount)
  const thirdRow = heroParallaxData.products.slice(
    firstRowCount + secondRowCount,
    firstRowCount + secondRowCount + thirdRowCount,
  )

  return (
    <>
      <div
        ref={containerRef}
        className="max-h-[500vh] overflow-hidden antialiased relative mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="mt-10">
          {/* First Row */}
          {firstRow.length > 0 && (
            <motion.div style={{ x: translateX1 }} className="flex mb-10 space-x-8 justify-center">
              {firstRow.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          )}

          {/* Second Row */}
          {secondRow.length > 0 && (
            <motion.div style={{ x: translateX2 }} className="flex mb-10 space-x-8 justify-center">
              {secondRow.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          )}

          {/* Third Row */}
          {thirdRow.length > 0 && (
            <motion.div style={{ x: translateX3 }} className="flex space-x-8 justify-center">
              {thirdRow.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Next section reference */}
      <div ref={nextSectionRef} />
    </>
  )
}

const ProductCard = ({
  product,
}: {
  product: {
    title: string
    link: string
    thumbnail: string
  }
}) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="group h-64 sm:h-96 w-48 sm:w-[30rem] relative shrink-0 rounded-xl overflow-hidden"
    >
      <a href={product.link} className="block h-full w-full">
        <Image
          src={product.thumbnail || "/placeholder.svg"}
          fill
          sizes="(max-width: 768px) 100vw, 30rem"
          className="object-cover object-left-top transition-transform duration-500 group-hover:scale-105"
          alt={product.title}
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
        <h2 className="absolute bottom-4 left-4 text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {product.title}
        </h2>
      </a>
    </motion.div>
  )
}
