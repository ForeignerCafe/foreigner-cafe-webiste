//@ts-nocheck
// blog-columns.tsx
"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Trash2, SquarePen, Archive, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DeleteConfirmationModal } from "@/components/dashboard/delete-confirmation-modal"
import toast from "react-hot-toast"
import axiosInstance from "@/lib/axios"
import Image from "next/image"
import type { Blog, BlogStatus } from "@/models/Blog"
import type { ColumnDef } from "@tanstack/react-table"

export const getBlogColumns = (fetchBlogs: () => void): ColumnDef<Blog>[] => [
  {
    accessorKey: "title",
    header: "Blog Title",
    cell: ({ row }) => <div className="font-medium">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "mainImage",
    header: "Main Image",
    cell: ({ row }) => (
      <div className="relative w-10 h-10 overflow-hidden" style={{ borderRadius: "30%" }}>
        {typeof row.getValue("mainImage") === "string" && row.getValue("mainImage") ? (
          <Image
            src={row.getValue("mainImage").startsWith("blob:") ? "/placeholder.svg" : row.getValue("mainImage")}
            alt="Blog thumbnail"
            fill
            className="object-cover rounded-md"
          />
        ) : (
          <Image src="/placeholder.svg" alt="Placeholder" fill className="object-cover rounded-md" />
        )}
      </div>
    ),
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status: BlogStatus = row.getValue("status")
      const statusStyles = {
        published: "bg-[#99FF9C6E] text-[#08870B] dark:text-[#88E788]",
        draft: "bg-[#CA3DD73D] text-[#CA3DD7]",
        archived: "bg-[#FFDE2145] text-[#DABD17]",
      }
      return (
        <div className={`px-2 py-1 text-sm rounded-full w-20 text-center ${statusStyles[status] || ""}`}>{status}</div>
      )
    },
  },
  {
    accessorKey: "publishedAt",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("publishedAt"))
      return <div>{date.toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" })}</div>
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const blog = row.original
      const router = useRouter()
      const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
      const [blogToDelete, setBlogToDelete] = useState<Blog | null>(null)

      const handleDelete = async () => {
        if (!blogToDelete) return
        const toastId = toast.loading("Deleting blog...")
        try {
          await axiosInstance.delete(`/api/blog/${blogToDelete._id}`)
          toast.success("Blog deleted successfully!", { id: toastId })
          fetchBlogs()
        } catch (error) {
          toast.error("Failed to delete blog", { id: toastId })
        } finally {
          setIsDeleteModalOpen(false)
          setBlogToDelete(null)
        }
      }

      const handleArchive = async (blog: Blog) => {
        const toastId = toast.loading("Archiving blog...")
        try {
          await axiosInstance.patch(`/api/blog/${blog._id}?action=archive`)
          toast.success("Blog archived successfully!", { id: toastId })
          fetchBlogs()
        } catch (error) {
          toast.error("Failed to archive blog", { id: toastId })
        }
      }

      const handleEdit = (blog: Blog) => {
        // Use _id for admin operations, not slug
        router.push(`/admin/add-blog?id=${blog._id}`)
      }

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => {
                  setBlogToDelete(blog)
                  setIsDeleteModalOpen(true)
                }}
              >
                <Trash2 className="h-4 w-4 mr-2 text-red-500" /> Delete
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleEdit(blog)}>
                <SquarePen className="h-4 w-4 mr-2 text-blue-500" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleArchive(blog)}>
                <Archive className="h-4 w-4 mr-2 text-green-500" /> Archive
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DeleteConfirmationModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleDelete}
            title="Are you absolutely sure?"
            description={`This will permanently delete "${blogToDelete?.title}"`}
          />
        </>
      )
    },
  },
]
