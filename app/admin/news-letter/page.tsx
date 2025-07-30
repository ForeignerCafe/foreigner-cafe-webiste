//@ts-nocheck
"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { ChevronRight, ChevronLeft, Send, Search } from "lucide-react"
import SendNewsletterModal from "@/components/dashboard/sendNewsletterModal"
import axiosInstance from "@/lib/axios"

const PAGE_SIZE = 10

export default function RecentNewsletters() {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [openModal, setOpenModal] = useState(false)
  const [newsletterData, setNewsletterData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNewsletters = async () => {
      try {
        const res = await axiosInstance.get("/api/newsletter")
        setNewsletterData(res.data)
      } catch (error) {
        console.error("Failed to fetch newsletters", error)
      } finally {
        setLoading(false)
      }
    }

    fetchNewsletters()
  }, [])

  const filteredData = newsletterData.filter(item =>
    item.subject.toLowerCase().includes(search.toLowerCase())
  )

  const paginatedData = filteredData.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  )

  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE)

  return (
    <div className="p-6 rounded-xl shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white">
          Recent Newsletters
        </h2>
        <Button className="bg-[#FF5C00] hover:bg-[#e94e00] text-white" onClick={() => setOpenModal(true)}>
          <Send size={16} className="mr-2" />
          Send Newsletter
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300 h-4 w-4" />
          <Input
            placeholder="Search newsletter"
            className="pl-10 w-full bg-white dark:bg-[#1f1f1f] border dark:border-gray-700 text-black dark:text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select>
          <SelectTrigger className="w-[160px] bg-white dark:bg-[#1f1f1f] dark:border-gray-700 dark:text-white">
            <SelectValue placeholder="Date: All times" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All times</SelectItem>
            <SelectItem value="week">This week</SelectItem>
            <SelectItem value="month">This month</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-x-auto mb-16">
        <Table>
          <TableHeader className="bg-gray-100 dark:bg-[#1f1f1f]">
            <TableRow>
              <TableHead>Newsletter Title</TableHead>
              <TableHead>Template</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">No. of people</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white dark:bg-black">
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6">
                  Loading...
                </TableCell>
              </TableRow>
            ) : paginatedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6">
                  No newsletters found.
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((item, idx) => (
                <TableRow key={item._id || idx}>
                  <TableCell>{item.subject}</TableCell>
                  <TableCell>{item.templateName}</TableCell>
                  <TableCell>{new Date(item.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">{item.subscribersCount}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end gap-2 mt-4">
        <Button
          size="icon"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="dark:bg-[#2b2b2b] dark:text-white"
        >
          <ChevronLeft size={16} />
        </Button>
        <span className="text-sm text-gray-700 dark:text-gray-300">
          Page {page} of {totalPages}
        </span>
        <Button
          size="icon"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="dark:bg-[#2b2b2b] dark:text-white"
        >
          <ChevronRight size={16} />
        </Button>
      </div>

      <SendNewsletterModal open={openModal} setOpen={setOpenModal} />
    </div>
  )
}
