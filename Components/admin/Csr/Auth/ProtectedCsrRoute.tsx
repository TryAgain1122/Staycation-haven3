"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CsrDashboard from "../CsrDashboardPage";

export default function ProtectedCsrRoute() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in and has CSR role
    const adminUser = localStorage.getItem('adminUser');

    if (!adminUser) {
      // No user logged in, redirect to login
      router.push('/admin/login');
      return;
    }

    try {
      const user = JSON.parse(adminUser);

      // Check if user has CSR role
      if (user.role !== 'Csr') {
        // User doesn't have CSR role, redirect based on their role
        switch (user.role) {
          case 'Owner':
            router.push('/admin/owners');
            break;
          case 'Partner':
            router.push('/admin/partners');
            break;
          case 'Cleaner':
            router.push('/admin/cleaners');
            break;
          default:
            router.push('/admin/login');
        }
        return;
      }

      // User is authorized
      setIsAuthorized(true);
    } catch (error) {
      console.error('Error parsing user data:', error);
      router.push('/admin/login');
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-orange-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-700 font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return <CsrDashboard />;
}