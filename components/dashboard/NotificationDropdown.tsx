// // @ts-nocheck
// "use client";

// import { useState, useRef, useEffect } from "react";
// import Pusher from "pusher-js";
// import axiosInstance from "@/utils/axios";
// import { Check, X, ExternalLink } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Separator } from "@/components/ui/separator";
// import { cn } from "@/lib/utils";
// import { CiBellOn } from "react-icons/ci";

// export default function NotificationDropdown() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [notifications, setNotifications] = useState<any[]>([]);
//   const [showAll, setShowAll] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);
//   const pusherRef = useRef<Pusher | null>(null);
//   const [profile, setProfile] = useState<{
//     id: number;
//     name: string;
//     email: string;
//   } | null>(null);

//   const unreadCount = notifications.filter((n) => !n.is_read).length;

//   const fetchNotifications = async () => {
//     try {
//       const res = await axiosInstance.get("/notifications");
//       console.log("🔔 API /notifications response:", res.data);
//       setNotifications(res.data.notifications);
//     } catch (error) {
//       console.error("Failed to fetch notifications:", error);
//     }
//   };

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setIsOpen(false);
//         setShowAll(false);
//       }
//     };
//     if (isOpen) document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [isOpen]);

//   useEffect(() => {
//     const fetchProfileAndInit = async () => {
//       try {
//         const res = await axiosInstance.get("/profile");
//         const userProfile = res.data;
//         setProfile(userProfile);

//         await fetchNotifications();

//         const pusher = new Pusher("60050309a85a94efaa2e", {
//           cluster: "ap2",
//           authorizer: (channel, options) => ({
//             authorize: async (socketId: string, callback: Function) => {
//               try {
//                 const authRes = await axiosInstance.post(
//                   "/broadcasting/auth",
//                   {
//                     socket_id: socketId,
//                     channel_name: channel.name,
//                   },
//                   { withCredentials: true }
//                 );
//                 callback(null, authRes.data);
//               } catch (error) {
//                 console.error("Pusher auth error:", error);
//                 callback(error);
//               }
//             },
//           }),
//         });

//         const channel = pusher.subscribe(
//           `private-notifications.${userProfile.id}`
//         );

//         channel.bind("pusher:subscription_succeeded", () => {
//           console.log("✅ Subscribed to private-notifications." + userProfile.id);

//           channel.bind("form.submitted", (data: any) => {
//             try {
//               const parsed = typeof data === "string" ? JSON.parse(data) : data;
             
//               setNotifications((prev) => [
//                 {
//                   id: parsed.id || crypto.randomUUID(),
//                   message: `New submission received for '${parsed.form_title || "a form"}'`,
//                   is_read: false,
//                   form_id: parsed.form_id,
//                   submission_id: parsed.submission_id,
//                   created_at: new Date().toISOString(),
//                   updated_at: new Date().toISOString(),
//                 },
//                 ...prev,
//               ]);
//             } catch (e) {
//               console.warn("⚠️ Could not parse event:", data);
//             }
//           });
//         });

//         pusherRef.current = pusher;
//       } catch (e) {
//         console.error("❌ Failed to fetch profile or init Pusher:", e);
//       }
//     };

//     fetchProfileAndInit();

//     return () => {
//       if (pusherRef.current) {
//         pusherRef.current.disconnect();
//         pusherRef.current = null;
//       }
//     };
//   }, []);

//   const handleMarkAllAsRead = async () => {
//     try {
//       const unread = Array.isArray(notifications)
//         ? notifications.filter((n) => !n.is_read)
//         : [];

//       await Promise.all(
//         unread.map((n) =>
//           axiosInstance.post(`/notifications/${n.id}/read`)
//         )
//       );

//       setNotifications((prev) =>
//         Array.isArray(prev) ? prev.map((n) => ({ ...n, is_read: true })) : []
//       );
//       setIsOpen(false);
//     } catch (error) {
//       console.error("Failed to mark all as read:", error);
//     }
//   };

//   const handleDeleteNotification = (e: React.MouseEvent, id: string) => {
//     e.stopPropagation();
//     setNotifications((prev) => prev.filter((n) => n.id !== id));
//   };

//   const getNotificationIcon = (n: any) => {
//     if (n.form_id && n.submission_id) return "📝";
//     if (n.message.toLowerCase().includes("payment")) return "💳";
//     if (n.message.toLowerCase().includes("team")) return "👥";
//     return "🔔";
//   };

//   const getNotificationColor = (n: any) => {
//     if (n.form_id && n.submission_id) return "border-l-blue-500";
//     if (n.message.toLowerCase().includes("payment"))
//       return "border-l-green-500";
//     if (n.message.toLowerCase().includes("team")) return "border-l-purple-500";
//     return "border-l-gray-500";
//   };

//   const getNotificationTitle = (n: any) => {
//     if (n.form_id && n.submission_id) return "New Form Submission";
//     if (n.message.toLowerCase().includes("payment"))
//       return "Payment Notification";
//     if (n.message.toLowerCase().includes("team")) return "Team Update";
//     return "Notification";
//   };

