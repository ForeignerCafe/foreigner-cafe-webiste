"use client";

import { useState } from "react";
import { Mail, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import toast from "react-hot-toast";
import axiosInstance from "@/lib/axios";

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Email is required");
      toast.error("Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      toast.error("Invalid email format");
      return;
    }

    setIsLoading(true);
    const toastId = toast.loading("Sending reset email...");

    try {
      const res = await axiosInstance.post("/api/auth/forgot-password", {
        email,
      });

      if (res.data.success) {
        toast.success("Password reset and email sent!", { id: toastId });
        setIsEmailSent(true);
      } else {
        toast.error(res.data.message || "Failed to reset password", {
          id: toastId,
        });
      }
    } catch (err: any) {
      if (err.response?.status === 404) {
        toast.error("Admin user not found", { id: toastId });
        setError("Admin user not found");
      } else {
        toast.error("Something went wrong. Please try again.", {
          id: toastId,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    // Clear error when user starts typing
    if (error) {
      setError("");
    }
  };

  return (
    <div className="w-full max-w-xl sm:max-w-md mx-auto mt-20 md:mt-0">
      <Card className="bg-white/95 dark:bg-black/95 backdrop-blur-md border-white/20 dark:border-white/20 shadow-2xl">
        <CardContent className="p-6 sm:p-8">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-6 sm:mb-8 flex justify-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm sm:text-lg">
                  FC
                </span>
              </div>
              <span className="text-gray-900 dark:text-white text-lg sm:text-xl font-semibold">
                Foreigner Cafe
              </span>
            </div>
          </div>

          {!isEmailSent ? (
            <>
              {/* Header */}
              <div className="space-y-2 text-center mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  Forgot Password?
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
                  Enter your email address and we'll send you a reset link
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-gray-700 dark:text-white text-sm font-medium"
                  >
                    Admin Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-300" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="admin@foreignercafe.com"
                      value={email}
                      onChange={handleInputChange}
                      className={`pl-10 h-11 sm:h-12 bg-white dark:bg-black border-gray-300 dark:border-white/30 focus:border-orange-500 focus:ring-orange-500 dark:text-white dark:placeholder:text-gray-400 rounded-lg text-sm sm:text-base ${
                        error ? "border-red-500 dark:border-red-500" : ""
                      }`}
                      required
                    />
                  </div>
                  {error && (
                    <p className="text-red-500 text-xs mt-1">{error}</p>
                  )}
                </div>

                {/* Send Reset Link Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 sm:h-12 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Send Reset Link"
                  )}
                </Button>
              </form>
            </>
          ) : (
            /* Success State */
            <div className="text-center space-y-6">
              {/* Success Icon */}
              <div className="flex justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                </div>
              </div>

              {/* Success Message */}
              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  Check Your Email
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                  We've sent a password reset link to
                </p>
                <p className="text-orange-500 font-medium text-sm sm:text-base break-all">
                  {email}
                </p>
              </div>

              {/* Instructions */}
              <div className="bg-gray-50 dark:bg-white/5 rounded-lg p-4 text-left">
                <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed">
                  Click the link in the email to reset your password. If you
                  don't see the email, check your spam folder. The link will
                  expire in 24 hours.
                </p>
              </div>
              {/* Resend Button */}
              <Button
                type="button"
                onClick={() => {
                  setIsEmailSent(false);
                  setEmail("");
                  setError("");
                }}
                className="w-full h-11 sm:h-12 border-gray-300 dark:border-white/30 hover:bg-gray-50 dark:hover:bg-white/10 transition-colors bg-white dark:bg-black dark:text-white rounded-lg text-sm sm:text-base"
              >
                Send to Different Email
              </Button>
            </div>
          )}

          {/* Back to Login Link */}
          <div className="text-center mt-6 sm:mt-8">
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
              Remember your password?{" "}
              <Link
                href="/login"
                className="text-orange-500 hover:text-orange-600 font-medium transition-colors focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:outline-none"
              >
                Back to Login
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
