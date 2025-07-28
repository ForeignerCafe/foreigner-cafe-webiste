"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, ShoppingCart, Search, Filter, SlidersHorizontal } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import toast from "react-hot-toast"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/contexts/cart-context"

interface Category {
  _id: string
  name: string
  slug: string
}

interface Product {
  _id: string
  title: string
  description: string
  price: number
  stock: number
  images: string[]
  category: Category
  slug: string
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)

  // Filter states
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("newest")
  const [priceRange, setPriceRange] = useState<string>("all")

  const { addToCart } = useCart()

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [products, searchTerm, selectedCategory, sortBy, priceRange])

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products")
      const data = await response.json()

      if (data.success) {
        setProducts(data.data)
      } else {
        toast.error("Failed to fetch products")
      }
    } catch (error) {
      toast.error("Failed to fetch products")
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories")
      const data = await response.json()

      if (data.success) {
        setCategories(data.data)
      }
    } catch (error) {
      console.error("Failed to fetch categories")
    }
  }

  const applyFilters = () => {
    let filtered = [...products]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category._id === selectedCategory)
    }

    // Price range filter
    if (priceRange !== "all") {
      switch (priceRange) {
        case "under-10":
          filtered = filtered.filter((product) => product.price < 10)
          break
        case "10-25":
          filtered = filtered.filter((product) => product.price >= 10 && product.price <= 25)
          break
        case "25-50":
          filtered = filtered.filter((product) => product.price >= 25 && product.price <= 50)
          break
        case "over-50":
          filtered = filtered.filter((product) => product.price > 50)
          break
      }
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "name":
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
      case "newest":
      default:
        // Keep original order (newest first from API)
        break
    }

    setFilteredProducts(filtered)
  }

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (product.stock <= 0) {
      toast.error("Product is out of stock")
      return
    }

    addToCart({
      id: product._id,
      title: product.title,
      price: product.price,
      image: product.images[0],
      stock: product.stock,
    })

    toast.success(`${product.title} added to cart!`)
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedCategory("all")
    setSortBy("newest")
    setPriceRange("all")
  }

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <label className="text-sm font-medium mb-2 block">Search Products</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <label className="text-sm font-medium mb-2 block">Category</label>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category._id} value={category._id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div>
        <label className="text-sm font-medium mb-2 block">Price Range</label>
        <Select value={priceRange} onValueChange={setPriceRange}>
          <SelectTrigger>
            <SelectValue placeholder="Select price range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Prices</SelectItem>
            <SelectItem value="under-10">Under $10</SelectItem>
            <SelectItem value="10-25">$10 - $25</SelectItem>
            <SelectItem value="25-50">$25 - $50</SelectItem>
            <SelectItem value="over-50">Over $50</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Sort */}
      <div>
        <label className="text-sm font-medium mb-2 block">Sort By</label>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="name">Name A-Z</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Clear Filters */}
      <Button variant="outline" onClick={clearFilters} className="w-full bg-transparent">
        Clear All Filters
      </Button>
    </div>
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black pt-20">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="relative h-[50vh] bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Shop</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
            Discover our carefully curated selection of premium products
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 md:py-20 px-4 max-w-7xl mx-auto">
        {/* Header with Filters */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <Card className="sticky top-6">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Filter className="h-5 w-5" />
                  <h3 className="text-lg font-semibold">Filters</h3>
                </div>
                <FilterContent />
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter Button & Results Count */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden bg-transparent">
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader>
                      <SheetTitle className="flex items-center gap-2">
                        <Filter className="h-5 w-5" />
                        Filters
                      </SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterContent />
                    </div>
                  </SheetContent>
                </Sheet>

                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""} found
                </p>
              </div>

              {/* Quick Sort (Mobile) */}
              <div className="lg:hidden">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="price-low">Price ↑</SelectItem>
                    <SelectItem value="price-high">Price ↓</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <ShoppingCart className="h-20 w-20 text-gray-400 mx-auto mb-6" />
                <h3 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
                  {products.length === 0 ? "No Products Available" : "No Products Found"}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">
                  {products.length === 0
                    ? "Check back soon for new products!"
                    : "Try adjusting your filters to find what you're looking for."}
                </p>
                {products.length > 0 && (
                  <Button variant="outline" onClick={clearFilters} size="lg">
                    Clear Filters
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <Link key={product._id} href={`/shop/${product.slug}`}>
                    <Card
                      className="group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-gray-200 dark:border-gray-800 h-full overflow-hidden"
                      onMouseEnter={() => setHoveredProduct(product._id)}
                      onMouseLeave={() => setHoveredProduct(null)}
                    >
                      <CardContent className="p-0 h-full flex flex-col">
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image
                            src={
                              hoveredProduct === product._id && product.images[1]
                                ? product.images[1]
                                : product.images[0] || "/placeholder.svg?height=400&width=400"
                            }
                            alt={product.title}
                            fill
                            className="object-cover transition-all duration-500 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          {product.stock <= 0 && (
                            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                              <Badge variant="destructive" className="text-white text-lg px-4 py-2">
                                Out of Stock
                              </Badge>
                            </div>
                          )}
                          <div className="absolute top-4 left-4">
                            <Badge variant="secondary" className="bg-white/95 text-gray-900 text-sm px-3 py-1">
                              {product.category.name}
                            </Badge>
                          </div>
                          <button
                            onClick={(e) => handleAddToCart(product, e)}
                            disabled={product.stock <= 0}
                            className="absolute bottom-4 right-4 bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-110"
                          >
                            <ShoppingCart className="h-5 w-5" />
                          </button>
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                          <h3 className="font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 text-xl leading-tight">
                            {product.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3 flex-1 leading-relaxed">
                            {product.description}
                          </p>
                          <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                            <span className="text-3xl font-bold text-orange-500">${product.price.toFixed(2)}</span>
                            <span className="text-sm text-gray-500 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                              {product.stock} in stock
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
