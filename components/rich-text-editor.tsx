// @ts-nocheck
"use client"

import type React from "react"
import { useCallback, useEffect, useState } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"
import YouTube from "@tiptap/extension-youtube"
import Underline from "@tiptap/extension-underline"
import Strike from "@tiptap/extension-strike"
import HorizontalRule from "@tiptap/extension-horizontal-rule"
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight"
import { Node, mergeAttributes } from "@tiptap/core"
import { common, createLowlight } from "lowlight"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Bold,
  Italic,
  UnderlineIcon,
  Strikethrough,
  Code,
  Code2,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  List,
  ListOrdered,
  Quote,
  Minus,
  LinkIcon,
  ImageIcon,
  Undo,
  Redo,
  Video,
  Grid3X3,
  X,
  Plus,
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const lowlight = createLowlight(common)

const ImageGroup = Node.create({
  name: "imageGroup",
  group: "block",
  content: "image+",

  addAttributes() {
    return {
      count: {
        default: 1,
      },
      containerWidth: {
        default: "100%",
      },
      containerHeight: {
        default: "auto",
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: "div[data-image-group]",
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    const { containerWidth, containerHeight, ...attrs } = HTMLAttributes
    return [
      "div",
      mergeAttributes(attrs, {
        "data-image-group": "",
        class: "flex justify-center items-center gap-2 my-4 mx-auto",
        style: `width: ${containerWidth}; height: ${containerHeight}; max-width: 100%;`,
      }),
      0,
    ]
  },

  addCommands() {
    return {
      setImageGroup:
        (options) =>
        ({ commands }) => {
          const { urls, count, widths, heights } = options
          return commands.insertContent({
            type: this.name,
            attrs: { count },
            content: urls.map((url, index) => {
              const customWidth = widths?.[index] && widths[index] !== "auto" ? widths[index] : null
              const customHeight = heights?.[index] && heights[index] !== "auto" ? heights[index] : null

              // Default responsive widths when no custom width is set
              const defaultWidth = count === 1 ? "100%" : count === 2 ? "48%" : "32%"
              const finalWidth = customWidth || defaultWidth

              return {
                type: "image",
                attrs: {
                  src: url,
                  width: customWidth || undefined,
                  height: customHeight || undefined,
                  style: `width: ${finalWidth}; ${customHeight ? `height: ${customHeight};` : "height: auto;"} max-width: 100%; object-fit: cover;`,
                  class: `block ${count === 1 ? "mx-auto" : ""} rounded-lg`,
                },
              }
            }),
          })
        },
    }
  },
})

const DirectVideo = Node.create({
  name: "directVideo",
  group: "block",

  addAttributes() {
    return {
      src: {
        default: null,
      },
      controls: {
        default: true,
      },
      autoplay: {
        default: false,
      },
      loop: {
        default: false,
      },
      muted: {
        default: true,
      },
      width: {
        default: "100%",
      },
      height: {
        default: "auto",
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: "video[src]",
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    const { width, height, ...videoAttrs } = HTMLAttributes
    return [
      "div",
      { class: "flex justify-center my-4 w-full" },
      [
        "video",
        mergeAttributes(videoAttrs, {
          style: `width: ${width}; height: ${height}; max-width: 100%;`,
          class: "block rounded-lg",
          ...(videoAttrs.muted && { muted: true }),
          ...(videoAttrs.autoplay && { autoplay: true }),
          ...(videoAttrs.loop && { loop: true }),
          ...(videoAttrs.controls !== false && { controls: true }),
        }),
      ],
    ]
  },

  addCommands() {
    return {
      setDirectVideo:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          })
        },
    }
  },
})

const VideoGroup = Node.create({
  name: "videoGroup",
  group: "block",
  content: "directVideo+ youtube*",

  addAttributes() {
    return {
      count: {
        default: 1,
      },
      containerWidth: {
        default: "100%",
      },
      containerHeight: {
        default: "auto",
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: "div[data-video-group]",
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    const { containerWidth, containerHeight, ...attrs } = HTMLAttributes
    return [
      "div",
      mergeAttributes(attrs, {
        "data-video-group": "",
        class: "flex justify-center items-center gap-2 my-4 mx-auto",
        style: `width: ${containerWidth}; height: ${containerHeight}; max-width: 100%;`,
      }),
      0,
    ]
  },

  addCommands() {
    return {
      setVideoGroup:
        (options) =>
        ({ commands }) => {
          const { videos, count } = options
          return commands.insertContent({
            type: this.name,
            attrs: { count },
            content: videos.map((video) => ({
              type: video.type === "youtube" ? "youtube" : "directVideo",
              attrs:
                video.type === "youtube"
                  ? {
                      src: video.url,
                      width: count === 1 ? 640 : count === 2 ? 320 : 213,
                      height: count === 1 ? 480 : count === 2 ? 240 : 160,
                      class: "rounded-lg",
                    }
                  : {
                      src: video.url,
                      controls: video.controls,
                      autoplay: video.autoplay,
                      loop: video.loop,
                      muted: video.muted,
                      width: count === 1 ? video.width || "100%" : count === 2 ? "48%" : "32%",
                      height: video.height || "auto",
                      class: "rounded-lg",
                    },
            })),
          })
        },
    }
  },
})

// New Gallery Node
const Gallery = Node.create({
  name: "gallery",
  group: "block",

  addAttributes() {
    return {
      items: {
        default: [],
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: "div[data-gallery]",
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    const { items } = HTMLAttributes
    
    if (!items || items.length === 0) {
      return ["div", { class: "my-4 p-4 text-center text-gray-500" }, "Empty Gallery"]
    }

    // Generate bento grid layout
    const gridItems = items.map((item, index) => {
      const isLarge = index === 0 && items.length > 1
      const gridClass = isLarge 
        ? "col-span-2 row-span-2" 
        : items.length <= 2 
          ? "col-span-1" 
          : index === 1 && items.length >= 4
            ? "col-span-1 row-span-2"
            : "col-span-1"

      if (item.type === "image") {
        return [
          "div",
          {
            class: `${gridClass} overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800`,
          },
          [
            "img",
            {
              src: item.url,
              alt: item.alt || "",
              class: "w-full h-full object-cover transition-transform duration-300 hover:scale-105",
              style: "min-height: 200px;",
            },
          ],
        ]
      } else if (item.type === "video") {
        return [
          "div",
          {
            class: `${gridClass} overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800`,
          },
          [
            "video",
            {
              src: item.url,
              controls: item.controls !== false,
              muted: item.muted !== false,
              class: "w-full h-full object-cover",
              style: "min-height: 200px;",
              ...(item.autoplay && { autoplay: true }),
              ...(item.loop && { loop: true }),
            },
          ],
        ]
      } else if (item.type === "youtube") {
        const videoId = item.url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/)?.[1]
        if (videoId) {
          return [
            "div",
            {
              class: `${gridClass} overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800`,
            },
            [
              "iframe",
              {
                src: `https://www.youtube.com/embed/${videoId}`,
                frameborder: "0",
                allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
                allowfullscreen: true,
                class: "w-full h-full",
                style: "min-height: 200px;",
              },
            ],
          ]
        }
      }

      return ["div", { class: gridClass }, "Invalid media"]
    })

    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-gallery": "",
        class: "my-6 mx-auto max-w-6xl",
      }),
      [
        "div",
        {
          class: `grid gap-3 ${
            items.length === 1
              ? "grid-cols-1"
              : items.length === 2
              ? "grid-cols-2"
              : items.length === 3
              ? "grid-cols-3"
              : "grid-cols-3 grid-rows-3"
          } auto-rows-[200px] sm:auto-rows-[250px] md:auto-rows-[300px]`,
        },
        ...gridItems,
      ],
    ]
  },

  addCommands() {
    return {
      setGallery:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: { items: options.items },
          })
        },
    }
  },
})

