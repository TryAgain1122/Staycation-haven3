"use client";

import { X } from "lucide-react";

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
  picture?: string;
}

interface ProfilePageProps {
  user: AdminUser | null;
  onClose: () => void;
}

export default function ProfilePage({ user, onClose }: ProfilePageProps) {
  return (
    <div 
      className="space-y-6 animate-in fade-in duration-700"
      onClick={(e) => {
        // Close if clicking on the background area
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
          <p className="text-sm text-gray-500">View and manage your profile information</p>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Avatar Section */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-4xl shadow-xl">
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
            <button className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
              Change Photo
            </button>
          </div>

          {/* User Information */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">Full Name</label>
                <p className="text-lg font-semibold text-gray-800">
                  {user?.name || 'Not specified'}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">Email Address</label>
                <p className="text-lg text-gray-800">
                  {user?.email || 'Not specified'}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">Role</label>
                <p className="text-lg font-semibold text-gray-800">
                  {user?.role || 'CSR Staff'}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">Employee ID</label>
                <p className="text-lg text-gray-800">
                  {user?.id || 'Not assigned'}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8">
              <button className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                Edit Profile
              </button>
              <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Account Status</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Status</span>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Last Login</span>
              <span className="text-sm text-gray-800">Today, 9:30 AM</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Permissions</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Manage Bookings</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Process Payments</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-700">View Reports</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Stats</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Tasks Today</span>
              <span className="text-lg font-bold text-orange-600">12</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Completed</span>
              <span className="text-lg font-bold text-green-600">8</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}