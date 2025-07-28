import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Mail,
  User,
  Phone,
  CalendarDays,
  Users,
  Tag,
} from "lucide-react";
import type React from "react";

type Contact = {
  type?: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  people?: string;
  date?: string;
};

export function ContactDetailModal({
  isOpen,
  onClose,
  contact,
}: {
  isOpen: boolean;
  onClose: () => void;
  contact: Contact | null;
}) {
  if (!contact) return null;

  const { type, name, email, phone, message, people, date } = contact;

  const DetailRow = ({
    label,
    value,
    icon,
  }: {
    label: string;
    value: string | null | undefined;
    icon: React.ReactNode;
  }) => (
    <div className="flex flex-col gap-1">
      <span className="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
        {icon}
        {label}
      </span>
      <span className="bg-gray-100 dark:bg-zinc-800 px-3 py-1.5 rounded-md text-sm font-medium text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-zinc-700">
        {value || "—"}
      </span>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl sm:max-w-xl p-5 rounded-xl shadow-lg font-sans max-h-[90vh] overflow-y-auto">
        <DialogHeader className="mb-3">
          <DialogTitle className="text-lg font-bold flex items-center gap-2 text-primary">
            <Mail className="h-5 w-5" />
            Contact Details
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Details submitted by the user.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Basic Info */}
          <Card className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-md shadow-sm">
            <CardHeader className="pb-1">
              <CardTitle className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <DetailRow label="Type" value={type} icon={<Tag className="h-4 w-4" />} />
              <DetailRow label="People" value={people} icon={<Users className="h-4 w-4" />} />
              <DetailRow label="Name" value={name} icon={<User className="h-4 w-4" />} />
              <DetailRow label="Email" value={email} icon={<Mail className="h-4 w-4" />} />
              <DetailRow label="Phone" value={phone} icon={<Phone className="h-4 w-4" />} />
              <DetailRow
                label="Event Date"
                value={
                  date
                    ? new Date(date).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : null
                }
                icon={<CalendarDays className="h-4 w-4" />}
              />
            </CardContent>
          </Card>

          {/* Message Section */}
          <Card className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-md shadow-sm">
            <CardHeader className="pb-1">
              <CardTitle className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-md p-3 text-sm text-gray-800 dark:text-gray-100 leading-relaxed min-h-[60px] whitespace-pre-line">
                {message || "No message provided."}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
