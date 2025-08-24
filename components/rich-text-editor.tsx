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
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-image-group": "",
        class: "flex justify-center gap-2 my-4 flex-wrap sm:flex-nowrap",
      }),
      0,
    ]
  },

  addCommands() {
    return {
      setImageGroup:
        (options) =>
        ({ commands }) => {
          const { urls, count } = options
          return commands.insertContent({
            type: this.name,
            attrs: { count },
            content: urls.map((url) => ({
              type: "image",
              attrs: {
                src: url,
                class:
                  count === 1
                    ? "max-w-full w-full sm:w-auto"
                    : count === 2
                      ? "max-w-full w-full sm:max-w-[48%] sm:w-[48%]"
                      : "max-w-full w-full sm:max-w-[32%] sm:w-[32%]",
              },
            })),
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
        default: false,
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
    return [
      "div",
      { class: "flex justify-center my-4 w-full" },
      [
        "video",
        mergeAttributes(HTMLAttributes, {
          style: `max-width: ${HTMLAttributes.width}; height: ${HTMLAttributes.height}; width: 100%;`,
          class: "max-w-full h-auto",
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
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-video-group": "",
        class: "flex justify-center gap-2 my-4 flex-wrap",
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
                    }
                  : {
                      ...video,
                      width: count === 1 ? "100%" : count === 2 ? "48%" : "32%",
                    },
            })),
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
  onConfirm: (urls: string[], count: number) => void
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [imageCount, setImageCount] = useState<number>(1)
  const [imageUrls, setImageUrls] = useState<string[]>([""])

  useEffect(() => {
    if (isOpen) {
      setImageCount(1)
      setImageUrls([""])
    }
  }, [isOpen])

  const handleCountChange = (count: number) => {
    setImageCount(count)
    const newUrls = Array(count)
      .fill("")
      .map((_, i) => imageUrls[i] || "")
    setImageUrls(newUrls)
  }

  const handleUrlChange = (index: number, url: string) => {
    const newUrls = [...imageUrls]
    newUrls[index] = url
    setImageUrls(newUrls)
  }

  const handleConfirm = () => {
    const validUrls = imageUrls.filter((url) => url.trim() !== "")
    if (validUrls.length > 0) {
      onConfirm(validUrls, imageCount)
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] font-body">
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
            <div key={i}>
              <Label>Image {i + 1} URL</Label>
              <Input
                value={imageUrls[i] || ""}
                onChange={(e) => handleUrlChange(i, e.target.value)}
                placeholder={`https://example.com/image${i + 1}.jpg`}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-[#28282B] text-gray-900 dark:text-gray-100"
              />
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
      muted: false,
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
          muted: false,
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
            muted: false,
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
        onConfirm({
          type: "group",
          videos: validVideos,
          count: videoCount,
        })
      }
      onClose()
    }
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
            Add Videos
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
    (urls: string[], count: number) => {
      if (urls.length === 1) {
        // Single image - use original method
        editor.chain().focus().setImage({ src: urls[0] }).run()
      } else {
        // Multiple images - use new image group
        editor.chain().focus().setImageGroup({ urls, count }).run()
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
          })
          .run()
      }
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

      {/* Link, Image, YouTube */}
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
    </div>
  )
}

export default function RichTextEditor({ initialContent = "", onContentChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      Link.configure({ openOnClick: false, autolink: true }),
      Image.configure({ inline: true, allowBase64: true }),
      YouTube.configure({ controls: true, nocookie: true, modestBranding: true }),
      Underline,
      Strike,
      HorizontalRule,
      CodeBlockLowlight.configure({ lowlight }),
      ImageGroup,
      DirectVideo,
      VideoGroup,
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
