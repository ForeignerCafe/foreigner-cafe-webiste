"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Trash2, Save, Loader2, Edit } from "lucide-react"
import toast from "react-hot-toast"
import axiosInstance from "@/lib/axios"
import { TableSkeleton } from "@/components/ui/skeleton-components"

interface Category {
  _id: string
  name: string
  description: string
  slug: string
  createdAt: string
  updatedAt: string
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
  })

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      setInitialLoading(true)
      const response = await axiosInstance.get("/api/categories")
      if (response.data.success) {
        setCategories(response.data.data)
      }
    } catch (error) {
      toast.error("Failed to fetch categories")
    } finally {
      setInitialLoading(false)
    }
  }

  const handleCreateCategory = async () => {
    if (!newCategory.name.trim()) {
      toast.error("Category name is required")
      return
    }

    setLoading(true)
    try {
      const response = await axiosInstance.post("/api/categories", newCategory)
      if (response.data.success) {
        toast.success("Category created successfully!")
        setNewCategory({ name: "", description: "" })
        fetchCategories()
      } else {
        toast.error("Failed to create category")
      }
    } catch (error) {
      toast.error("Failed to create category")
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateCategory = async () => {
    if (!editingCategory) return

    setLoading(true)
    try {
      const response = await axiosInstance.put(`/api/categories/${editingCategory._id}`, {
        name: editingCategory.name,
        description: editingCategory.description,
      })
      if (response.data.success) {
        toast.success("Category updated successfully!")
        setEditingCategory(null)
        fetchCategories()
      } else {
        toast.error("Failed to update category")
      }
    } catch (error) {
      toast.error("Failed to update category")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteCategory = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return

    setLoading(true)
    try {
      const response = await axiosInstance.delete(`/api/categories/${id}`)
      if (response.data.success) {
        toast.success("Category deleted successfully!")
        fetchCategories()
      } else {
        toast.error("Failed to delete category")
      }
    } catch (error) {
      toast.error("Failed to delete category")
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
        <TableSkeleton rows={5} columns={4} />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Categories Management</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Manage product categories for your shop</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Create/Edit Category Form */}
        <Card>
          <CardHeader>
            <CardTitle>{editingCategory ? "Edit Category" : "Create New Category"}</CardTitle>
            <CardDescription>
              {editingCategory ? "Update category information" : "Add a new category to your shop"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="category-name">Category Name</Label>
              <Input
                id="category-name"
                value={editingCategory ? editingCategory.name : newCategory.name}
                onChange={(e) => {
                  if (editingCategory) {
                    setEditingCategory({ ...editingCategory, name: e.target.value })
                  } else {
                    setNewCategory({ ...newCategory, name: e.target.value })
                  }
                }}
                placeholder="Enter category name"
              />
            </div>
            <div>
              <Label htmlFor="category-description">Description</Label>
              <Textarea
                id="category-description"
                value={editingCategory ? editingCategory.description : newCategory.description}
                onChange={(e) => {
                  if (editingCategory) {
                    setEditingCategory({ ...editingCategory, description: e.target.value })
                  } else {
                    setNewCategory({ ...newCategory, description: e.target.value })
                  }
                }}
                placeholder="Enter category description"
                rows={3}
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={editingCategory ? handleUpdateCategory : handleCreateCategory}
                disabled={loading}
                className="flex-1"
              >
                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                {editingCategory ? "Update Category" : "Create Category"}
              </Button>
              {editingCategory && (
                <Button variant="outline" onClick={() => setEditingCategory(null)}>
                  Cancel
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Categories List */}
        <Card>
          <CardHeader>
            <CardTitle>Existing Categories</CardTitle>
            <CardDescription>Manage your existing categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categories.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No categories found. Create your first category!</p>
                </div>
              ) : (
                categories.map((category) => (
                  <div key={category._id} className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{category.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Slug: {category.slug}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingCategory(category)}
                          disabled={loading}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteCategory(category._id)}
                          disabled={loading}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    {category.description && (
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{category.description}</p>
                    )}
                    <div className="text-xs text-gray-500">
                      Created: {new Date(category.createdAt).toLocaleDateString()}
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
