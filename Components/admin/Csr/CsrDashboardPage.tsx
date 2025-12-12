"use client";

import { LogOut, Menu, X, Calendar, DollarSign, FileText, Users, Wallet, Package, Settings, Bell } from "lucide-react";
import { useState } from "react";

export default function CsrDashboard() {
  const [sidebar, setSidebar] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [page, setPage] = useState("bookings");

  const navItems = [
    { id: "bookings", icon: Calendar, label: "Bookings", color: "text-blue-500" },
    { id: "payments", icon: DollarSign, label: "Payments", color: "text-green-500" },
    { id: "deliverables", icon: FileText, label: "Deliverables", color: "text-purple-500" },
    { id: "cleaners", icon: Users, label: "Cleaners", color: "text-orange-500" },
    { id: "deposits", icon: Wallet, label: "Deposits", color: "text-indigo-500" },
    { id: "inventory", icon: Package, label: "Inventory", color: "text-pink-500" },
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
                  C
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">
                    CSR Account
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    csr@staycation.com
                  </p>
                </div>
              </div>
            </div>
          )}
          <button className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all font-medium">
            <LogOut className="w-5 h-5" />
            {sidebar && <span className="text-sm">Logout</span>}
          </button>
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
                  "Bookings"}
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

            {/* Settings */}
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings className="w-6 h-6 text-gray-600" />
            </button>

            {/* User Avatar */}
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold cursor-pointer hover:shadow-lg transition-shadow">
              C
            </div>
          </div>
        </div>

        {/* PAGE CONTENT */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="max-w-[1600px] mx-auto">
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
