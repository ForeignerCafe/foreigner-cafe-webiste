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
  Youtube,
  Undo,
  Redo,
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

const lowlight = createLowlight(common)

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

const UrlInputModal: React.FC<UrlInputModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  initialValue = "",
  title,
  label,
  placeholder,
}) => {
  const [url, setUrl] = useState(initialValue)

  useEffect(() => {
    if (isOpen) setUrl(initialValue)
  }, [isOpen, initialValue])

  const handleAdd = () => {
    onConfirm(url)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] font-body">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Input
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={placeholder}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-[#28282B] text-gray-900 dark:text-gray-100"
          />
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
            onClick={handleAdd}
            className="bg-orange-500 hover:bg-orange-600 text-white focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none"
          >
            Add
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
    openUrlModal("", "Add Image URL", "Image URL", "https://example.com/image.jpg", (url) => {
      if (url) editor.chain().focus().setImage({ src: url }).run()
    })
  }, [editor, openUrlModal])

  const addYoutubeVideo = useCallback(() => {
    openUrlModal("", "Add YouTube Video URL", "YouTube URL", "https://youtube.com/watch?v=...", (url) => {
      if (url) editor.chain().focus().setYoutubeVideo({ src: url }).run()
    })
  }, [editor, openUrlModal])

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
      {[
        { icon: Bold, cmd: "toggleBold", active: "bold" },
        { icon: Italic, cmd: "toggleItalic", active: "italic" },
        { icon: UnderlineIcon, cmd: "toggleUnderline", active: "underline" },
        { icon: Strikethrough, cmd: "toggleStrike", active: "strike" },
        { icon: Code, cmd: "toggleCode", active: "code" },
      ].map(({ icon: Icon, cmd, active }, i) => (
        <Button
          key={i}
          onClick={() => editor.chain().focus()[cmd]().run()}
          disabled={!editor.can().chain().focus()[cmd]().run()}
          className={cn(
            "p-2 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none",
            editor.isActive(active) && "bg-gray-200 dark:bg-gray-700",
          )}
          variant="ghost"
          size="sm"
        >
          <Icon className="h-4 w-4" />
        </Button>
      ))}

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
        onClick={addYoutubeVideo}
        variant="ghost"
        size="sm"
        className="p-2 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none"
      >
        <Youtube className="h-4 w-4" />
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

      <UrlInputModal
        isOpen={isUrlModalOpen}
        onClose={() => setIsUrlModalOpen(false)}
        onConfirm={handleUrlConfirm}
        initialValue={urlModalInitialValue}
        title={urlModalTitle}
        label={urlModalLabel}
        placeholder={urlModalPlaceholder}
      />
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
    ],
    content: initialContent,
    onUpdate: ({ editor }) => onContentChange?.(editor.getHTML()),
    editorProps: {
      attributes: {
        class: "prose dark:prose-invert max-w-none focus:outline-none p-4 min-h-[300px] overflow-y-auto",
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
