"use client";

import { Menu, X, Home, Calendar, DollarSign, FileText, Users, Wallet, Package, Settings, Bell, User, LogOut, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CsrLogout from "./Auth/CsrLogout";

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
  picture?: string;
}

export default function CsrDashboard() {
  const router = useRouter();
  const [sidebar, setSidebar] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [page, setPage] = useState("dashboard");
  const [user, setUser] = useState<AdminUser | null>(null);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  useEffect(() => {
    // Get user data from localStorage
    const adminUserData = localStorage.getItem('adminUser');
    if (adminUserData) {
      try {
        const userData = JSON.parse(adminUserData);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }

    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.profile-dropdown-container')) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { id: "dashboard", icon: Home, label: "Dashboard", color: "text-blue-500" },
    { id: "bookings", icon: Calendar, label: "Bookings", color: "text-green-500" },
    { id: "payments", icon: DollarSign, label: "Payments", color: "text-purple-500" },
    { id: "deliverables", icon: FileText, label: "Deliverables", color: "text-pink-500" },
    { id: "cleaners", icon: Users, label: "Cleaners", color: "text-orange-500" },
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
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-yellow-50">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 via-orange-600 to-yellow-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                SH
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
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-200"
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
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'C'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">
                    {user?.name || 'CSR Account'}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user?.email || 'Loading...'}
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
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
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
                Welcome back! Here's what's happening today.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Notifications */}
            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            
            {/* User Avatar */}
            <div className="relative profile-dropdown-container">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold hover:shadow-lg transition-shadow relative"
              >
                {user?.picture ? (
                  <img 
                    src={user.picture} 
                    alt={user.name} 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span>{user?.name ? user.name.charAt(0).toUpperCase() : 'C'}</span>
                )}
                <ChevronDown className="absolute -bottom-1 -right-1 w-3 h-3 bg-white text-orange-500 rounded-full" />
              </button>
              
              {/* Profile Dropdown */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
                        {user?.picture ? (
                          <img 
                            src={user.picture} 
                            alt={user.name} 
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <span>{user?.name ? user.name.charAt(0).toUpperCase() : 'C'}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-800 truncate">
                          {user?.name || 'CSR Account'}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user?.email || 'Loading...'}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="py-1">
                    <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                      <User className="w-4 h-4" />
                      View Profile
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                      <Settings className="w-4 h-4" />
                      Settings
                    </button>
                    <div className="border-t border-gray-200 my-1"></div>
                    <CsrLogout sidebar={false} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* PAGE CONTENT */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="max-w-[1600px] mx-auto">
            {page === "dashboard" && <DashboardContent />}
            {page === "bookings" && <BookingsPlaceholder />}
            {page === "payments" && <PaymentsPlaceholder />}
            {page === "deliverables" && <DeliverablesPlaceholder />}
            {page === "cleaners" && <CleanersPlaceholder />}
            {page === "deposits" && <DepositsPlaceholder />}
            {page === "inventory" && <InventoryPlaceholder />}
          </div>
        </div>

        {/* FOOTER */}
        <div className="bg-white border-t border-gray-200 px-6 py-4">
          <div className="max-w-[1600px] mx-auto flex justify-between items-center text-sm text-gray-600">
            <p>© 2024 Staycation Haven. All rights reserved.</p>
            <div className="flex gap-4">
              <button className="hover:text-orange-600 transition-colors">
                Help Center
              </button>
              <button className="hover:text-orange-600 transition-colors">
                Privacy Policy
              </button>
              <button className="hover:text-orange-600 transition-colors">
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Dashboard Content component
function DashboardContent() {
  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            title: "Total Bookings",
            value: "156",
            icon: "📅",
            color: "bg-blue-500",
            trend: "+12%"
          },
          {
            title: "Pending Payments",
            value: "₱45,000",
            icon: "💰",
            color: "bg-green-500",
            trend: "+8%"
          },
          {
            title: "Active Cleaners",
            value: "24",
            icon: "👥",
            color: "bg-orange-500",
            trend: "+3"
          },
          {
            title: "Total Deposits",
            value: "₱120,000",
            icon: "💳",
            color: "bg-purple-500",
            trend: "+15%"
          },
        ].map((kpi, i) => (
          <div
            key={i}
            className={`${kpi.color} text-white rounded-lg p-6 shadow hover:shadow-lg animate-in fade-in slide-in-from-bottom duration-500`}
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <p className="text-sm opacity-90">{kpi.title}</p>
            <p className="text-3xl font-bold mt-2">{kpi.value}</p>
            <div className="flex items-center justify-between mt-2">
              <p className="text-2xl">{kpi.icon}</p>
              <span className="text-sm opacity-90">{kpi.trend}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">
                  Time
                </th>
                <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">
                  Action
                </th>
                <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">
                  Customer
                </th>
                <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">
                  Details
                </th>
                <th className="text-center py-3 px-4 text-sm font-bold text-gray-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  time: "2:30 PM",
                  action: "New Booking",
                  customer: "John Smith",
                  details: "Haven 2 - March 15-20",
                  status: "Confirmed",
                  statusColor: "bg-green-100 text-green-700",
                  icon: "📅",
                },
                {
                  time: "1:45 PM",
                  action: "Payment Received",
                  customer: "Sarah Johnson",
                  details: "₱8,000 deposit payment",
                  status: "Completed",
                  statusColor: "bg-blue-100 text-blue-700",
                  icon: "💰",
                },
                {
                  time: "12:30 PM",
                  action: "Cleaner Assigned",
                  customer: "Maria Santos",
                  details: "Haven 1 - Check-out cleaning",
                  status: "Assigned",
                  statusColor: "bg-orange-100 text-orange-700",
                  icon: "🧹",
                },
                {
                  time: "11:15 AM",
                  action: "Inventory Updated",
                  customer: "System",
                  details: "Towels restocked - Haven 3",
                  status: "Updated",
                  statusColor: "bg-purple-100 text-purple-700",
                  icon: "📦",
                },
                {
                  time: "10:00 AM",
                  action: "Booking Cancelled",
                  customer: "Mike Wilson",
                  details: "Haven 4 - April 5-8",
                  status: "Refunded",
                  statusColor: "bg-red-100 text-red-700",
                  icon: "❌",
                },
              ].map((item, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors animate-in fade-in duration-500"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <td className="py-4 px-4">
                    <span className="text-sm font-medium text-gray-600">
                      {item.time}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-sm font-semibold text-gray-800">
                        {item.action}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-sm font-medium text-gray-800">
                      {item.customer}
                    </p>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-600">
                      {item.details}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span
                      className={`inline-block text-xs font-bold px-3 py-1.5 rounded-full ${item.statusColor}`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
          <p className="text-sm text-gray-600">Showing 5 of 48 activities</p>
          <button className="text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors">
            View All Activity →
          </button>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-lg font-bold text-gray-800 mb-4">Today&apos;s Tasks</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Check-ins</span>
              <span className="text-xl font-bold text-blue-600">8</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Check-outs</span>
              <span className="text-xl font-bold text-orange-600">12</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Cleanings</span>
              <span className="text-xl font-bold text-green-600">15</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-lg font-bold text-gray-800 mb-4">Payment Status</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Paid</span>
              <span className="text-xl font-bold text-green-600">45</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Pending</span>
              <span className="text-xl font-bold text-yellow-600">18</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Overdue</span>
              <span className="text-xl font-bold text-red-600">3</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-lg font-bold text-gray-800 mb-4">Inventory Alerts</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Low Stock</span>
              <span className="text-xl font-bold text-red-600">5</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">Reorder</span>
              <span className="text-xl font-bold text-yellow-600">8</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">In Stock</span>
              <span className="text-xl font-bold text-green-600">42</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Placeholder component for Bookings
function BookingsPlaceholder() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <Calendar className="w-12 h-12 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Bookings
          </h2>
          <p className="text-gray-600 max-w-md mx-auto mb-6">
            Manage all customer bookings and reservations here.
          </p>
        </div>
      </div>
    </div>
  );
}

// Placeholder component for Payments
function PaymentsPlaceholder() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <DollarSign className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Payments
          </h2>
          <p className="text-gray-600 max-w-md mx-auto mb-6">
            Track and manage payment transactions.
          </p>
        </div>
      </div>
    </div>
  );
}

// Placeholder component for Deliverables
function DeliverablesPlaceholder() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-12 h-12 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Deliverables
          </h2>
          <p className="text-gray-600 max-w-md mx-auto mb-6">
            Manage and track service deliverables.
          </p>
        </div>
      </div>
    </div>
  );
}

// Placeholder component for Cleaners
function CleanersPlaceholder() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="w-12 h-12 text-orange-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Cleaners
          </h2>
          <p className="text-gray-600 max-w-md mx-auto mb-6">
            Manage cleaner schedules and assignments.
          </p>
        </div>
      </div>
    </div>
  );
}

// Placeholder component for Deposits
function DepositsPlaceholder() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <Wallet className="w-12 h-12 text-indigo-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Deposits
          </h2>
          <p className="text-gray-600 max-w-md mx-auto mb-6">
            Track customer deposits and refunds.
          </p>
        </div>
      </div>
    </div>
  );
}

// Placeholder component for Inventory
function InventoryPlaceholder() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gradient-to-br from-pink-100 to-pink-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="w-12 h-12 text-pink-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Inventory
          </h2>
          <p className="text-gray-600 max-w-md mx-auto mb-6">
            Manage property inventory and supplies.
          </p>
        </div>
      </div>
    </div>
  );
}
