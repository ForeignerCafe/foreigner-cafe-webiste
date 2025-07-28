// components/ui/custom-toaster.tsx
"use client"

import { Toaster as HotToaster } from "react-hot-toast"

export function Toaster() {
  return (
    <HotToaster
      position="top-center"
      gutter={16}
      containerStyle={{
        top: 7,
        left: 0,
        right: 0,
      }}
      toastOptions={{
        // Base styles for all toasts
        className: `
          !bg-background !text-foreground 
          !border !border-border
          !shadow-lg !rounded-lg
          !px-4 !py-2
          !max-w-[420px] !w-full
          dark:!shadow-neutral-800/50
        `,
        duration: 4000,
        
        // Success toast
        success: {
          className: `
            !bg-green-50 dark:!bg-green-900/30
            !border-green-200 dark:!border-green-800
            !text-green-800 dark:!text-green-200
          `,
          iconTheme: {
            primary: "hsl(142.1, 76.2%, 36.3%)", // green-600
            secondary: "white",
          },
        },
        
        // Error toast
        error: {
          className: `
            !bg-red-50 dark:!bg-red-900/30
            !border-red-200 dark:!border-red-800
            !text-red-800 dark:!text-red-200
          `,
          iconTheme: {
            primary: "hsl(0, 84%, 60%)", // red-500
            secondary: "white",
          },
        },
        
        // Loading toast
        loading: {
          className: `
            !bg-orange-50 dark:!bg-orange-900/30
            !border-orange-200 dark:!border-orange-800
            !text-orange-800 dark:!text-orange-200
          `,
          iconTheme: {
            primary: "hsl(24.6, 95%, 53.1%)", // orange-500
            secondary: "hsl(20.5, 90.2%, 48.2%)", // orange-600
          },
        },
        
        // Default toast (used for custom toasts)
        custom: {
          className: `
            !bg-background !text-foreground
            !border !border-border
          `,
          iconTheme: {
            primary: "hsl(24.6, 95%, 53.1%)", // orange-500
            secondary: "white",
          },
        }
      }}
    />
  )
}
