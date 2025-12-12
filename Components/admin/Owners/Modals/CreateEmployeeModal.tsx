"use client";

import { X } from "lucide-react";
import { useState } from "react";
import {Input} from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { DatePicker } from "@nextui-org/date-picker";
import { parseDate } from "@internationalized/date";

interface CreateEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateEmployeeModal = ({ isOpen, onClose }: CreateEmployeeModalProps) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    employeeId: "",
    role: "",
    department: "",
    hireDate: "",
    salary: "",
    address: "",
    city: "",
    zipCode: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    emergencyContactRelation: "",
  });

  const roles = [
    { value: "csr", label: "Customer Service Representative" },
    { value: "cleaner", label: "Cleaner" },
    { value: "partner", label: "Partner" },
    { value: "manager", label: "Manager" },
    { value: "supervisor", label: "Supervisor" },
    { value: "receptionist", label: "Receptionist" },
    { value: "maintenance", label: "Maintenance Staff" },
  ];

  const departments = [
    { value: "front-desk", label: "Front Desk" },
    { value: "housekeeping", label: "Housekeeping" },
    { value: "maintenance", label: "Maintenance" },
    { value: "management", label: "Management" },
    { value: "customer-service", label: "Customer Service" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form data:", formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose}></div>
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] shadow-2xl flex flex-col">
          {/* Header - Sticky */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-orange-100 rounded-t-2xl flex-shrink-0">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Create New Employee
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Fill in the employee information below
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/50 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Form - Scrollable */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              {/* Personal Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  Personal Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Input
                      type="text"
                      label="First Name *"
                      placeholder="Enter first name"
                      labelPlacement="outside"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      isRequired
                      classNames={{
                        base: "w-full",
                        label: "text-sm font-medium text-gray-700 mb-1",
                      }}
                    />
                  </div>
                  <div>
                    <Input
                      type="text"
                      label="Last Name *"
                      placeholder="Enter last name"
                      labelPlacement="outside"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      isRequired
                      classNames={{
                        base: "w-full",
                        label: "text-sm font-medium text-gray-700 mb-1",
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Input
                      type="email"
                      label="Email Address *"
                      placeholder="employee@example.com"
                      labelPlacement="outside"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      isRequired
                      classNames={{
                        base: "w-full",
                        label: "text-sm font-medium text-gray-700 mb-1",
                      }}
                    />
                  </div>
                  <div>
                    <Input
                      type="tel"
                      label="Phone Number *"
                      placeholder="+63 912 345 6789"
                      labelPlacement="outside"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      isRequired
                      classNames={{
                        base: "w-full",
                        label: "text-sm font-medium text-gray-700 mb-1",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Employment Details Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  Employment Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Input
                      type="text"
                      label="Employee ID *"
                      placeholder="EMP-001"
                      labelPlacement="outside"
                      value={formData.employeeId}
                      onChange={(e) =>
                        setFormData({ ...formData, employeeId: e.target.value })
                      }
                      isRequired
                      classNames={{
                        base: "w-full",
                        label: "text-sm font-medium text-gray-700 mb-1",
                      }}
                    />
                  </div>
                  <div>
                    <DatePicker
                      label="Hire Date *"
                      labelPlacement="outside"
                      value={
                        formData.hireDate
                          ? (parseDate(formData.hireDate) as any)
                          : undefined
                      }
                      onChange={(date: any) => {
                        if (date) {
                          const dateStr = `${date.year}-${String(
                            date.month
                          ).padStart(2, "0")}-${String(date.day).padStart(
                            2,
                            "0"
                          )}`;
                          setFormData({ ...formData, hireDate: dateStr });
                        }
                      }}
                      isRequired
                      classNames={{
                        base: "w-full",
                        label: "text-sm font-medium text-gray-700 mb-1",
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Select
                      label="Role *"
                      placeholder="Select a role"
                      labelPlacement="outside"
                      selectedKeys={formData.role ? [formData.role] : []}
                      onSelectionChange={(keys) => {
                        const selectedValue = Array.from(keys)[0] as string;
                        setFormData({ ...formData, role: selectedValue });
                      }}
                      isRequired
                      classNames={{
                        base: "w-full",
                        label: "text-sm font-medium text-gray-700 mb-1",
                      }}
                    >
                      {roles.map((role) => (
                        <SelectItem key={role.value} value={role.value}>
                          {role.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <Select
                      label="Department *"
                      placeholder="Select a department"
                      labelPlacement="outside"
                      selectedKeys={formData.department ? [formData.department] : []}
                      onSelectionChange={(keys) => {
                        const selectedValue = Array.from(keys)[0] as string;
                        setFormData({ ...formData, department: selectedValue });
                      }}
                      isRequired
                      classNames={{
                        base: "w-full",
                        label: "text-sm font-medium text-gray-700 mb-1",
                      }}
                    >
                      {departments.map((dept) => (
                        <SelectItem key={dept.value} value={dept.value}>
                          {dept.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Input
                      type="number"
                      label="Monthly Salary (₱) *"
                      placeholder="25000"
                      labelPlacement="outside"
                      value={formData.salary}
                      onChange={(e) =>
                        setFormData({ ...formData, salary: e.target.value })
                      }
                      isRequired
                      classNames={{
                        base: "w-full",
                        label: "text-sm font-medium text-gray-700 mb-1",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Address Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  Address Information
                </h3>
                <div>
                  <Input
                    type="text"
                    label="Street Address *"
                    placeholder="123 Main Street, Barangay Name"
                    labelPlacement="outside"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    isRequired
                    classNames={{
                      base: "w-full",
                      label: "text-sm font-medium text-gray-700 mb-1",
                    }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Input
                      type="text"
                      label="City *"
                      placeholder="Manila"
                      labelPlacement="outside"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      isRequired
                      classNames={{
                        base: "w-full",
                        label: "text-sm font-medium text-gray-700 mb-1",
                      }}
                    />
                  </div>
                  <div>
                    <Input
                      type="text"
                      label="Zip Code *"
                      placeholder="1000"
                      labelPlacement="outside"
                      value={formData.zipCode}
                      onChange={(e) =>
                        setFormData({ ...formData, zipCode: e.target.value })
                      }
                      isRequired
                      classNames={{
                        base: "w-full",
                        label: "text-sm font-medium text-gray-700 mb-1",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Emergency Contact Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  Emergency Contact
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Input
                      type="text"
                      label="Contact Name *"
                      placeholder="Full name"
                      labelPlacement="outside"
                      value={formData.emergencyContactName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          emergencyContactName: e.target.value,
                        })
                      }
                      isRequired
                      classNames={{
                        base: "w-full",
                        label: "text-sm font-medium text-gray-700 mb-1",
                      }}
                    />
                  </div>
                  <div>
                    <Input
                      type="tel"
                      label="Contact Phone *"
                      placeholder="+63 912 345 6789"
                      labelPlacement="outside"
                      value={formData.emergencyContactPhone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          emergencyContactPhone: e.target.value,
                        })
                      }
                      isRequired
                      classNames={{
                        base: "w-full",
                        label: "text-sm font-medium text-gray-700 mb-1",
                      }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Input
                      type="text"
                      label="Relationship *"
                      placeholder="e.g., Spouse, Parent, Sibling"
                      labelPlacement="outside"
                      value={formData.emergencyContactRelation}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          emergencyContactRelation: e.target.value,
                        })
                      }
                      isRequired
                      classNames={{
                        base: "w-full",
                        label: "text-sm font-medium text-gray-700 mb-1",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>

          {/* Footer - Sticky */}
          <div className="flex gap-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl flex-shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="flex-1 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium transition-colors shadow-md hover:shadow-lg"
            >
              Create Employee
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateEmployeeModal;
