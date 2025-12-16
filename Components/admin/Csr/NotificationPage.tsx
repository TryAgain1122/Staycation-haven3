"use client";

import { ReactNode, useState } from "react";
import { BellRing, CheckCircle2, Clock, Info, X } from "lucide-react";

type NotificationType = "info" | "success" | "warning";

interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: NotificationType;
}

interface NotificationPageProps {
  onClose?: () => void;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "New booking pending approval",
    description: "A new booking for Haven 2 requires CSR confirmation.",
    timestamp: "2 mins ago",
    type: "info",
  },
  {
    id: "2",
    title: "Payment received",
    description: "₱12,500 from Emily Brown was confirmed.",
    timestamp: "15 mins ago",
    type: "success",
  },
  {
    id: "3",
    title: "Guest check-in reminder",
    description: "Mike Wilson will arrive today at 3:00 PM.",
    timestamp: "1 hr ago",
    type: "warning",
  },
  {
    id: "4",
    title: "Inventory restocked",
    description: "Housekeeping restocked linens for Haven 1.",
    timestamp: "2 hrs ago",
    type: "info",
  },
];

const iconMap: Record<NotificationType, ReactNode> = {
  info: <Info className="w-4 h-4" />,
  success: <CheckCircle2 className="w-4 h-4" />,
  warning: <Clock className="w-4 h-4" />,
};

const badgeStyles: Record<NotificationType, string> = {
  info: "bg-blue-50 text-blue-600 border-blue-100",
  success: "bg-green-50 text-green-600 border-green-100",
  warning: "bg-amber-50 text-amber-600 border-amber-100",
};

export default function NotificationPage({ onClose }: NotificationPageProps) {
  const [notifications] = useState<Notification[]>(mockNotifications);

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
          <p className="text-sm text-gray-500">
            Review booking, payment, and guest updates that need your attention.
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex flex-wrap gap-6">
          <div className="flex-1 min-w-[220px]">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-[0.3em]">
              Overview
            </p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{notifications.length}</p>
            <p className="text-sm text-gray-500">Total notifications</p>
          </div>
          <div className="ml-auto">
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500 text-white text-sm font-semibold shadow-lg shadow-orange-200 hover:bg-orange-600 transition-colors">
              <BellRing className="w-4 h-4" />
              Mark all as read
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Recent activity</h2>
          <span className="text-sm text-gray-500">{notifications.length} updates</span>
        </div>

        <div className="divide-y divide-gray-100">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="px-6 py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-2xl border ${badgeStyles[notification.type]}`}>
                  {iconMap[notification.type]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 leading-tight">
                    {notification.title}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 md:flex-col md:items-end">
                <span className="text-xs text-gray-400 whitespace-nowrap">
                  {notification.timestamp}
                </span>
                <button className="text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors">
                  View details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