//   const formatTimestamp = (timestamp: string) => {
//     const date = new Date(timestamp);
//     const now = new Date();
//     const diff = Math.floor((now.getTime() - date.getTime()) / 60000);
//     if (diff < 1) return "Just now";
//     if (diff < 60) return `${diff}m ago`;
//     if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
//     return `${Math.floor(diff / 1440)}d ago`;
//   };

//   const handleNotificationClick = async (notification: any) => {
//     if (!notification.is_read) {
//       try {
//         await axiosInstance.post(`/notifications/${notification.id}/read`);
//         setNotifications((prev) =>
//           prev.map((n) =>
//             n.id === notification.id ? { ...n, is_read: true } : n
//           )
//         );
//       } catch (error) {
//         console.error("Failed to mark notification as read:", error);
//       }
//     }
//   };

//   const displayedNotifications = showAll ? notifications : notifications.slice(0, 3);

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <Button
//         variant="ghost"
//         size="sm"
//         className="relative p-2 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
//         onClick={() => {
//           setIsOpen(!isOpen);
//           if (!isOpen) setShowAll(false);
//         }}
//       >
//         <CiBellOn className="!h-6 !w-6" />
//         {unreadCount > 0 && (
//           <Badge
//             // variant="destructive"
//             className="absolute -top-1 -right-1 h- w-5 p-0 text-xs flex items-center justify-center rounded-full"
//           >
//             {unreadCount > 99 ? "99+" : unreadCount}
//           </Badge>
//         )}
//       </Button>

//       {isOpen && (
//         <div className="absolute right-0 top-full mt-2 w-96 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 overflow-hidden">
//           <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
//             <div className="flex items-center gap-2">
//               <h3 className="font-semibold text-gray-900 dark:text-gray-100">
//                 Notifications
//               </h3>
//               {unreadCount > 0 && (
//                 <Badge variant="secondary" className="text-xs">
//                   {unreadCount} new
//                 </Badge>
//               )}
//             </div>
//             {unreadCount > 0 && (
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={handleMarkAllAsRead}
//                 className="text-xs h-auto p-1 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
//               >
//                 <Check className="h-3 w-3 mr-1" />
//                 Mark all read
//               </Button>
//             )}
//           </div>

//           <ScrollArea className={showAll ? "h-[calc(100vh-200px)]" : "h-[280px]"}>
//   {displayedNotifications.length === 0 ? (
//     <div className="p-8 text-center text-gray-500 dark:text-gray-400">
//       <CiBellOn className="h-20 w-20 mx-auto mb-2 opacity-30" />
//       <p className="text-sm">No notifications yet</p>
//       <p className="text-xs mt-1">
//         We'll notify you when something happens
//       </p>
//     </div>
//   ) : (
//     <div className="divide-y divide-gray-200 dark:divide-gray-700">
//       {displayedNotifications.map((n) => (
//         <div
//           key={n.id}
//           className={cn(
//             "p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors",
//             !n.is_read && "bg-transparent"
//           )}
//           onClick={() => handleNotificationClick(n)}
//         >
//           <div className="flex items-start gap-3">
//             <div className="text-xl mt-0.5">{getNotificationIcon(n)}</div>
//             <div className="flex-1 min-w-0">
//               <div className="flex items-start justify-between">
//                 <p
//                   className={cn(
//                     "text-sm font-medium",
//                     n.is_read
//                       ? "text-gray-700 dark:text-gray-300"
//                       : "text-gray-900 dark:text-gray-100"
//                   )}
//                 >
//                   {getNotificationTitle(n)}
//                 </p>
//                 <span className="text-xs text-gray-400 dark:text-gray-500">
//                   {formatTimestamp(n.created_at)}
//                 </span>
//               </div>
//               <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
//                 {n.message}
//               </p>
//              {n.form_id && (
//   <div className="mt-2 flex items-center gap-1">
//     <ExternalLink className="h-3 w-3 text-gray-400" />
//     <a
//       href={`/viewAnalytics/${n.form_id}`}
//       className="text-xs text-gray-400 hover:underline"
//     >
//       View submission
//     </a>
//   </div>
// )}

//             </div>
//             <div className="flex items-center gap-1 ml-2">
//               {!n.is_read && (
//                 <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//               )}
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={(e) => handleDeleteNotification(e, n.id)}
//                 className="p-1 h-6 w-6 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-400"
//               >
//                 <X className="h-3 w-3" />
//               </Button>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   )}
// </ScrollArea>

//           {notifications.length > 3 && (
//             <>
//               <Separator className="bg-gray-200 dark:bg-gray-700" />
//               <div className="p-3 bg-gray-50 dark:bg-gray-800/50">
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   className="w-full text-xs text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
//                   onClick={() => {
//                     setShowAll(!showAll);
//                   }}
//                 >
//                   {showAll ? "Show less" : "View all notifications"}
//                 </Button>
//               </div>
//             </>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }
