"use client";

import { ReactNode, RefObject, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { BellRing, CheckCircle2, Clock, Info, X } from "lucide-react";

interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type?: "info" | "success" | "warning";
}

interface NotificationModalProps {
  notifications: Notification[];
  onClose: () => void;
  onViewAll?: () => void;
  anchorRef?: RefObject<HTMLElement | null>;
}

const iconMap: Record<string, ReactNode> = {
  info: <Info className="w-4 h-4" />,
  success: <CheckCircle2 className="w-4 h-4" />,
  warning: <Clock className="w-4 h-4" />,
};

export default function NotificationModal({ notifications, onClose, onViewAll, anchorRef }: NotificationModalProps) {

  const [isMounted, setIsMounted] = useState(false);
  const [position, setPosition] = useState({ top: 96, right: 16 });

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function updatePosition() {
      if (!anchorRef?.current) {
        setPosition({ top: 96, right: 16 });
        return;
      }

      const rect = anchorRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 12,
        right: Math.max(window.innerWidth - rect.right - 16, 16),
      });
    }

    updatePosition();

    window.addEventListener("resize", updatePosition);
    document.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      document.removeEventListener("scroll", updatePosition, true);
    };
  }, [anchorRef]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (
        containerRef.current &&
        !containerRef.current.contains(target) &&
        !anchorRef?.current?.contains(target)
      ) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [anchorRef, onClose]);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isMounted) return null;

  return createPortal(
    <>
      <div className="fixed inset-0 z-[9980]" aria-hidden="true" />
      <div
        ref={containerRef}
        className="fixed z-[9991] w-full max-w-md md:max-w-sm"
        style={{
          top: position.top,
          right: position.right,
        }}
      >
        <div className="bg-white rounded-2xl shadow-2xl max-h-[80vh] flex flex-col overflow-hidden border border-orange-100">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-orange-50 to-yellow-50">
            <div className="flex items-center gap-2">
              <BellRing className="w-5 h-5 text-orange-500" />
              <div>
                <p className="text-xs font-semibold tracking-[0.3em] text-orange-500 uppercase">
                  Notifications
                </p>
                <h2 className="text-xl font-bold text-gray-900">Recent activity</h2>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white transition-colors text-gray-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
            {notifications.length === 0 ? (
              <div className="text-center py-10 text-sm text-gray-500">
                You&apos;re all caught up!
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="border border-gray-100 rounded-xl p-4 hover:border-orange-200 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full bg-orange-50 text-orange-500`}>
                      {iconMap[notification.type || "info"]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-sm font-semibold text-gray-900">{notification.title}</p>
                        <span className="text-xs text-gray-400 whitespace-nowrap">
                          {notification.timestamp}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="px-6 py-4 border-t border-gray-100 bg-white">
            <button
              onClick={() => {
                if (onViewAll) {
                  onViewAll();
                }
              }}
              className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors"
            >
              View all notifications
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}