interface RichTextEditorProps {
  initialContent?: string
  onContentChange?: (html: string) => void
}

interface UrlInputModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (url: string) => void
  initialValue?: string
  title: string
  label: string
  placeholder: string
}

interface ImageModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (urls: string[], count: number, widths?: string[], heights?: string[]) => void
}

interface GalleryItem {
  type: "image" | "video" | "youtube"
  url: string
  alt?: string
  controls?: boolean
  autoplay?: boolean
  loop?: boolean
  muted?: boolean
}

interface GalleryModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (items: GalleryItem[]) => void
}

const GalleryModal: React.FC<GalleryModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [items, setItems] = useState<GalleryItem[]>([
    { type: "image", url: "", alt: "" }
  ])

  useEffect(() => {
    if (isOpen) {
      setItems([{ type: "image", url: "", alt: "" }])
    }
  }, [isOpen])

  const addItem = () => {
    setItems([...items, { type: "image", url: "", alt: "" }])
  }

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index))
    }
  }

  const updateItem = (index: number, updates: Partial<GalleryItem>) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], ...updates }
    setItems(newItems)
  }

  const handleConfirm = () => {
    const validItems = items.filter(item => item.url.trim() !== "")
    if (validItems.length > 0) {
      onConfirm(validItems)
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto font-body">
        <DialogHeader>
          <DialogTitle>Create Media Gallery</DialogTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Add images and videos to create a responsive bento grid gallery
          </p>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          {items.map((item, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4 bg-gray-50 dark:bg-gray-800/50">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Media Item {index + 1}</h4>
                {items.length > 1 && (
                  <Button
                    onClick={() => removeItem(index)}
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Media Type</Label>
                  <Select
                    value={item.type}
                    onValueChange={(value: "image" | "video" | "youtube") => 
                      updateItem(index, { type: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="image">Image</SelectItem>
                      <SelectItem value="video">Direct Video</SelectItem>
                      <SelectItem value="youtube">YouTube Video</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>URL</Label>
                  <Input
                    value={item.url}
                    onChange={(e) => updateItem(index, { url: e.target.value })}
                    placeholder={
                      item.type === "image" 
                        ? "https://example.com/image.jpg"
                        : item.type === "youtube"
                        ? "https://youtube.com/watch?v=..."
                        : "https://example.com/video.mp4"
                    }
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-[#28282B] text-gray-900 dark:text-gray-100"
                  />
                </div>
              </div>

              {item.type === "image" && (
                <div>
                  <Label>Alt Text (Optional)</Label>
                  <Input
                    value={item.alt || ""}
                    onChange={(e) => updateItem(index, { alt: e.target.value })}
                    placeholder="Describe the image"
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-[#28282B] text-gray-900 dark:text-gray-100"
                  />
                </div>
              )}

              {item.type === "video" && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`controls-${index}`}
                      checked={item.controls !== false}
                      onCheckedChange={(checked) => updateItem(index, { controls: checked as boolean })}
                    />
                    <Label htmlFor={`controls-${index}`}>Show controls</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`autoplay-${index}`}
                      checked={item.autoplay || false}
                      onCheckedChange={(checked) => updateItem(index, { autoplay: checked as boolean })}
                    />
                    <Label htmlFor={`autoplay-${index}`}>Autoplay</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`loop-${index}`}
                      checked={item.loop || false}
                      onCheckedChange={(checked) => updateItem(index, { loop: checked as boolean })}
                    />
                    <Label htmlFor={`loop-${index}`}>Loop</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`muted-${index}`}
                      checked={item.muted !== false}
                      onCheckedChange={(checked) => updateItem(index, { muted: checked as boolean })}
                    />
                    <Label htmlFor={`muted-${index}`}>Muted</Label>
                  </div>
                </div>
              )}
            </div>
          ))}

          <Button
            onClick={addItem}
            variant="outline"
            className="w-full border-dashed border-2 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:border-orange-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Another Media Item
          </Button>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h5 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Gallery Layout Tips:</h5>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>• First item will be larger if you have multiple items</li>
              <li>• Works best with 2-6 media items</li>
              <li>• Layout automatically adapts to different screen sizes</li>
              <li>• Mix images and videos for dynamic galleries</li>
            </ul>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            onClick={onClose}
            className="bg-transparent border border-orange-500 text-orange-500 hover:bg-orange-50 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleConfirm}
            disabled={items.every(item => item.url.trim() === "")}
            className="bg-orange-500 hover:bg-orange-600 text-white focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none disabled:opacity-50"
          >
            Create Gallery
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const MenuBar = ({ editor }: { editor: ReturnType<typeof useEditor> }) => {
  const [isUrlModalOpen, setIsUrlModalOpen] = useState(false)
  const [urlModalInitialValue, setUrlModalInitialValue] = useState("")
  const [urlModalTitle, setUrlModalTitle] = useState("")
  const [urlModalLabel, setUrlModalLabel] = useState("")
  const [urlModalPlaceholder, setUrlModalPlaceholder] = useState("")
  const [urlModalConfirmCallback, setUrlModalConfirmCallback] = useState<((url: string) => void) | null>(null)

  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false)

  const handleUrlConfirm = useCallback(
    (url: string) => {
      if (urlModalConfirmCallback) urlModalConfirmCallback(url)
      setIsUrlModalOpen(false)
      setUrlModalInitialValue("")
      setUrlModalConfirmCallback(null)
    },
    [urlModalConfirmCallback],
  )

  const openUrlModal = useCallback(
    (initialValue: string, title: string, label: string, placeholder: string, onConfirm: (url: string) => void) => {
      setUrlModalInitialValue(initialValue)
      setUrlModalTitle(title)
      setUrlModalLabel(label)
      setUrlModalPlaceholder(placeholder)
      setUrlModalConfirmCallback(() => onConfirm)
      setIsUrlModalOpen(true)
    },
    [],
  )

  const addImage = useCallback(() => {
    setIsImageModalOpen(true)
  }, [])

  const handleImageConfirm = useCallback(
    (urls: string[], count: number, widths?: string[], heights?: string[]) => {
      if (urls.length === 1) {
        editor
          .chain()
          .focus()
          .setImage({
            src: urls[0],
            style: `width: ${widths?.[0] || "100%"}; height: ${heights?.[0] || "auto"}; max-width: 100%; object-fit: cover; display: block; margin: 0 auto;`,
            class: "rounded-lg",
          })
          .run()
      } else {
        // Multiple images - use image group
        editor.chain().focus().setImageGroup({ urls, count, widths, heights }).run()
      }
    },
    [editor],
  )

  const addVideo = useCallback(() => {
    setIsVideoModalOpen(true)
  }, [])

  const handleVideoConfirm = useCallback(
    (videoData: any) => {
      if (videoData.type === "group") {
        editor.chain().focus().setVideoGroup({ videos: videoData.videos, count: videoData.count }).run()
      } else if (videoData.type === "youtube") {
        editor.chain().focus().setYoutubeVideo({ src: videoData.url }).run()
      } else {
        editor
          .chain()
          .focus()
          .setDirectVideo({
            src: videoData.url,
            controls: videoData.controls,
            autoplay: videoData.autoplay,
            loop: videoData.loop,
            muted: videoData.muted,
            width: videoData.width || "100%",
            height: videoData.height || "auto",
          })
          .run()
      }
    },
    [editor],
  )

  const addGallery = useCallback(() => {
    setIsGalleryModalOpen(true)
  }, [])

  const handleGalleryConfirm = useCallback(
    (items: GalleryItem[]) => {
      editor.chain().focus().setGallery({ items }).run()
    },
    [editor],
  )

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href
    openUrlModal(previousUrl, "Add Link URL", "Link URL", "https://example.com", (url) => {
      if (url === null) return
      if (url === "") {
        editor.chain().focus().extendMarkRange("link").unsetLink().run()
      } else {
        editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
      }
    })
  }, [editor, openUrlModal])

  if (!editor) return null

  return (
    <div className="flex flex-wrap gap-1 p-2 border-b border-gray-200 dark:border-gray-700">
      {/* Text Formatting */}
      {/* Bold */}
      <Button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={cn(
          "p-2 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none",
          editor.isActive("bold") && "bg-gray-200 dark:bg-gray-700",
        )}
        variant="ghost"
        size="sm"
      >
        <Bold className="h-4 w-4" />
      </Button>

      {/* Italic */}
      <Button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={cn(
          "p-2 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none",
          editor.isActive("italic") && "bg-gray-200 dark:bg-gray-700",
        )}
        variant="ghost"
        size="sm"
      >
        <Italic className="h-4 w-4" />
      </Button>

      {/* Underline */}
      <Button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        className={cn(
          "p-2 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none",
          editor.isActive("underline") && "bg-gray-200 dark:bg-gray-700",
        )}
        variant="ghost"
        size="sm"
      >
        <UnderlineIcon className="h-4 w-4" />
      </Button>

      {/* Strikethrough */}
      <Button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={cn(
          "p-2 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none",
          editor.isActive("strike") && "bg-gray-200 dark:bg-gray-700",
        )}
        variant="ghost"
        size="sm"
      >
        <Strikethrough className="h-4 w-4" />
      </Button>

      {/* Code */}
      <Button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={cn(
          "p-2 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none",
          editor.isActive("code") && "bg-gray-200 dark:bg-gray-700",
        )}
        variant="ghost"
        size="sm"
      >
        <Code className="h-4 w-4" />
      </Button>

      {/* Paragraph Button */}
      <Button
        onClick={() => editor.chain().focus().setParagraph().run()}
        variant="ghost"
        size="sm"
        className={cn(
          "p-2 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none font-bold",
          editor.isActive("paragraph") && "bg-gray-200 dark:bg-gray-700",
        )}
      >
        P
      </Button>

      {/* Headings */}
      {[Heading1, Heading2, Heading3, Heading4, Heading5, Heading6].map((Icon, i) => (
        <Button
          key={i}
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleHeading({ level: i + 1 })
              .run()
          }
          disabled={!editor.can().toggleHeading({ level: i + 1 })}
          className={cn(
            "p-2 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none",
            editor.isActive("heading", { level: i + 1 }) && "bg-gray-200 dark:bg-gray-700",
          )}
          variant="ghost"
          size="sm"
        >
          <Icon className="h-4 w-4" />
        </Button>
      ))}

      {/* Lists, Quotes, Codeblock, Divider */}
      <Button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        variant="ghost"
        size="sm"
        className={cn(
          "p-2 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none",
          editor.isActive("bulletList") && "bg-gray-200 dark:bg-gray-700",
        )}
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        variant="ghost"
        size="sm"
        className={cn(
          "p-2 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none",
          editor.isActive("orderedList") && "bg-gray-200 dark:bg-gray-700",
        )}
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        variant="ghost"
        size="sm"
        className={cn(
          "p-2 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none",
          editor.isActive("blockquote") && "bg-gray-200 dark:bg-gray-700",
        )}
      >
        <Quote className="h-4 w-4" />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        variant="ghost"
        size="sm"
        className={cn(
          "p-2 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none",
          editor.isActive("codeBlock") && "bg-gray-200 dark:bg-gray-700",
        )}
      >
        <Code2 className="h-4 w-4" />
      </Button>
      <Button
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        variant="ghost"
        size="sm"
        className="p-2 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none"
      >
        <Minus className="h-4 w-4" />
      </Button>

      {/* Link, Image, Video, Gallery */}
      <Button
        onClick={setLink}
        variant="ghost"
        size="sm"
        className={cn(
          "p-2 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none",
          editor.isActive("link") && "bg-gray-200 dark:bg-gray-700",
        )}
      >
        <LinkIcon className="h-4 w-4" />
      </Button>
      <Button
        onClick={addImage}
        variant="ghost"
        size="sm"
        className="p-2 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none"
      >
        <ImageIcon className="h-4 w-4" />
      </Button>
      <Button
        onClick={addVideo}
        variant="ghost"
        size="sm"
        className="p-2 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none"
      >
        <Video className="h-4 w-4" />
      </Button>
      <Button
        onClick={addGallery}
        variant="ghost"
        size="sm"
        className="p-2 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none"
        title="Add Gallery"
      >
        <Grid3X3 className="h-4 w-4" />
      </Button>

      {/* Undo/Redo */}
      <Button
        onClick={() => editor.chain().focus().undo().run()}
        variant="ghost"
        size="sm"
        className="p-2 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none"
        disabled={!editor.can().undo()}
      >
        <Undo className="h-4 w-4" />
      </Button>
      <Button
        onClick={() => editor.chain().focus().redo().run()}
        variant="ghost"
        size="sm"
        className="p-2 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none"
        disabled={!editor.can().redo()}
      >
        <Redo className="h-4 w-4" />
      </Button>

      {/* Url Input Modal */}
      {isUrlModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#28282B] p-6 rounded-lg shadow-lg w-full max-w-md">
            <DialogTitle>{urlModalTitle}</DialogTitle>
            <div className="mt-4">
              <Label>{urlModalLabel}</Label>
              <Input
                value={urlModalInitialValue}
                onChange={(e) => setUrlModalInitialValue(e.target.value)}
                placeholder={urlModalPlaceholder}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-[#28282B] text-gray-900 dark:text-gray-100"
              />
            </div>
            <DialogFooter className="mt-6">
              <Button
                type="button"
                onClick={() => setIsUrlModalOpen(false)}
                className="bg-transparent border border-orange-500 text-orange-500 hover:bg-orange-50 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={() => handleUrlConfirm(urlModalInitialValue)}
                className="bg-orange-500 hover:bg-orange-600 text-white focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none"
              >
                Confirm
              </Button>
            </DialogFooter>
          </div>
        </div>
      )}

      <ImageModal isOpen={isImageModalOpen} onClose={() => setIsImageModalOpen(false)} onConfirm={handleImageConfirm} />

      <VideoModal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} onConfirm={handleVideoConfirm} />

      <GalleryModal isOpen={isGalleryModalOpen} onClose={() => setIsGalleryModalOpen(false)} onConfirm={handleGalleryConfirm} />
    </div>
  )
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [imageCount, setImageCount] = useState<number>(1)
  const [imageUrls, setImageUrls] = useState<string[]>([""])
  const [imageWidths, setImageWidths] = useState<string[]>(["auto"])
  const [imageHeights, setImageHeights] = useState<string[]>(["auto"])

  useEffect(() => {
    if (isOpen) {
      setImageCount(1)
      setImageUrls([""])
      setImageWidths(["auto"])
      setImageHeights(["auto"])
    }
  }, [isOpen])

  const handleCountChange = (count: number) => {
    setImageCount(count)
    const newUrls = Array(count)
      .fill("")
      .map((_, i) => imageUrls[i] || "")
    const newWidths = Array(count)
      .fill("")
      .map((_, i) => imageWidths[i] || "auto")
    const newHeights = Array(count)
      .fill("")
      .map((_, i) => imageHeights[i] || "auto")
    setImageUrls(newUrls)
    setImageWidths(newWidths)
    setImageHeights(newHeights)
  }

  const handleUrlChange = (index: number, url: string) => {
    const newUrls = [...imageUrls]
    newUrls[index] = url
    setImageUrls(newUrls)
  }

  const handleWidthChange = (index: number, width: string) => {
    const newWidths = [...imageWidths]
    newWidths[index] = width
    setImageWidths(newWidths)
  }

  const handleHeightChange = (index: number, height: string) => {
    const newHeights = [...imageHeights]
    newHeights[index] = height
    setImageHeights(newHeights)
  }

  const handleConfirm = () => {
    const validUrls = imageUrls.filter((url) => url.trim() !== "")
    if (validUrls.length > 0) {
      onConfirm(validUrls, imageCount, imageWidths, imageHeights)
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto font-body">
        <DialogHeader>
          <DialogTitle>Add Images</DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div>
            <Label>Number of images</Label>
            <Select value={imageCount.toString()} onValueChange={(value) => handleCountChange(Number.parseInt(value))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Image (Centered)</SelectItem>
                <SelectItem value="2">2 Images (Side by side)</SelectItem>
                <SelectItem value="3">3 Images (Side by side)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {Array.from({ length: imageCount }, (_, i) => (
            <div key={i} className="border rounded-lg p-4 space-y-3">
              <h4 className="font-medium">Image {i + 1}</h4>

              <div>
                <Label>Image URL</Label>
                <Input
                  value={imageUrls[i] || ""}
                  onChange={(e) => handleUrlChange(i, e.target.value)}
                  placeholder={`https://example.com/image${i + 1}.jpg`}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-[#28282B] text-gray-900 dark:text-gray-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Width</Label>
                  <Input
                    value={imageWidths[i] || "auto"}
                    onChange={(e) => handleWidthChange(i, e.target.value)}
                    placeholder="auto, 100%, 300px"
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-[#28282B] text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div>
                  <Label>Height</Label>
                  <Input
                    value={imageHeights[i] || "auto"}
                    onChange={(e) => handleHeightChange(i, e.target.value)}
                    placeholder="auto, 200px"
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-[#28282B] text-gray-900 dark:text-gray-100"
                  />
                </div>
              </div>

              <p className="text-sm text-gray-500">Use "auto", percentages (50%), or pixels (300px) for sizing</p>
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button
            type="button"
            onClick={onClose}
            className="bg-transparent border border-orange-500 text-orange-500 hover:bg-orange-50 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleConfirm}
            className="bg-orange-500 hover:bg-orange-600 text-white focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none"
          >
            Add Images
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (videoData: any) => void
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [videoCount, setVideoCount] = useState<number>(1)
  const [videos, setVideos] = useState<any[]>([
    {
      type: "youtube",
      url: "",
      controls: true,
      autoplay: false,
      loop: false,
      muted: true,
      width: "100%",
      height: "auto",
    },
  ])

  useEffect(() => {
    if (isOpen) {
      setVideoCount(1)
      setVideos([
        {
          type: "youtube",
          url: "",
          controls: true,
          autoplay: false,
          loop: false,
          muted: true,
          width: "100%",
          height: "auto",
        },
      ])
    }
  }, [isOpen])

  const handleCountChange = (count: number) => {
    setVideoCount(count)
    const newVideos = Array(count)
      .fill(null)
      .map(
        (_, i) =>
          videos[i] || {
            type: "youtube",
            url: "",
            controls: true,
            autoplay: false,
            loop: false,
            muted: true,
            width: "100%",
            height: "auto",
          },
      )
    setVideos(newVideos)
  }

  const handleVideoChange = (index: number, field: string, value: any) => {
    const newVideos = [...videos]
    newVideos[index] = { ...newVideos[index], [field]: value }
    setVideos(newVideos)
  }

  const handleConfirm = () => {
    const validVideos = videos.filter((video) => video.url.trim() !== "")
    if (validVideos.length > 0) {
      if (validVideos.length === 1) {
        // Single video - use original method
        onConfirm(validVideos[0])
      } else {
        // Multiple videos - use new video group
        const videosWithSrc = validVideos.map((video) => ({
          ...video,
          src: video.url, // Ensure src attribute is set from url
        }))
        onConfirm({
          type: "group",
          videos: videosWithSrc,
          count: validVideos.length,
        })
      }
    }
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto font-body">
        <DialogHeader>
          <DialogTitle>Add Videos</DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div>
            <Label>Number of videos</Label>
            <Select value={videoCount.toString()} onValueChange={(value) => handleCountChange(Number.parseInt(value))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Video (Centered)</SelectItem>
                <SelectItem value="2">2 Videos (Side by side)</SelectItem>
                <SelectItem value="3">3 Videos (Side by side)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {Array.from({ length: videoCount }, (_, i) => (
            <div key={i} className="border rounded-lg p-4 space-y-3">
              <h4 className="font-medium">Video {i + 1}</h4>

              <div>
                <Label>Video Type</Label>
                <Select
                  value={videos[i]?.type || "youtube"}
                  onValueChange={(value) => handleVideoChange(i, "type", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="youtube">YouTube Video</SelectItem>
                    <SelectItem value="direct">Direct Video Link</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Video URL</Label>
                <Input
                  value={videos[i]?.url || ""}
                  onChange={(e) => handleVideoChange(i, "url", e.target.value)}
                  placeholder={
                    videos[i]?.type === "youtube" ? "https://youtube.com/watch?v=..." : "https://example.com/video.mp4"
                  }
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-[#28282B] text-gray-900 dark:text-gray-100"
                />
              </div>

              {videos[i]?.type === "direct" && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Width</Label>
                      <Input
                        value={videos[i]?.width || "100%"}
                        onChange={(e) => handleVideoChange(i, "width", e.target.value)}
                        placeholder="100%, 500px, auto"
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-[#28282B] text-gray-900 dark:text-gray-100"
                      />
                    </div>
                    <div>
                      <Label>Height</Label>
                      <Input
                        value={videos[i]?.height || "auto"}
                        onChange={(e) => handleVideoChange(i, "height", e.target.value)}
                        placeholder="auto, 300px"
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-[#28282B] text-gray-900 dark:text-gray-100"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`controls-${i}`}
                      checked={videos[i]?.controls || false}
                      onCheckedChange={(checked) => handleVideoChange(i, "controls", checked)}
                    />
                    <Label htmlFor={`controls-${i}`}>Show controls</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`autoplay-${i}`}
                      checked={videos[i]?.autoplay || false}
                      onCheckedChange={(checked) => handleVideoChange(i, "autoplay", checked)}
                    />
                    <Label htmlFor={`autoplay-${i}`}>Autoplay</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`loop-${i}`}
                      checked={videos[i]?.loop || false}
                      onCheckedChange={(checked) => handleVideoChange(i, "loop", checked)}
                    />
                    <Label htmlFor={`loop-${i}`}>Loop</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`muted-${i}`}
                      checked={videos[i]?.muted || false}
                      onCheckedChange={(checked) => handleVideoChange(i, "muted", checked)}
                    />
                    <Label htmlFor={`muted-${i}`}>Muted</Label>
                  </div>

                  <p className="text-sm text-gray-500">Use "auto", percentages (50%), or pixels (300px) for sizing</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button
            type="button"
            onClick={onClose}
            className="bg-transparent border border-orange-500 text-orange-500 hover:bg-orange-50 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleConfirm}
            className="bg-orange-500 hover:bg-orange-600 text-white focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none"
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default function RichTextEditor({ initialContent = "", onContentChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      Link.configure({ openOnClick: false, autolink: true }),
      Image.configure({
        inline: false,
        allowBase64: true,
        HTMLAttributes: {
          class: "block mx-auto max-w-full h-auto rounded-lg",
          style: "object-fit: cover;",
        },
      }),
      YouTube.configure({
        controls: true,
        nocookie: true,
        modestBranding: true,
        HTMLAttributes: {
          class: "rounded-lg",
        },
      }),
      Underline,
      Strike,
      HorizontalRule,
      CodeBlockLowlight.configure({ lowlight }),
      ImageGroup,
      DirectVideo,
      VideoGroup,
      Gallery,
    ],
    content: initialContent,
    onUpdate: ({ editor }) => onContentChange?.(editor.getHTML()),
    editorProps: {
      attributes: {
        class: "prose dark:prose-invert max-w-none focus:outline-none p-2 sm:p-4 min-h-[300px] overflow-y-auto",
      },
    },
    immediatelyRender: false,
    autofocus: true,
  })

  useEffect(() => {
    if (editor && initialContent !== editor.getHTML()) {
      editor.commands.setContent(initialContent, { emitUpdate: false })
    }
  }, [editor, initialContent])

  return (
    <div className="border rounded-md shadow-sm bg-white dark:bg-[#28282B] text-gray-900 dark:text-gray-100">
      {editor && <MenuBar editor={editor} />}
      {editor && <EditorContent editor={editor} />}
    </div>
  )
}
