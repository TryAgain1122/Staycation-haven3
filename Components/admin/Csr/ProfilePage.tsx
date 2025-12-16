"use client";

import { useEffect, useMemo, useState } from "react";
import { Loader2, X } from "lucide-react";

interface AdminUser {
  id?: string;
  email?: string | null;
  name?: string | null;
  role?: string;
  picture?: string;
  image?: string | null;
}

interface EmployeeProfile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  employment_id: string;
  hire_date: string;
  role: string;
  department?: string;
  monthly_salary?: number;
  street_address?: string;
  city?: string;
  zip_code?: string;
  profile_image_url?: string;
}

interface ProfilePageProps {
  user: AdminUser | null | undefined;
  onClose: () => void;
}

const formatDate = (value?: string) => {
  if (!value) return "Not specified";
  try {
    return new Date(value).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return value;
  }
};

const formatCurrency = (value?: number | string | null) => {
  if (value === null || value === undefined || value === "") return "Not specified";
  const numericValue = typeof value === "string" ? Number(value) : value;
  if (Number.isNaN(numericValue)) return "Not specified";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 2,
  }).format(numericValue);
};

export default function ProfilePage({ user, onClose }: ProfilePageProps) {
  const [employee, setEmployee] = useState<EmployeeProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.id) return;

    const controller = new AbortController();

    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`/api/admin/employees/${user.id}`, {
          method: "GET",
          cache: "no-store",
          signal: controller.signal,
        });

        const payload = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(payload?.error || "Failed to load employee profile");
        }

        setEmployee(payload?.data ?? null);
      } catch (err: any) {
        if (err?.name === "AbortError") return;
        setError(err?.message || "Failed to load employee profile");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();

    return () => controller.abort();
  }, [user?.id]);

  const displayName = useMemo(() => {
    if (employee) {
      return `${employee.first_name} ${employee.last_name}`.trim();
    }
    return user?.name ?? "Not specified";
  }, [employee, user?.name]);

  const profileImage = employee?.profile_image_url || user?.picture || user?.image || "";
  const contactEmail = employee?.email || user?.email || "Not specified";
  const employmentId = employee?.employment_id || "Not assigned";
  const roleLabel = employee?.role || user?.role || "CSR Staff";
  const department = employee?.department || "Not specified";
  const phone = employee?.phone || "Not specified";
  const hireDate = formatDate(employee?.hire_date);
  const salary = formatCurrency(employee?.monthly_salary);
  const address =
    [employee?.street_address, employee?.city, employee?.zip_code].filter(Boolean).join(", ") ||
    "Not specified";

  return (
    <div
      className="space-y-6 animate-in fade-in duration-700"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
          <p className="text-sm text-gray-500">View and manage your employee information</p>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-4xl shadow-xl overflow-hidden">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt={displayName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>{displayName?.charAt(0).toUpperCase()}</span>
              )}
            </div>
            <p className="mt-4 text-center text-gray-600 text-sm">
              Employment ID:{" "}
              <span className="font-semibold text-gray-800">{employmentId}</span>
            </p>
            <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold uppercase tracking-wide">
              Active
            </div>
          </div>

          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoField label="Full Name" value={displayName} />
              <InfoField label="Email Address" value={contactEmail} />
              <InfoField label="Role" value={roleLabel} />
              <InfoField label="Department" value={department} />
              <InfoField label="Phone" value={phone} />
              <InfoField label="Hire Date" value={hireDate} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <div className="p-4 bg-orange-50 border border-orange-100 rounded-xl">
                <p className="text-sm text-orange-600 font-semibold uppercase tracking-wide">
                  Monthly Salary
                </p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{salary}</p>
              </div>
              <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl">
                <p className="text-sm text-gray-500 font-semibold uppercase tracking-wide">
                  Office Location
                </p>
                <p className="text-lg font-semibold text-gray-800 mt-1">{address}</p>
              </div>
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading latest information...
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Contact Information</h3>
          <div className="space-y-3">
            <InfoRow label="Email" value={contactEmail} />
            <InfoRow label="Phone" value={phone} />
            <InfoRow label="Address" value={address} />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Employment Details</h3>
          <div className="space-y-3">
            <InfoRow label="Employment ID" value={employmentId} />
            <InfoRow label="Department" value={department} />
            <InfoRow label="Role" value={roleLabel} />
            <InfoRow label="Hire Date" value={hireDate} />
          </div>
        </div>
      </div>
    </div>
  );
}

interface InfoFieldProps {
  label: string;
  value?: string | number | null;
}

const InfoField = ({ label, value }: InfoFieldProps) => (
  <div>
    <label className="block text-sm font-medium text-gray-500 mb-2">{label}</label>
    <p className="text-lg font-semibold text-gray-800">
      {value && value !== "" ? value : "Not specified"}
    </p>
  </div>
);

interface InfoRowProps {
  label: string;
  value?: string | number | null;
}

const InfoRow = ({ label, value }: InfoRowProps) => (
  <div className="flex justify-between gap-4 text-sm">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium text-gray-800 text-right">
      {value && value !== "" ? value : "Not specified"}
    </span>
  </div>
);