import { Skeleton } from "@/components/ui/skeleton"

// Reusable skeleton components for consistent loading states

export const StatsCardSkeleton = () => (
  <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
    {[...Array(4)].map((_, i) => (
      <Skeleton key={`stats-${i}`} className="h-24 w-full rounded-lg" />
    ))}
  </div>
)

export const TableSkeleton = ({ rows = 5, columns = 5 }) => (
  <div className="space-y-4 w-full">
    <div className="flex justify-between items-center">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-10 w-36" />
    </div>
    <div className="space-y-2">
      <div className={`grid grid-cols-${columns} gap-4`}>
        {[...Array(columns)].map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
      {[...Array(rows)].map((_, rowIndex) => (
        <div key={rowIndex} className={`grid grid-cols-${columns} gap-4`}>
          {[...Array(columns)].map((_, colIndex) => (
            <Skeleton key={colIndex} className="h-12 w-full" />
          ))}
        </div>
      ))}
    </div>
  </div>
)

export const CardSkeleton = () => (
  <div className="border rounded-lg p-6 shadow-sm bg-background animate-pulse">
    <div className="flex justify-between items-center mb-4">
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-8 w-8 rounded" />
    </div>
    <div className="space-y-3">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
    <div className="mt-4 flex gap-2">
      <Skeleton className="h-8 w-16" />
      <Skeleton className="h-8 w-16" />
    </div>
  </div>
)

export const FormSkeleton = () => (
  <div className="space-y-6">
    <div className="space-y-2">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-10 w-full" />
    </div>
    <div className="space-y-2">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-24 w-full" />
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
    <div className="flex justify-end gap-2">
      <Skeleton className="h-10 w-20" />
      <Skeleton className="h-10 w-24" />
    </div>
  </div>
)

export const ChartSkeleton = ({ height = "350px" }) => (
  <div className="space-y-4">
    <div className="flex justify-between items-center">
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-4 w-20" />
    </div>
    <Skeleton className={`w-full rounded-lg`} style={{ height }} />
  </div>
)

export const GallerySkeleton = ({ items = 6 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(items)].map((_, i) => (
      <div key={i} className="space-y-3">
        <Skeleton className="h-48 w-full rounded-lg" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    ))}
  </div>
)

export const BlogCardSkeleton = () => (
  <div className="bg-white rounded-lg overflow-hidden shadow-lg animate-pulse">
    <Skeleton className="h-48 w-full" />
    <div className="p-6">
      <Skeleton className="h-6 w-3/4 mb-3" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-2/3 mb-4" />
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
  </div>
)

export const ProductCardSkeleton = () => (
  <div className="border rounded-lg overflow-hidden shadow-sm animate-pulse">
    <Skeleton className="h-48 w-full" />
    <div className="p-4">
      <Skeleton className="h-5 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/2 mb-3" />
      <div className="flex justify-between items-center">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
  </div>
)
