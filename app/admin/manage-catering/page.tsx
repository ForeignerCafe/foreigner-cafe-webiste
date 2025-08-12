"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, Save, Loader2 } from 'lucide-react'
import toast from "react-hot-toast"
import axiosInstance from "@/lib/axios"
import { LivePreviewPanel, LivePreviewToggle } from "@/components/cms-live-preview"
import { FormSkeleton } from "@/components/ui/skeleton-components"

// Catering Page Content Interfaces
interface CateringHeroSection {
  cakeMenu: {
    image: string
    title: string
    buttonText: string
    buttonLink: string
  }
  fullMenu: {
    image: string
    title: string
    buttonText: string
    buttonLink: string
  }
}

interface CateringIntroSection {
  image: string
  title: string
  description: string
  menuLink: string
}

interface CateringCarouselItem {
  id: number
  title: string
  description: string
  price: string
  image: string
}

interface CateringCarouselSection {
  title: string
  description: string
  items: CateringCarouselItem[]
}

interface CateringYourWayItem {
  id: number
  src: string
  alt: string
  title: string
  description: string
}

interface CateringYourWaySection {
  title: string
  description: string
  items: CateringYourWayItem[]
}

interface CateringPageData {
  hero: CateringHeroSection
  cateringIntro: CateringIntroSection
  lunchPacks: CateringCarouselSection
  cakeRange: CateringCarouselSection
  cateringYourWay: CateringYourWaySection
}

