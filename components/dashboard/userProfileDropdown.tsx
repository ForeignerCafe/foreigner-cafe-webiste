"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import toast from "react-hot-toast";
import Image from "next/image";

type UserProfile = {
  username: string;
  avatar: string;
  email: string;
};

export default function UserProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get("/api/auth/profile");
        if (res.data.success) {
          setUserProfile(res.data.user);
        } else {
          throw new Error(res.data.message || "Failed to load profile");
        }
      } catch (err: any) {
        console.error("Profile load error:", err);
        setError("Failed to load profile");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const getInitials = (username: string) => {
    return username?.slice(0, 2).toUpperCase() || "?";
  };

  const handleLogout = async () => {
    const toastId = toast.loading("Signing out...");
    try {
      const res = await axiosInstance.post("/api/auth/logout");
      if (res.data.success) {
        toast.success("Logout successful!", { id: toastId });
        window.location.href = "/login";
      } else {
        toast.error(res.data.message || "Logout failed", { id: toastId });
      }
    } catch (err) {
      toast.error("Logout error", { id: toastId });
    } finally {
      setIsOpen(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2 border border-gray-200 dark:border-gray-700 rounded-md px-2 py-1">
        <div className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
      </div>
    );
  }

  if (error || !userProfile) {
    return (
      <div className="flex items-center space-x-2 border border-gray-200 dark:border-gray-700 rounded-md px-2 py-1">
        <div className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-medium">
          ?
        </div>
      </div>
    );
  }
  return (
    <div className="relative z-50">
      <button
        className="flex items-center space-x-2 border border-gray-200 dark:border-gray-700 px-2 py-1 hover:bg-gray-50 dark:hover:bg-[#28282B] transition-colors rounded-md"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-medium">
          <Image
            src={userProfile.avatar}
            alt={`${userProfile.username}'s initials`}
            width={24} // Size of the image
            height={24} // Size of the image
            className="rounded-full"
          />
        </div>
        <div className="hidden sm:block text-sm">
          <div className="font-medium">{userProfile.username}</div>
        </div>
        <ChevronDown className="h-4 w-4 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-56 origin-top-right rounded-md bg-white dark:bg-[#28282B] shadow-lg z-50 max-h-80 overflow-y-auto">
          <div className="py-2">
            <div className="px-4 py-2 text-center mb-4">
              <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mx-auto">
                <Image
                  src={userProfile.avatar}
                  alt={`${userProfile.username}'s avatar`}
                  width={40} // Adjust the width
                  height={40} // Adjust the height
                  className="rounded-full" // Ensures the image is rounded
                />
              </div>
              <div className="font-medium text-lg mt-2">
                {userProfile.username}
              </div>
              {/* <div className=" text-md mt-2">{userProfile.email}</div> */}
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {userProfile.email}
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>

            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
