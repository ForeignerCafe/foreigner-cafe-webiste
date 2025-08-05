"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2, Save, Loader2, Edit, Eye } from "lucide-react"
import toast from "react-hot-toast"
import axiosInstance from "@/lib/axios"
import { TableSkeleton } from "@/components/ui/skeleton-components"
import Image from "next/image"

interface Category {
  _id: string
  name: string
  slug: string
}

interface Product {
  _id: string
  name: string
  description: string
  price: number
  category: Category
  image: string
  inStock: boolean
  featured: boolean
  slug: string
  createdAt: string
  updatedAt: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    image: "",
    inStock: true,
    featured: false,
  })

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  const fetchProducts = async () => {
    try {
      setInitialLoading(true)
      const response = await axiosInstance.get("/api/products")
      if (response.data.success) {
        setProducts(response.data.data)
      }
    } catch (error) {
      toast.error("Failed to fetch products")
    } finally {
      setInitialLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("/api/categories")
      if (response.data.success) {
        setCategories(response.data.data)
      }
    } catch (error) {
      toast.error("Failed to fetch categories")
    }
  }

  const handleCreateProduct = async () => {
    if (!newProduct.name.trim() || !newProduct.category) {
      toast.error("Product name and category are required")
      return
    }

    setLoading(true)
    try {
      const response = await axiosInstance.post("/api/products", newProduct)
      if (response.data.success) {
        toast.success("Product created successfully!")
        setNewProduct({
          name: "",
          description: "",
          price: 0,
          category: "",
          image: "",
          inStock: true,
          featured: false,
        })
        fetchProducts()
      } else {
        toast.error("Failed to create product")
      }
    } catch (error) {
      toast.error("Failed to create product")
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateProduct = async () => {
    if (!editingProduct) return

    setLoading(true)
    try {
      const response = await axiosInstance.put(`/api/products/${editingProduct._id}`, {
        name: editingProduct.name,
        description: editingProduct.description,
        price: editingProduct.price,
        category: editingProduct.category._id,
        image: editingProduct.image,
        inStock: editingProduct.inStock,
        featured: editingProduct.featured,
      })
      if (response.data.success) {
        toast.success("Product updated successfully!")
        setEditingProduct(null)
        fetchProducts()
      } else {
        toast.error("Failed to update product")
      }
    } catch (error) {
      toast.error("Failed to update product")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return

    setLoading(true)
    try {
      const response = await axiosInstance.delete(`/api/products/${id}`)
      if (response.data.success) {
        toast.success("Product deleted successfully!")
        fetchProducts()
      } else {
        toast.error("Failed to delete product")
      }
    } catch (error) {
      toast.error("Failed to delete product")
    } finally {
      setLoading(false)
    }
  }

  if (initialLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="h-8 bg-gray-200 rounded w-48 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-96 animate-pulse"></div>
        </div>
        <TableSkeleton rows={6} columns={5} />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Products Management</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Manage your shop products and inventory</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Create/Edit Product Form */}
        <Card className="xl:col-span-1">
          <CardHeader>
            <CardTitle>{editingProduct ? "Edit Product" : "Create New Product"}</CardTitle>
            <CardDescription>
              {editingProduct ? "Update product information" : "Add a new product to your shop"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="product-name">Product Name</Label>
              <Input
                id="product-name"
                value={editingProduct ? editingProduct.name : newProduct.name}
                onChange={(e) => {
                  if (editingProduct) {
                    setEditingProduct({ ...editingProduct, name: e.target.value })
                  } else {
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                }}
                placeholder="Enter product name"
              />
            </div>
            <div>
              <Label htmlFor="product-description">Description</Label>
              <Textarea
                id="product-description"
                value={editingProduct ? editingProduct.description : newProduct.description}
                onChange={(e) => {
                  if (editingProduct) {
                    setEditingProduct({ ...editingProduct, description: e.target.value })
                  } else {
                    setNewProduct({ ...newProduct, description: e.target.value })
                  }
                }}
                placeholder="Enter product description"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="product-price">Price ($)</Label>
              <Input
                id="product-price"
                type="number"
                step="0.01"
                value={editingProduct ? editingProduct.price : newProduct.price}
                onChange={(e) => {
                  const price = Number.parseFloat(e.target.value) || 0
                  if (editingProduct) {
                    setEditingProduct({ ...editingProduct, price })
                  } else {
                    setNewProduct({ ...newProduct, price })
                  }
                }}
                placeholder="0.00"
              />
            </div>
            <div>
              <Label htmlFor="product-category">Category</Label>
              <Select
                value={editingProduct ? editingProduct.category._id : newProduct.category}
                onValueChange={(value) => {
                  if (editingProduct) {
                    const category = categories.find((c) => c._id === value)
                    if (category) {
                      setEditingProduct({ ...editingProduct, category })
                    }
                  } else {
                    setNewProduct({ ...newProduct, category: value })
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category._id} value={category._id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="product-image">Image URL</Label>
              <Input
                id="product-image"
                value={editingProduct ? editingProduct.image : newProduct.image}
                onChange={(e) => {
                  if (editingProduct) {
                    setEditingProduct({ ...editingProduct, image: e.target.value })
                  } else {
                    setNewProduct({ ...newProduct, image: e.target.value })
                  }
                }}
                placeholder="Enter image URL"
              />
            </div>
            <div className="flex gap-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="in-stock"
                  checked={editingProduct ? editingProduct.inStock : newProduct.inStock}
                  onChange={(e) => {
                    if (editingProduct) {
                      setEditingProduct({ ...editingProduct, inStock: e.target.checked })
                    } else {
                      setNewProduct({ ...newProduct, inStock: e.target.checked })
                    }
                  }}
                />
                <Label htmlFor="in-stock">In Stock</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={editingProduct ? editingProduct.featured : newProduct.featured}
                  onChange={(e) => {
                    if (editingProduct) {
                      setEditingProduct({ ...editingProduct, featured: e.target.checked })
                    } else {
                      setNewProduct({ ...newProduct, featured: e.target.checked })
                    }
                  }}
                />
                <Label htmlFor="featured">Featured</Label>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={editingProduct ? handleUpdateProduct : handleCreateProduct}
                disabled={loading}
                className="flex-1"
              >
                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                {editingProduct ? "Update Product" : "Create Product"}
              </Button>
              {editingProduct && (
                <Button variant="outline" onClick={() => setEditingProduct(null)}>
                  Cancel
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Products List */}
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Existing Products ({products.length})</CardTitle>
            <CardDescription>Manage your existing products</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {products.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No products found. Create your first product!</p>
                </div>
              ) : (
                products.map((product) => (
                  <div key={product._id} className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        {product.image ? (
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            width={80}
                            height={80}
                            className="rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                            <Eye className="w-8 h-8 text-gray-400" />
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="flex-grow">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-lg">{product.name}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Category: {product.category.name}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Slug: {product.slug}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-green-600">${product.price.toFixed(2)}</p>
                            <div className="flex gap-1 mt-1">
                              {product.inStock && (
                                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">In Stock</span>
                              )}
                              {product.featured && (
                                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Featured</span>
                              )}
                              {!product.inStock && (
                                <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">Out of Stock</span>
                              )}
                            </div>
                          </div>
                        </div>
                        {product.description && (
                          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 line-clamp-2">
                            {product.description}
                          </p>
                        )}
                        <div className="flex justify-between items-center">
                          <div className="text-xs text-gray-500">
                            Created: {new Date(product.createdAt).toLocaleDateString()}
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setEditingProduct(product)}
                              disabled={loading}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteProduct(product._id)}
                              disabled={loading}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
