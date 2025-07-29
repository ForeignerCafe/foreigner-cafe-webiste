// @ts-nocheck
"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import toast from "react-hot-toast"
import RichTextEditor from "@/components/rich-text-editor"
import { ImageUpload } from "@/components/dashboard/image-upload"
import { TagInput } from "@/components/dashboard/tag-input"
import axiosInstance from "@/lib/axios"

// Form schema
const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
  shortCaption: z.string().min(1, { message: "Short caption is required." }),
  body: z.string().min(1, { message: "Blog content is required." }),
  status: z.enum(["draft", "published"]),
  tags: z.array(z.string()).optional(),
  mainImage: z.string().optional().nullable(), // now base64
})

export default function AddBlogPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const blogId = searchParams.get("id")

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [initialmainImage, setInitialmainImage] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      shortCaption: "",
      body: "",
      status: "draft",
      tags: [],
      mainImage: null,
    },
  })

  useEffect(() => {
    if (blogId) {
      setIsEditMode(true)
      const fetchBlog = async () => {
        try {
          const response = await axiosInstance.get(`/api/blog/${blogId}`)
          const blogData = response.data

          form.reset({
            title: blogData.title,
            shortCaption: blogData.shortCaption,
            body: blogData.body,
            status: blogData.status === "archived" ? "draft" : blogData.status,
            tags: blogData.tags || [],
            mainImage: blogData.mainImage || null,
          })

          setInitialmainImage(blogData.mainImage || null)
        } catch (error) {
          toast.error("Failed to load blog post.")
          router.push("/admin/blogs")
        }
      }
      fetchBlog()
    } else {
      setIsEditMode(false)
      form.reset()
      setInitialmainImage(null)
    }
  }, [blogId])

  const handleImageChange = (file: File | null) => {
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64 = reader.result?.toString() || null
        setInitialmainImage(base64)
        form.setValue("mainImage", base64, { shouldValidate: true })
      }
      reader.readAsDataURL(file)
    } else {
      setInitialmainImage(null)
      form.setValue("mainImage", null, { shouldValidate: true })
    }
  }

  const onSubmit = async (status: "draft" | "published") => {
    setIsSubmitting(true)
    const values = form.getValues()
    const toastId = toast.loading(
      isEditMode ? "Updating blog..." : status === "draft" ? "Saving draft..." : "Publishing..."
    )

    try {
      const blogPayload = {
        title: values.title,
        shortCaption: values.shortCaption,
        body: values.body,
        status,
        tags: values.tags || [],
        mainImage: values.mainImage || null,
      }

      if (isEditMode && blogId) {
        await axiosInstance.put(`/api/blog/${blogId}`, blogPayload)
        toast.success("Blog updated successfully!", { id: toastId })
      } else {
        await axios.post("/api/blog", blogPayload)
        toast.success(status === "draft" ? "Draft saved!" : "Blog published!", {
          id: toastId,
        })
      }

      router.push("/admin/blogs")
    } catch (error) {
      toast.error("Failed to save blog post", { id: toastId })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    form.reset()
    router.push("/admin/blogs")
  }

  return (
    <div className="flex flex-col p-4 md:p-6 w-full mb-16">
      <h1 className="text-xl md:text-2xl font-semibold mb-6">
        {isEditMode ? "Edit blog post" : "Add new blog"}
      </h1>

      <div className="space-y-4 md:space-y-6">
        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title">Blog Title</Label>
          <Input
            id="title"
            placeholder="Enter blog title"
            {...form.register("title")}
            className="bg-white dark:bg-[#28282B]"
          />
          {form.formState.errors.title && (
            <p className="text-red-500 text-sm">{form.formState.errors.title.message}</p>
          )}
        </div>

        {/* Short Caption */}
        <div className="space-y-2">
          <Label htmlFor="shortCaption">Short Caption</Label>
          <Input
            id="shortCaption"
            placeholder="Enter short caption"
            {...form.register("shortCaption")}
            className="bg-white dark:bg-[#28282B]"
          />
          {form.formState.errors.shortCaption && (
            <p className="text-red-500 text-sm">{form.formState.errors.shortCaption.message}</p>
          )}
        </div>

        {/* Body */}
        <div className="space-y-2">
          <Label htmlFor="body">Blog Content</Label>
          <div className="min-h-[300px]">
            <RichTextEditor
              initialContent={form.watch("body")}
              onContentChange={(html) => form.setValue("body", html, { shouldValidate: true })}
            />
          </div>
          {form.formState.errors.body && (
            <p className="text-red-500 text-sm">{form.formState.errors.body.message}</p>
          )}
        </div>

        {/* Image Upload */}
        <div className="space-y-2">
          <Label htmlFor="mainImage">Main Photo</Label>
          <ImageUpload
            value={form.watch("mainImage") || initialmainImage}
            onChange={handleImageChange}
            recommendedSize="1000x500"
          />
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <Label htmlFor="tags">Tags</Label>
          <TagInput
            initialTags={form.watch("tags") || []}
            onTagsChange={(tagsArray) => form.setValue("tags", tagsArray, { shouldValidate: true })}
          />
          <p className="text-sm text-muted-foreground">
            Press <kbd className="px-1 py-0.5 bg-gray-200 rounded text-xs">Enter</kbd> after each tag to add it.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-4 w-full">
          <Button
            type="button"
            onClick={handleCancel}
            className="w-full sm:w-auto bg-transparent border border-orange-500 text-orange-500 hover:bg-orange-50"
          >
            Cancel
          </Button>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Button
              type="button"
              onClick={() => onSubmit("draft")}
              disabled={isSubmitting}
              className="w-full sm:w-auto bg-transparent border border-orange-500 text-orange-500 hover:bg-orange-50"
            >
              {isEditMode ? "Update as draft" : "Save as draft"}
            </Button>
            <Button
              type="button"
              onClick={() => onSubmit("published")}
              disabled={isSubmitting}
              className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white"
            >
              {isEditMode ? "Update blog" : "Publish blog"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
