"use client";

import { ReactNode, useState } from "react";
import { MessageSquare, MailCheck, MailWarning, MailQuestion, X } from "lucide-react";

type MessageType = "unread" | "urgent" | "info";

interface Message {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  timestamp: string;
  type: MessageType;
}

interface MessagePageProps {
  onClose?: () => void;
}

const mockMessages: Message[] = [
  {
    id: "msg-1",
    sender: "Emily Brown",
    subject: "Clarification about payment receipt",
    preview: "Hello, could you confirm if my receipt was sent to the right email?",
    timestamp: "5 mins ago",
    type: "unread",
  },
  {
    id: "msg-2",
    sender: "Facility Team",
    subject: "Urgent: Room 204 maintenance verification",
    preview: "Can CSR confirm that the postponed maintenance visit is approved?",
    timestamp: "32 mins ago",
    type: "urgent",
  },
  {
    id: "msg-3",
    sender: "Michael Cruz",
    subject: "Late check-in assistance",
    preview: "Hey team, arriving past midnight—may I still get full concierge support?",
    timestamp: "1 hr ago",
    type: "info",
  },
];

const iconMap: Record<MessageType, ReactNode> = {
  unread: <MailCheck className="w-4 h-4" />,
  urgent: <MailWarning className="w-4 h-4" />,
  info: <MailQuestion className="w-4 h-4" />,
};

const badgeStyles: Record<MessageType, string> = {
  unread: "bg-blue-50 text-blue-600 border-blue-100",
  urgent: "bg-red-50 text-red-600 border-red-100",
  info: "bg-gray-50 text-gray-600 border-gray-100",
};

export default function MessagePage({ onClose }: MessagePageProps) {
  const [messages] = useState(mockMessages);

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Messages</h1>
          <p className="text-sm text-gray-500">
            Coordinate with guests, teams, and partners directly inside your CSR workspace.
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
              Inbox health
            </p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{messages.length}</p>
            <p className="text-sm text-gray-500">Active threads</p>
          </div>
          <div className="ml-auto">
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500 text-white text-sm font-semibold shadow-lg shadow-orange-200 hover:bg-orange-600 transition-colors">
              <MessageSquare className="w-4 h-4" />
              Compose new message
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Conversation list</h2>
          <span className="text-sm text-gray-500">{messages.length} conversations</span>
        </div>

        <div className="divide-y divide-gray-100">
          {messages.map((message) => (
            <div
              key={message.id}
              className="px-6 py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-2xl border ${badgeStyles[message.type]}`}>
                  {iconMap[message.type]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 leading-tight">
                    {message.subject}
                  </p>
                  <p className="text-xs uppercase tracking-wide text-gray-400 mt-1">
                    from {message.sender}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">{message.preview}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 md:flex-col md:items-end">
                <span className="text-xs text-gray-400 whitespace-nowrap">
                  {message.timestamp}
                </span>
                <button className="text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors">
                  Open thread
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}