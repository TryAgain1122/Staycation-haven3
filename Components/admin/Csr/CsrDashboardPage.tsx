"use client";

import { Menu, X, Home, Calendar, DollarSign, FileText, Users, Wallet, Package, Settings, Bell, ChevronDown, User, MessageSquare } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import CsrLogout from "./Auth/CsrLogout";
import ProfilePage from "./ProfilePage";
import { useSession } from "next-auth/react";
import DashboardPage, {
  BookingsPage,
  PaymentsPage,
  DeliverablesPage,
  CleanersPage,
  DepositsPage,
  InventoryPage
} from "./DashboardPage";
import NotificationModal from "./Modals/Notification";
import NotificationPage from "./NotificationPage";
import MessagePage from "./MessagePage";

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
  picture?: string;
}

const ACTIVE_PAGE_STORAGE_KEY = "csr-dashboard-active-page";

export default function CsrDashboard() {
  const router = useRouter();
  const [sidebar, setSidebar] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [page, setPage] = useState("dashboard");
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [messageBadge, setMessageBadge] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationButtonRef = useRef<HTMLButtonElement | null>(null);
  const messageButtonRef = useRef<HTMLButtonElement | null>(null);
  const { data: session } = useSession();
  const notifications = [
    {
      id: "1",
      title: "New booking pending approval",
      description: "A new booking for Haven 2 requires CSR confirmation.",
      timestamp: "2 mins ago",
      type: "info" as const,
    },
    {
      id: "2",
      title: "Payment received",
      description: "₱12,500 from Emily Brown was confirmed.",
      timestamp: "15 mins ago",
      type: "success" as const,
    },
    {
      id: "3",
      title: "Guest check-in reminder",
      description: "Mike Wilson will arrive today at 3:00 PM.",
      timestamp: "1 hr ago",
      type: "warning" as const,
    },
  ];


  // Prevent back navigation to login page after login
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Push current state to history
      window.history.pushState(null, '', window.location.href);

      // Prevent back navigation
      const handlePopState = () => {
        window.history.pushState(null, '', window.location.href);
      };

      window.addEventListener('popstate', handlePopState);

      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    }
  }, []);

  // Restore persisted page on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const savedPage = window.localStorage.getItem(ACTIVE_PAGE_STORAGE_KEY);
    if (savedPage) {
      setPage(savedPage);
    }
  }, []);

  // Persist page changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(ACTIVE_PAGE_STORAGE_KEY, page);
  }, [page]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    }

    if (profileDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileDropdownOpen]);

  const navItems = [
    { id: "dashboard", icon: Home, label: "Dashboard", color: "text-blue-500" },
    { id: "bookings", icon: Calendar, label: "Bookings", color: "text-green-500" },
    { id: "payments", icon: DollarSign, label: "Payments", color: "text-purple-500" },
    { id: "deliverables", icon: FileText, label: "Deliverables", color: "text-pink-500" },
    { id: "cleaners", icon: Users, label: "Cleaners", color: "text-brand-primary" },
    { id: "deposits", icon: Wallet, label: "Deposits", color: "text-indigo-500" },
    { id: "inventory", icon: Package, label: "Inventory", color: "text-teal-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 flex">
      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden animate-in fade-in duration-300"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      {/* SIDEBAR - Desktop and Mobile */}
      <div
        className={`${
          sidebar ? "w-72" : "w-20"
        } bg-white border-r border-gray-200 transition-all duration-300 flex-col sticky top-0 h-screen shadow-xl
        ${
          mobileMenuOpen
            ? "fixed inset-y-0 left-0 z-50 flex animate-in slide-in-from-left duration-300"
            : "hidden"
        } md:flex`}
      >
        {/* Logo Section */}
        <div className="h-20 px-6 border-b border-gray-200 bg-gradient-to-r from-brand-primarySoft to-white flex items-center">
          <div className="flex items-center justify-between gap-3 w-full">
            <div
              className={`flex items-center ${sidebar ? "gap-3" : "justify-center w-full"}`}
            >
              <div className="w-12 h-12 rounded-xl overflow-hidden flex items-center justify-center">
                <Image
                  src="/haven_logo.png"
                  alt="Staycation Haven logo"
                  width={48}
                  height={48}
                  className="object-cover"
                  priority
                />
              </div>
              {sidebar && (
                <div>
                  <h1 className="font-bold text-lg text-gray-800">
                    Staycation Haven
                  </h1>
                  <p className="text-xs text-gray-500">CSR Portal</p>
                </div>
              )}
            </div>
            {/* Mobile Close Button */}
            {mobileMenuOpen && (
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 hover:bg-white/50 rounded-lg md:hidden transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setPage(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 group ${
                  page === item.id
                    ? "bg-gradient-to-r from-brand-primary to-brand-primaryDark text-white shadow-lg shadow-[rgba(186,144,60,0.35)]"
                    : "text-gray-600 hover:bg-gray-50 hover:shadow-md"
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${
                    page === item.id
                      ? "text-white"
                      : `${item.color} group-hover:scale-110 transition-transform`
                  }`}
                />
                {sidebar && (
                  <span className="text-sm font-semibold truncate">
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Profile & Logout */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          {sidebar && (
            <div className="mb-3 p-3 bg-white rounded-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-brand-primary to-brand-primaryDark rounded-full flex items-center justify-center text-white font-bold">
                  {session?.user?.name ? session?.user?.name.charAt(0).toUpperCase() : 'C'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">
                    {session?.user?.name || 'CSR Account'}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {session?.user?.email || 'Loading...'}
                  </p>
                </div>
              </div>
            </div>
          )}
          <CsrLogout sidebar={sidebar} />
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* HEADER */}
        <div className="bg-white border-b border-gray-200 px-6 h-20 flex justify-between items-center sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg md:hidden transition-colors"
            >
              <Menu className="w-6 h-6 text-gray-600" />
            </button>

            {/* Desktop Sidebar Toggle */}
            <button
              onClick={() => setSidebar(!sidebar)}
              className="p-2 hover:bg-gray-100 rounded-lg hidden md:block transition-colors"
            >
              {sidebar ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {navItems.find((item) => item.id === page)?.label ||
                  "Dashboard"}
              </h1>
              <p className="text-sm text-gray-500">
                Welcome back! Here&apos;s what&apos;s happening today.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Messages */}
            <button
              ref={messageButtonRef}
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => {
                setMessageBadge(false);
                setPage("messages");
              }}
            >
              <MessageSquare className="w-6 h-6 text-gray-600" />
              {messageBadge && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>

            {/* Notifications */}
            <button
              ref={notificationButtonRef}
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setNotificationOpen((prev) => !prev)}
            >
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Avatar with Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-brand-primary to-brand-primaryDark rounded-full flex items-center justify-center text-white font-bold cursor-pointer hover:shadow-lg transition-shadow">
                  {session?.user?.name ? session?.user?.name.charAt(0).toUpperCase() : 'C'}
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-gray-600 transition-transform ${profileDropdownOpen ? "rotate-180" : ""
                    }`}
                />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-gray-200">
                    <div className="flex items-center gap-3">

                    <div className="w-12 h-12 bg-gradient-to-br from-brand-primary to-brand-primaryDark rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {session?.user?.name? session?.user?.name.charAt(0).toUpperCase() : 'C'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {session?.user?.name || 'CSR Account'}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {session?.user?.email || 'Loading...'}
                      </p>
                      <p className="text-xs text-brand-primary font-medium mt-1">
                        {(session?.user as any)?.role || 'CSR'}
                      </p>
                    </div>
                  </div>
                </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        setPage("profile");
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <User className="w-4 h-4" />
                      <span className="text-sm font-medium">Profile</span>
                    </button>
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      <span className="text-sm font-medium">Settings</span>
                    </button>
                  </div>

                  {/* Logout */}
                  <div className="border-t border-gray-200 pt-2 px-2">
                    <CsrLogout sidebar={true} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* PAGE CONTENT */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="max-w-[1600px] mx-auto">
            {page === "dashboard" && <DashboardPage />}
            {page === "bookings" && <BookingsPage />}
            {page === "payments" && <PaymentsPage />}
            {page === "deliverables" && <DeliverablesPage />}
            {page === "cleaners" && <CleanersPage />}
            {page === "deposits" && <DepositsPage />}
            {page === "inventory" && <InventoryPage />}
            {page === "profile" && <ProfilePage user={session?.user} onClose={() => setPage("dashboard")} />}
            {page === "notifications" && <NotificationPage />}
            {page === "messages" && <MessagePage />}
          </div>
        </div>

        {/* FOOTER */}
        <div className="bg-white border-t border-gray-200 px-6 py-4">
          <div className="max-w-[1600px] mx-auto flex justify-between items-center text-sm text-gray-600">
            <p> 2024 Staycation Haven. All rights reserved.</p>
            <div className="flex gap-4">
              <button className="hover:text-brand-primary transition-colors">
                Help Center
              </button>
              <button className="hover:text-brand-primary transition-colors">
                Privacy Policy
              </button>
              <button className="hover:text-brand-primary transition-colors">
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </div>
      {notificationOpen && (
        <NotificationModal
          notifications={notifications}
          onClose={() => setNotificationOpen(false)}
          onViewAll={() => {
            setNotificationOpen(false);
            setPage("notifications");
          }}
          anchorRef={notificationButtonRef}
        />
      )}
    </div>
  );
}
