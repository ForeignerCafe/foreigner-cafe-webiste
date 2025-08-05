"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Loader2, X, ImageIcon } from "lucide-react"
import toast from "react-hot-toast"
import axiosInstance from "@/lib/axios"
import Image from "next/image"
import { DeleteConfirmationModal } from "@/components/dashboard/delete-confirmation-modal"
import { Skeleton } from "@/components/ui/skeleton"

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
  isActive: boolean
  createdAt: string
}

const ProductsPageSkeleton = () => (
  <div className="p-6 space-y-6">
    <div className="flex justify-between items-center">
      <div>
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-4 w-32" />
      </div>
      <Skeleton className="h-10 w-32" />
    </div>

    <Card className="mb-16">
      <CardHeader>
        <Skeleton className="h-6 w-32" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-7 gap-4">
            {[...Array(7)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
          {[...Array(5)].map((_, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-7 gap-4">
              {[...Array(7)].map((_, colIndex) => (
                <Skeleton key={colIndex} className="h-16 w-full" />
              ))}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
)

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    images: [""],
  })
  const [submitting, setSubmitting] = useState(false)

  // Delete confirmation modal states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<Product | null>(null)

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get("/api/products")
      if (response.data.success) {
        setProducts(response.data.data)
      }
    } catch (error) {
      toast.error("Failed to fetch products")
    } finally {
      setLoading(false)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim() || !formData.description.trim() || !formData.price || !formData.category) {
      toast.error("Please fill in all required fields")
      return
    }

    const validImages = formData.images.filter((img) => img.trim() !== "")
    if (validImages.length === 0) {
      toast.error("At least one image URL is required")
      return
    }

    setSubmitting(true)
    try {
      const productData = {
        ...formData,
        images: validImages,
        price: Number.parseFloat(formData.price),
        stock: Number.parseInt(formData.stock) || 0,
      }

      if (editingProduct) {
        const response = await axiosInstance.put(`/api/products/${editingProduct._id}`, productData)
        if (response.data.success) {
          toast.success("Product updated successfully")
          fetchProducts()
        }
      } else {
        const response = await axiosInstance.post("/api/products", productData)
        if (response.data.success) {
          toast.success("Product created successfully")
          fetchProducts()
        }
      }
      handleCloseDialog()
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to save product")
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      title: product.title,
      description: product.description,
      price: product.price.toString(),
      stock: product.stock.toString(),
      category: product.category._id,
      images: product.images.length > 0 ? product.images : [""],
    })
    setIsDialogOpen(true)
  }

  // Open delete modal
  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product)
    setIsDeleteModalOpen(true)
  }

  // Confirm delete action
  const confirmDelete = async () => {
    if (!productToDelete) return
    const toastId = toast.loading("Deleting product...")
    try {
      const response = await axiosInstance.delete(`/api/products/${productToDelete._id}`)
      if (response.data.success) {
        toast.success("Product deleted successfully", {
          id: toastId,
        })
        fetchProducts()
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete product")
    } finally {
      setIsDeleteModalOpen(false)
      setProductToDelete(null)
    }
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setEditingProduct(null)
    setFormData({
      title: "",
      description: "",
      price: "",
      stock: "",
      category: "",
      images: [""],
    })
  }

  const addImageField = () => {
    setFormData({ ...formData, images: [...formData.images, ""] })
  }

  const removeImageField = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index)
    setFormData({ ...formData, images: newImages.length > 0 ? newImages : [""] })
  }

  const updateImageField = (index: number, value: string) => {
    const newImages = [...formData.images]
    newImages[index] = value
    setFormData({ ...formData, images: newImages })
  }

  if (loading) {
    return <ProductsPageSkeleton />
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Products</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your products</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orange-500 hover:bg-orange-600">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Product Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter product title"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
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
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter product description"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="0.00"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="stock">Stock Quantity</Label>
                  <Input
                    id="stock"
                    type="number"
                    min="0"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <Label>Product Images *</Label>
                <div className="space-y-2">
                  {formData.images.map((image, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={image}
                        onChange={(e) => updateImageField(index, e.target.value)}
                        placeholder="Enter image URL"
                        className="flex-1"
                      />
                      {formData.images.length > 1 && (
                        <Button type="button" variant="outline" size="sm" onClick={() => removeImageField(index)}>
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addImageField}
                    className="w-full bg-transparent"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Another Image
                  </Button>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={handleCloseDialog}>
                  Cancel
                </Button>
                <Button type="submit" disabled={submitting} className="bg-orange-500 hover:bg-orange-600">
                  {submitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  {editingProduct ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="mb-16">
        <CardHeader>
          <CardTitle>All Products</CardTitle>
        </CardHeader>
        <CardContent>
          {products.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No products found. Create your first product!</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>
                      {product.images[0] ? (
                        <Image
                          src={product.images[0] || "/placeholder.svg"}
                          alt={product.title}
                          width={50}
                          height={50}
                          className="rounded-md object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center">
                          <ImageIcon className="h-6 w-6 text-gray-400" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{product.title}</TableCell>
                    <TableCell>{product.category.name}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <Badge variant={product.isActive ? "default" : "secondary"}>
                        {product.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" onClick={() => handleEdit(product)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteClick(product)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Product"
        description={`Are you sure you want to delete "${productToDelete?.title}"? This action cannot be undone.`}
      />
    </div>
  )
}
