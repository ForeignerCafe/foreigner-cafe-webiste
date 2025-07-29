"use client"
import type React from "react"
import { useEffect, useState } from "react"

interface TagInputProps {
  initialTags?: string[]
  onTagsChange: (tags: string[]) => void
  placeholder?: string
  id?: string
}

export const TagInput: React.FC<TagInputProps> = ({
  initialTags = [],
  onTagsChange,
  placeholder = "Add a tag...",
  id,
}) => {
  const [tags, setTags] = useState<string[]>(initialTags)
  const [inputValue, setInputValue] = useState("")

  // ✅ Update internal tags if initialTags change (edit mode)
  useEffect(() => {
    setTags(initialTags)
  }, [initialTags])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      const trimmed = inputValue.trim()
      if (trimmed && !tags.includes(trimmed)) {
        const newTags = [...tags, trimmed]
        setTags(newTags)
        onTagsChange(newTags)
        setInputValue("")
      }
    }
  }

  const removeTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index)
    setTags(newTags)
    onTagsChange(newTags)
  }

  return (
    <div className="flex flex-col flex-wrap items-start gap-2 p-0">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full px-3 py-1 text-sm flex items-center gap-1"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="text-red-500 hover:text-red-700 focus:outline-none"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      <input
        type="text"
        id={id}
        className="w-full bg-white dark:bg-[#28282B] border rounded px-3 py-2 text-sm focus:outline-none"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
      />
    </div>
  )
}
