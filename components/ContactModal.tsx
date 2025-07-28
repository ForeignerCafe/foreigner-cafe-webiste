// "use client"
// import { Mail, MapPin, Phone } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Dialog, DialogContent } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { DialogTitle } from "@radix-ui/react-dialog"
// import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

// interface ContactModalProps {
//   open: boolean
//   onOpenChange: (open: boolean) => void
// }

// export function ContactModal({ open, onOpenChange }: ContactModalProps) {
//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//           <DialogContent className="max-w-md max-h-[90vh] rounded-3xl bg-background p-0 shadow-lg md:max-w-lg lg:max-w-xl  overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
//               <DialogTitle asChild>
//           <VisuallyHidden>Contact Foreigner Cafe</VisuallyHidden>
//         </DialogTitle>

//         <style jsx global>{`
//           .custom-scrollbar::-webkit-scrollbar {
//             width: 4px;
//             height: 2px;
//           }
//           .custom-scrollbar::-webkit-scrollbar-track {
//             background: transparent;
//             margin: 8px 0;
//           }
//           .custom-scrollbar::-webkit-scrollbar-thumb {
//             background: #d1d5db;
//             border-radius: 10px;
//           }
//           .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//             background: #9ca3af;
//           }
//         `}</style>
        
//         <div className="relative p-6 sm:p-8 h-full flex flex-col">
//           <div className="custom-scrollbar overflow-y-auto h-full pr-2 -mr-2">
//             <div className="space-y-6">
//               <div className="text-center">
//                 <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-[#EC4E20]">Contact Foreigner Cafe</h2>
//                 <p className="text-muted-foreground mt-2 text-[12px]">
//                   We'd love to hear from you! Fill out the form below or use our contact information.
//                 </p>
//               </div>
//               <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
//                 {/* Contact Information */}
//                 <div className="space-y-6">
//                   <div className="space-y-4">
//                     <h3 className="text-lg">Our Information</h3>
//                     <div className="space-y-3 text-sm text-gray-600">
//                       <p className="flex items-start gap-3">
//                         <MapPin className="h-5 w-5 shrink-0 text-primary" />
//                         <span>60 East 3rd Avenue, San Mateo, CA 94401</span>
//                       </p>
//                       <p className="flex items-center gap-3">
//                         <Phone className="h-5 w-5 shrink-0 text-primary" />
//                         <span>(650) 123-4567</span>
//                       </p>
//                       <p className="flex items-center gap-3">
//                         <Mail className="h-5 w-5 shrink-0 text-primary" />
//                         <span>hello@foreignercafe.com</span>
//                       </p>
//                     </div>
//                   </div>
//                   <div className="pt-4">
//                     <h3 className="text-lg">Hours</h3>
//                     <div className="space-y-2 mt-2 text-sm">
//                       <p className="flex flex-col gap-2">
//                         <span className="">Mon - Fri</span>
//                         <span className="text-muted-foreground">7:00 AM - 7:00 PM</span>
//                       </p>
//                       <p className="flex flex-col gap-2">
//                         <span>Sat - Sun</span>
//                         <span className="text-muted-foreground">8:00 AM - 6:00 PM</span>
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//                 {/* Contact Form */}
//                 <div className="space-y-4">
//                   <h3 className="text-lg">Send us a message</h3>
//                   <form className="space-y-4">
//                     <div>
//                       <Label htmlFor="name">Name</Label>
//                       <Input id="name" className="rounded-[0.5rem] mt-2" placeholder="Your name" />
//                     </div>
//                     <div>
//                       <Label htmlFor="email">Email</Label>
//                       <Input
//                         id="email"
//                         className="rounded-[0.5rem] mt-2"
//                         type="email"
//                         placeholder="your.email@example.com"
//                       />
//                     </div>
//                     <div>
//                       <Label htmlFor="phone">Phone (optional)</Label>
//                       <Input id="phone" className="rounded-[0.5rem] mt-2" type="tel" placeholder="(123) 456-7890" />
//                     </div>
//                     <div>
//                       <Label htmlFor="subject" className="rounded-[0.5rem] mt-2">
//                         Subject
//                       </Label>
//                       <Select>
//                         <SelectTrigger className="rounded-[0.5rem] mt-2" id="subject">
//                           <SelectValue placeholder="Select a subject" />
//                         </SelectTrigger>
//                         <SelectContent className="rounded-[0.5rem]">
//                           <SelectItem value="reservation">Reservation Inquiry</SelectItem>
//                           <SelectItem value="catering">Catering Inquiry</SelectItem>
//                           <SelectItem value="feedback">Feedback</SelectItem>
//                           <SelectItem value="other">Other</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>
//                     <div>
//                       <Label htmlFor="message">Message</Label>
//                       <Textarea id="message" className="rounded-[0.5rem] mt-2" rows={4} placeholder="Your message..." />
//                     </div>
//                     <Button type="submit" className="w-full bg-[#EC4E20] hover:bg-[#f97316]">
//                       Send Message
//                     </Button>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   )
// }
