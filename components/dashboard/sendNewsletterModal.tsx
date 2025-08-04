"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import RichTextEditor from "@/components/rich-text-editor"
import toast from "react-hot-toast"
import axiosInstance from "@/lib/axios"

interface SendNewsletterModalProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export default function SendNewsletterModal({ open, setOpen }: SendNewsletterModalProps) {
  const [subject, setSubject] = useState("")
  const [template, setTemplate] = useState("custom") // <-- Set to "custom" by default
  const [couponEnabled, setCouponEnabled] = useState(false)
  const [couponCode, setCouponCode] = useState("")
  const [body, setBody] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    if (!subject || !template) {
      toast.error("Please enter a subject and select a template")
      return
    }

    const payload: any = {
      subject,
      templateName: template,
    }

    if (template === "custom") {
      payload.html = body
    }

    if (couponEnabled && couponCode) {
      payload.couponCode = couponCode
    }

    setLoading(true)

    try {
      const res = await axiosInstance.post("/api/newsletter", payload)
      toast.success(`Newsletter sent to ${res.data.recipients} people`)
      setOpen(false)
    } catch (error) {
      toast.error("Failed to send newsletter")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto font-body">
        <DialogHeader>
          <DialogTitle>Send Newsletter</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Subject</label>
            <Input
              placeholder="Enter Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="dark:bg-[#1f1f1f] dark:border-gray-700 dark:text-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Template</label>
            <Select value={template} onValueChange={setTemplate} disabled> {/* Disabled the select */}
              <SelectTrigger className="w-full dark:bg-[#1f1f1f] dark:border-gray-700 dark:text-white">
                <SelectValue placeholder="Select Template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="eid">Eid</SelectItem>
                <SelectItem value="christmas">Christmas</SelectItem>
                <SelectItem value="diwali">Diwali</SelectItem>
                <SelectItem value="easter">Easter</SelectItem>
                <SelectItem value="custom">Custom Template</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {template === "custom" && (
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Body</label>
              <RichTextEditor initialContent={body} onContentChange={setBody} />
            </div>
          )}

          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={couponEnabled}
                onChange={() => setCouponEnabled(!couponEnabled)}
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-800 dark:text-gray-200">Include Coupon Code</span>
            </label>
            {couponEnabled && (
              <div className="mt-2 space-y-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Coupon Code</label>
                <Input
                  placeholder="Enter Coupon Code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="dark:bg-[#1f1f1f] dark:border-gray-700 dark:text-white"
                />
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button
            onClick={handleSend}
            disabled={loading}
            className="bg-[#FF5C00] hover:bg-[#e94e00] text-white"
          >
            {loading ? "Sending..." : "Send Newsletter"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