export default function ManageCateringPage() {
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [livePreviewEnabled, setLivePreviewEnabled] = useState(false)
  const [activePreviewSection, setActivePreviewSection] = useState<string>("")
  const [previewData, setPreviewData] = useState<any>(null)

  const [cateringPageContent, setCateringPageContent] = useState<CateringPageData>({
    hero: {
      cakeMenu: { image: "", title: "", buttonText: "", buttonLink: "" },
      fullMenu: { image: "", title: "", buttonText: "", buttonLink: "" },
    },
    cateringIntro: { image: "", title: "", description: "", menuLink: "" },
    lunchPacks: { title: "", description: "", items: [] },
    cakeRange: { title: "", description: "", items: [] },
    cateringYourWay: { title: "", description: "", items: [] },
  })

  useEffect(() => {
    const fetchCateringContent = async () => {
      try {
        setInitialLoading(true)
        const response = await axiosInstance.get("/api/cms/catering-page")
        if (response.data.success) {
          setCateringPageContent(response.data.data)
        } else {
          toast.error("Failed to fetch catering page content")
        }
      } catch (error) {
        toast.error("Failed to fetch catering page content")
      } finally {
        setInitialLoading(false)
      }
    }
    fetchCateringContent()
  }, [])

  const updatePreviewData = (sectionType: string, data: any) => {
    if (livePreviewEnabled) {
      setActivePreviewSection(sectionType)
      setPreviewData(data)
    }
  }

  const handleCateringPageSave = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.put("/api/cms/catering-page", cateringPageContent)
      if (response.data.success) {
        toast.success("Catering page content updated successfully!")
        updatePreviewData("catering-page", cateringPageContent)
      } else {
        toast.error("Failed to update catering page content")
      }
    } catch (error) {
      toast.error("Failed to update catering page content")
    } finally {
      setLoading(false)
    }
  }

  const handleCateringAddLunchPackItem = () => {
    const newId = Math.max(...cateringPageContent.lunchPacks.items.map((item) => item.id), 0) + 1
    setCateringPageContent((prev) => ({
      ...prev,
      lunchPacks: {
        ...prev.lunchPacks,
        items: [...prev.lunchPacks.items, { id: newId, title: "", description: "", price: "", image: "" }],
      },
    }))
  }

  const handleCateringRemoveLunchPackItem = (id: number) => {
    setCateringPageContent((prev) => ({
      ...prev,
      lunchPacks: {
        ...prev.lunchPacks,
        items: prev.lunchPacks.items.filter((item) => item.id !== id),
      },
    }))
  }

  const handleCateringUpdateLunchPackItem = (id: number, field: keyof CateringCarouselItem, value: string) => {
    setCateringPageContent((prev) => ({
      ...prev,
      lunchPacks: {
        ...prev.lunchPacks,
        items: prev.lunchPacks.items.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
      },
    }))
  }

  const handleCateringAddCakeRangeItem = () => {
    const newId = Math.max(...cateringPageContent.cakeRange.items.map((item) => item.id), 0) + 1
    setCateringPageContent((prev) => ({
      ...prev,
      cakeRange: {
        ...prev.cakeRange,
        items: [...prev.cakeRange.items, { id: newId, title: "", description: "", price: "", image: "" }],
      },
    }))
  }

  const handleCateringRemoveCakeRangeItem = (id: number) => {
    setCateringPageContent((prev) => ({
      ...prev,
      cakeRange: {
        ...prev.cakeRange,
        items: prev.cakeRange.items.filter((item) => item.id !== id),
      },
    }))
  }

  const handleCateringUpdateCakeRangeItem = (id: number, field: keyof CateringCarouselItem, value: string) => {
    setCateringPageContent((prev) => ({
      ...prev,
      cakeRange: {
        ...prev.cakeRange,
        items: prev.cakeRange.items.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
      },
    }))
  }

  const handleCateringAddYourWayItem = () => {
    const newId = Math.max(...cateringPageContent.cateringYourWay.items.map((item) => item.id), 0) + 1
    setCateringPageContent((prev) => ({
      ...prev,
      cateringYourWay: {
        ...prev.cateringYourWay,
        items: [...prev.cateringYourWay.items, { id: newId, src: "", alt: "", title: "", description: "" }],
      },
    }))
  }

  const handleCateringRemoveYourWayItem = (id: number) => {
    setCateringPageContent((prev) => ({
      ...prev,
      cateringYourWay: {
        ...prev.cateringYourWay,
        items: prev.cateringYourWay.items.filter((item) => item.id !== id),
      },
    }))
  }

  const handleCateringUpdateYourWayItem = (id: number, field: keyof CateringYourWayItem, value: string) => {
    setCateringPageContent((prev) => ({
      ...prev,
      cateringYourWay: {
        ...prev.cateringYourWay,
        items: prev.cateringYourWay.items.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
      },
    }))
  }

  if (initialLoading) {
    return (
      <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <div className="h-8 bg-gray-200 rounded w-96 mx-auto mb-4 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-64 mx-auto animate-pulse"></div>
        </div>
        <div className="space-y-6">
          <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
          <FormSkeleton />
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
      <div className="fixed top-15 right-4 z-50">
        <LivePreviewToggle isEnabled={livePreviewEnabled} onToggle={setLivePreviewEnabled} />
      </div>

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">Manage Catering Page</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Manage all sections of the Catering page content</p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Catering Page Content</CardTitle>
          <CardDescription>Manage all sections of the Catering page.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Hero Section */}
          <div className="border rounded-lg p-4 bg-gray-50 dark:bg-transparent">
            <h3 className="text-lg font-semibold mb-4">Hero Section</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Cake Menu */}
              <div className="space-y-2">
                <h4 className="font-medium">Cake Menu Half</h4>
                <div>
                  <Label>Image URL</Label>
                  <Input
                    value={cateringPageContent.hero.cakeMenu.image}
                    onChange={(e) =>
                      setCateringPageContent((prev) => ({
                        ...prev,
                        hero: {
                          ...prev.hero,
                          cakeMenu: { ...prev.hero.cakeMenu, image: e.target.value },
                        },
                      }))
                    }
                    placeholder="Enter image URL"
                  />
                </div>
                <div>
                  <Label>Title</Label>
                  <Input
                    value={cateringPageContent.hero.cakeMenu.title}
                    onChange={(e) =>
                      setCateringPageContent((prev) => ({
                        ...prev,
                        hero: {
                          ...prev.hero,
                          cakeMenu: { ...prev.hero.cakeMenu, title: e.target.value },
                        },
                      }))
                    }
                    placeholder="Enter title"
                  />
                </div>
                <div>
                  <Label>Button Text</Label>
                  <Input
                    value={cateringPageContent.hero.cakeMenu.buttonText}
                    onChange={(e) =>
                      setCateringPageContent((prev) => ({
                        ...prev,
                        hero: {
                          ...prev.hero,
                          cakeMenu: { ...prev.hero.cakeMenu, buttonText: e.target.value },
                        },
                      }))
                    }
                    placeholder="Enter button text"
                  />
                </div>
                <div>
                  <Label>Button Link</Label>
                  <Input
                    value={cateringPageContent.hero.cakeMenu.buttonLink}
                    onChange={(e) =>
                      setCateringPageContent((prev) => ({
                        ...prev,
                        hero: {
                          ...prev.hero,
                          cakeMenu: { ...prev.hero.cakeMenu, buttonLink: e.target.value },
                        },
                      }))
                    }
                    placeholder="Enter button link URL"
                  />
                </div>
              </div>
              {/* Full Menu */}
              <div className="space-y-2">
                <h4 className="font-medium">Full Menu Half</h4>
                <div>
                  <Label>Image URL</Label>
                  <Input
                    value={cateringPageContent.hero.fullMenu.image}
                    onChange={(e) =>
                      setCateringPageContent((prev) => ({
                        ...prev,
                        hero: {
                          ...prev.hero,
                          fullMenu: { ...prev.hero.fullMenu, image: e.target.value },
                        },
                      }))
                    }
                    placeholder="Enter image URL"
                  />
                </div>
                <div>
                  <Label>Title</Label>
                  <Input
                    value={cateringPageContent.hero.fullMenu.title}
                    onChange={(e) =>
                      setCateringPageContent((prev) => ({
                        ...prev,
                        hero: {
                          ...prev.hero,
                          fullMenu: { ...prev.hero.fullMenu, title: e.target.value },
                        },
                      }))
                    }
                    placeholder="Enter title"
                  />
                </div>
                <div>
                  <Label>Button Text</Label>
                  <Input
                    value={cateringPageContent.hero.fullMenu.buttonText}
                    onChange={(e) =>
                      setCateringPageContent((prev) => ({
                        ...prev,
                        hero: {
                          ...prev.hero,
                          fullMenu: { ...prev.hero.fullMenu, buttonText: e.target.value },
                        },
                      }))
                    }
                    placeholder="Enter button text"
                  />
                </div>
                <div>
                  <Label>Button Link</Label>
                  <Input
                    value={cateringPageContent.hero.fullMenu.buttonLink}
                    onChange={(e) =>
                      setCateringPageContent((prev) => ({
                        ...prev,
                        hero: {
                          ...prev.hero,
                          fullMenu: { ...prev.hero.fullMenu, buttonLink: e.target.value },
                        },
                      }))
                    }
                    placeholder="Enter button link URL"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Catering Intro Section */}
          <div className="border rounded-lg p-4 bg-gray-50 dark:bg-transparent">
            <h3 className="text-lg font-semibold mb-4">Catering Introduction Section</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Image URL</Label>
                <Input
                  value={cateringPageContent.cateringIntro.image}
                  onChange={(e) =>
                    setCateringPageContent((prev) => ({
                      ...prev,
                      cateringIntro: { ...prev.cateringIntro, image: e.target.value },
                    }))
                  }
                  placeholder="Enter image URL"
                />
              </div>
              <div>
                <Label>Title</Label>
                <Input
                  value={cateringPageContent.cateringIntro.title}
                  onChange={(e) =>
                    setCateringPageContent((prev) => ({
                      ...prev,
                      cateringIntro: { ...prev.cateringIntro, title: e.target.value },
                    }))
                  }
                  placeholder="Enter title"
                />
              </div>
              <div className="md:col-span-2">
                <Label>Description</Label>
                <Textarea
                  value={cateringPageContent.cateringIntro.description}
                  onChange={(e) =>
                    setCateringPageContent((prev) => ({
                      ...prev,
                      cateringIntro: { ...prev.cateringIntro, description: e.target.value },
                    }))
                  }
                  placeholder="Enter description"
                  rows={3}
                />
              </div>
              <div className="md:col-span-2">
                <Label>Menu Link URL</Label>
                <Input
                  value={cateringPageContent.cateringIntro.menuLink}
                  onChange={(e) =>
                    setCateringPageContent((prev) => ({
                      ...prev,
                      cateringIntro: { ...prev.cateringIntro, menuLink: e.target.value },
                    }))
                  }
                  placeholder="Enter menu link URL"
                />
              </div>
            </div>
          </div>

          {/* Boxes & Lunch Packs Section */}
          <div className="border rounded-lg p-4 bg-gray-50 dark:bg-transparent">
            <h3 className="text-lg font-semibold mb-4">Boxes & Lunch Packs</h3>
            <div className="space-y-2 mb-4">
              <div>
                <Label>Section Title</Label>
                <Input
                  value={cateringPageContent.lunchPacks.title}
                  onChange={(e) =>
                    setCateringPageContent((prev) => ({
                      ...prev,
                      lunchPacks: { ...prev.lunchPacks, title: e.target.value },
                    }))
                  }
                  placeholder="Enter section title"
                />
              </div>
              <div>
                <Label>Section Description</Label>
                <Textarea
                  value={cateringPageContent.lunchPacks.description}
                  onChange={(e) =>
                    setCateringPageContent((prev) => ({
                      ...prev,
                      lunchPacks: { ...prev.lunchPacks, description: e.target.value },
                    }))
                  }
                  placeholder="Enter section description"
                  rows={2}
                />
              </div>
            </div>
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium">Lunch Pack Items</h4>
              <Button onClick={handleCateringAddLunchPackItem} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </Button>
            </div>
            {cateringPageContent.lunchPacks.items.map((item) => (
              <div key={item.id} className="border rounded p-3 mb-3 bg-background">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Item {item.id}</span>
                  <Button onClick={() => handleCateringRemoveLunchPackItem(item.id)} variant="destructive" size="sm">
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs">Title</Label>
                    <Input
                      value={item.title}
                      onChange={(e) => handleCateringUpdateLunchPackItem(item.id, "title", e.target.value)}
                      placeholder="Item title"
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Price</Label>
                    <Input
                      value={item.price}
                      onChange={(e) => handleCateringUpdateLunchPackItem(item.id, "price", e.target.value)}
                      placeholder="Item price"
                      className="text-sm"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label className="text-xs">Description</Label>
                    <Textarea
                      value={item.description}
                      onChange={(e) => handleCateringUpdateLunchPackItem(item.id, "description", e.target.value)}
                      placeholder="Item description"
                      rows={2}
                      className="text-sm"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label className="text-xs">Image URL</Label>
                    <Input
                      value={item.image}
                      onChange={(e) => handleCateringUpdateLunchPackItem(item.id, "image", e.target.value)}
                      placeholder="Item image URL"
                      className="text-sm"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* All Cake Range Section */}
          <div className="border rounded-lg p-4 bg-gray-50 dark:bg-transparent">
            <h3 className="text-lg font-semibold mb-4">All Cake Range</h3>
            <div className="space-y-2 mb-4">
              <div>
                <Label>Section Title</Label>
                <Input
                  value={cateringPageContent.cakeRange.title}
                  onChange={(e) =>
                    setCateringPageContent((prev) => ({
                      ...prev,
                      cakeRange: { ...prev.cakeRange, title: e.target.value },
                    }))
                  }
                  placeholder="Enter section title"
                />
              </div>
              <div>
                <Label>Section Description</Label>
                <Textarea
                  value={cateringPageContent.cakeRange.description}
                  onChange={(e) =>
                    setCateringPageContent((prev) => ({
                      ...prev,
                      cakeRange: { ...prev.cakeRange, description: e.target.value },
                    }))
                  }
                  placeholder="Enter section description"
                  rows={2}
                />
              </div>
            </div>
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium">Cake Range Items</h4>
              <Button onClick={handleCateringAddCakeRangeItem} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </Button>
            </div>
            {cateringPageContent.cakeRange.items.map((item) => (
              <div key={item.id} className="border rounded p-3 mb-3 bg-background">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Item {item.id}</span>
                  <Button onClick={() => handleCateringRemoveCakeRangeItem(item.id)} variant="destructive" size="sm">
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs">Title</Label>
                    <Input
                      value={item.title}
                      onChange={(e) => handleCateringUpdateCakeRangeItem(item.id, "title", e.target.value)}
                      placeholder="Item title"
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Price</Label>
                    <Input
                      value={item.price}
                      onChange={(e) => handleCateringUpdateCakeRangeItem(item.id, "price", e.target.value)}
                      placeholder="Item price"
                      className="text-sm"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label className="text-xs">Description</Label>
                    <Textarea
                      value={item.description}
                      onChange={(e) => handleCateringUpdateCakeRangeItem(item.id, "description", e.target.value)}
                      placeholder="Item description"
                      rows={2}
                      className="text-sm"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label className="text-xs">Image URL</Label>
                    <Input
                      value={item.image}
                      onChange={(e) => handleCateringUpdateCakeRangeItem(item.id, "image", e.target.value)}
                      placeholder="Item image URL"
                      className="text-sm"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Catering Your Way Section */}
          <div className="border rounded-lg p-4 bg-gray-50 dark:bg-transparent">
            <h3 className="text-lg font-semibold mb-4">Catering, Your Way</h3>
            <div className="space-y-2 mb-4">
              <div>
                <Label>Section Title</Label>
                <Input
                  value={cateringPageContent.cateringYourWay.title}
                  onChange={(e) =>
                    setCateringPageContent((prev) => ({
                      ...prev,
                      cateringYourWay: { ...prev.cateringYourWay, title: e.target.value },
                    }))
                  }
                  placeholder="Enter section title"
                />
              </div>
              <div>
                <Label>Section Description</Label>
                <Textarea
                  value={cateringPageContent.cateringYourWay.description}
                  onChange={(e) =>
                    setCateringPageContent((prev) => ({
                      ...prev,
                      cateringYourWay: { ...prev.cateringYourWay, description: e.target.value },
                    }))
                  }
                  placeholder="Enter section description"
                  rows={2}
                />
              </div>
            </div>
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium">Catering Options</h4>
              <Button onClick={handleCateringAddYourWayItem} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Option
              </Button>
            </div>
            {cateringPageContent.cateringYourWay.items.map((item) => (
              <div key={item.id} className="border rounded p-3 mb-3 bg-background">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Option {item.id}</span>
                  <Button onClick={() => handleCateringRemoveYourWayItem(item.id)} variant="destructive" size="sm">
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs">Title</Label>
                    <Input
                      value={item.title}
                      onChange={(e) => handleCateringUpdateYourWayItem(item.id, "title", e.target.value)}
                      placeholder="Option title"
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Image URL</Label>
                    <Input
                      value={item.src}
                      onChange={(e) => handleCateringUpdateYourWayItem(item.id, "src", e.target.value)}
                      placeholder="Image URL"
                      className="text-sm"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label className="text-xs">Description</Label>
                    <Textarea
                      value={item.description}
                      onChange={(e) => handleCateringUpdateYourWayItem(item.id, "description", e.target.value)}
                      placeholder="Option description"
                      rows={2}
                      className="text-sm"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label className="text-xs">Alt Text</Label>
                    <Input
                      value={item.alt}
                      onChange={(e) => handleCateringUpdateYourWayItem(item.id, "alt", e.target.value)}
                      placeholder="Alt text for image"
                      className="text-sm"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button onClick={handleCateringPageSave} disabled={loading} className="w-full md:w-auto">
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            Save Catering Page
          </Button>
          <LivePreviewPanel isEnabled={livePreviewEnabled} sectionId="catering-page" previewData={cateringPageContent} />
        </CardContent>
      </Card>
    </div>
  )
}
