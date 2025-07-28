"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import axiosInstance from "@/lib/axios"
import { Eye, EyeOff, User, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import toast from "react-hot-toast"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  })

  const validateForm = () => {
    let valid = true
    const newErrors = { username: "", password: "" }

    if (!formData.username.trim()) {
      newErrors.username = "Username is required"
      valid = false
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
      valid = false
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

 async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  if (!validateForm()) {
    toast.error("Please fill in all fields correctly");
    return;
  }

  setIsLoading(true);
  const toastId = toast.loading("Signing in...");

  try {
    const res = await axiosInstance.post("/api/auth/login", {
      username: formData.username,
      password: formData.password,
    });

    if (res.data.success) {
      toast.success("Login successful!", { id: toastId });
      router.push("/admin/dashboard");
    } else {
      // Handle API response errors (if your backend returns specific messages)
      toast.error(res.data.message || "Login failed", { id: toastId });
    }
  } catch (err: any) {
    // Handle different error cases
    if (err.response?.status === 401) {
   
      if (err.response.data?.message?.includes("username")) {
        toast.error("Username does not exist", { id: toastId });
        setErrors(prev => ({ ...prev, username: "Username not found" }));
      } else if (err.response.data?.message?.includes("password")) {
        toast.error("Incorrect password", { id: toastId });
        setErrors(prev => ({ ...prev, password: "Wrong password" }));
      } else {
        toast.error("Invalid username or password", { id: toastId });
      }
    } else if (err.response?.status === 404) {
      toast.error("Login endpoint not found", { id: toastId });
    } else {
      toast.error("Login failed. Please try again.", { id: toastId });
    }
  } finally {
    setIsLoading(false);
  }
}

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: "",
      }))
    }
  }
  return (
    <div className="w-full max-w-lg sm:max-w-md mx-auto mt-20 md:mt-0">
      <Card className="bg-white/95 dark:bg-black/95 backdrop-blur-md border-white/20 dark:border-white/20 shadow-2xl">
        <CardContent className="p-6 sm:p-8">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-6 sm:mb-8 flex justify-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm sm:text-lg">FC</span>
              </div>
              <span className="text-gray-900 dark:text-white text-lg sm:text-xl font-semibold">Foreigner Cafe</span>
            </div>
          </div>

          {/* Header */}
          <div className="space-y-2 text-center mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Admin Login</h2>
            <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
              Access the Foreigner Cafe management dashboard
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Username Field */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-700 dark:text-white text-sm font-medium">
                Username
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-300" />
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className={`pl-10 h-11 sm:h-12 bg-white dark:bg-black border-gray-300 dark:border-white/30 focus:border-orange-500 focus:ring-orange-500 dark:text-white dark:placeholder:text-gray-400 rounded-lg text-sm sm:text-base ${
                    errors.username ? "border-red-500 dark:border-red-500" : ""
                  }`}
                  required
                />
              </div>
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">{errors.username}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="text-gray-700 dark:text-white text-sm font-medium">
                  Password
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-xs sm:text-sm text-orange-500 hover:text-orange-600 transition-colors focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-300" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`pl-10 pr-12 h-11 sm:h-12 bg-white dark:bg-black border-gray-300 dark:border-white/30 focus:border-orange-500 focus:ring-orange-500 dark:text-white dark:placeholder:text-gray-400 rounded-lg text-sm sm:text-base ${
                    errors.password ? "border-red-500 dark:border-red-500" : ""
                  }`}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-9 w-9 sm:h-10 sm:w-10 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400 dark:text-gray-300" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400 dark:text-gray-300" />
                  )}
                </Button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 sm:h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Log in"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
