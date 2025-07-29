"use client"

import type React from "react"
import { useState, useCallback, useRef, useEffect } from "react"
import { ImageIcon, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageUploadProps {
  value?: File | string | null // Can be a File object, a URL string, or null
  onChange: (file: File | null) => void
  recommendedSize?: string
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange, recommendedSize = "1200x600" }) => {
  const [preview, setPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (value instanceof File) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(value)
    } else if (typeof value === "string" && value) {
      setPreview(value)
    } else {
      setPreview(null)
    }
  }, [value])

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        onChange(file)
      }
    },
    [onChange],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      const file = e.dataTransfer.files?.[0]
      if (file) {
        onChange(file)
      }
    },
    [onChange],
  )

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleRemoveImage = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation() // Prevent triggering file input click
      setPreview(null)
      onChange(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = "" // Clear the file input
      }
    },
    [onChange],
  )

  return (
    <div
      className={cn(
        "cursor-pointer relative flex flex-col bg-white dark:bg-[#28282B] items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 text-center transition-colors hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500",
        preview ? "h-48" : "h-auto min-h-[150px]", // Adjust height based on preview
      )}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={() => fileInputRef.current?.click()}
    >
      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
      {preview ? (
        <>
          <img
            src={preview || "/placeholder.svg"}
            alt="Preview"
            className="max-h-full max-w-full object-contain rounded-md"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 rounded-full bg-white/80 p-1 text-gray-600 hover:text-red-500 dark:bg-gray-800/80 dark:text-gray-300"
            aria-label="Remove image"
          >
            <XCircle className="h-5 w-5" />
          </button>
        </>
      ) : (
        <>
          <ImageIcon className="mb-2 h-10 w-10 text-gray-400 dark:text-gray-500" />
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Upload an Image</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">JPG or PNG (Recommended size: {recommendedSize})</p>
        </>
      )}
    </div>
  )
}
