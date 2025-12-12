"use client";

import { X, Upload, Trash2, Calendar, Clock, Plus } from "lucide-react";
import { useState } from "react";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { Textarea } from "@nextui-org/input";
import { Checkbox } from "@nextui-org/checkbox";

interface AddNewHavenModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface BlockedDate {
  id: number;
  fromDate: string;
  toDate: string;
  reason: string;
}

const AddNewHavenModal = ({ isOpen, onClose }: AddNewHavenModalProps) => {
  const [formData, setFormData] = useState({
    havenName: "",
    tower: "",
    floor: "",
    view: "",
    sixHourRate: "",
    tenHourRate: "",
    weekdayRate: "",
    weekendRate: "",
    sixHourCheckIn: "09:00",
    tenHourCheckIn: "09:00",
    twentyOneHourCheckIn: "14:00",
    description: "",
    youtubeUrl: "",
    amenities: {
      wifi: false,
      netflix: false,
      ps4: false,
      glowBed: false,
      airConditioning: false,
      kitchen: false,
      balcony: false,
      tv: false,
      poolAccess: false,
      parking: false,
      washerDryer: false,
      towels: false,
    },
  });

  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([]);
  const [blockDateForm, setBlockDateForm] = useState({
    fromDate: "",
    toDate: "",
    reason: "",
  });

  const [havenImages, setHavenImages] = useState<File[]>([]);

  const towers = [
    { value: "tower-a", label: "Tower A" },
    { value: "tower-b", label: "Tower B" },
    { value: "tower-c", label: "Tower C" },
    { value: "tower-d", label: "Tower D" },
  ];

  const views = [
    { value: "city", label: "City View" },
    { value: "pool", label: "Pool View" },
    { value: "ocean", label: "Ocean View" },
    { value: "garden", label: "Garden View" },
    { value: "mountain", label: "Mountain View" },
  ];

  const amenitiesList = [
    { key: "wifi", label: "WiFi" },
    { key: "netflix", label: "Netflix" },
    { key: "ps4", label: "PS4" },
    { key: "glowBed", label: "Glow Bed" },
    { key: "airConditioning", label: "Air Conditioning" },
    { key: "kitchen", label: "Kitchen" },
    { key: "balcony", label: "Balcony" },
    { key: "tv", label: "TV" },
    { key: "poolAccess", label: "Pool Access" },
    { key: "parking", label: "Parking" },
    { key: "washerDryer", label: "Washer/Dryer" },
    { key: "towels", label: "Towels" },
  ];

  const photoTourCategories = [
    { key: "livingArea", label: "Living Area" },
    { key: "kitchenette", label: "Kitchenette" },
    { key: "diningArea", label: "Dining Area" },
    { key: "fullBathroom", label: "Full Bathroom" },
    { key: "garage", label: "Garage" },
    { key: "exterior", label: "Exterior" },
    { key: "pool", label: "Pool" },
    { key: "bedroom", label: "Bedroom" },
    { key: "additional", label: "Additional Photos" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data:", formData);
    console.log("Blocked dates:", blockedDates);
    console.log("Haven images:", havenImages);
    onClose();
  };

  const handleAmenityChange = (key: string, checked: boolean) => {
    setFormData({
      ...formData,
      amenities: {
        ...formData.amenities,
        [key]: checked,
      },
    });
  };

  const handleAddBlockedDate = () => {
    if (blockDateForm.fromDate && blockDateForm.toDate) {
      setBlockedDates([
        ...blockedDates,
        {
          id: Date.now(),
          ...blockDateForm,
        },
      ]);
      setBlockDateForm({ fromDate: "", toDate: "", reason: "" });
    }
  };

  const handleRemoveBlockedDate = (id: number) => {
    setBlockedDates(blockedDates.filter((date) => date.id !== id));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setHavenImages([...havenImages, ...filesArray]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setHavenImages(havenImages.filter((_, i) => i !== index));
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose}></div>
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] shadow-2xl flex flex-col">
          {/* Header - Sticky */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-purple-100 rounded-t-2xl flex-shrink-0">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Add New Haven
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Fill in the haven details below
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
              {/* Basic Information Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  Basic Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Input
                      type="text"
                      label="Haven Name *"
                      placeholder="e.g., Haven 1"
                      labelPlacement="outside"
                      value={formData.havenName}
                      onChange={(e) =>
                        setFormData({ ...formData, havenName: e.target.value })
                      }
                      isRequired
                      classNames={{
                        base: "w-full",
                        label: "text-sm font-medium text-gray-700 mb-1",
                      }}
                    />
                  </div>
                  <div>
                    <Select
                      label="Tower *"
                      placeholder="Select Tower"
                      labelPlacement="outside"
                      selectedKeys={formData.tower ? [formData.tower] : []}
                      onSelectionChange={(keys) => {
                        const selectedValue = Array.from(keys)[0] as string;
                        setFormData({ ...formData, tower: selectedValue });
                      }}
                      isRequired
                      classNames={{
                        base: "w-full",
                        label: "text-sm font-medium text-gray-700 mb-1",
                      }}
                    >
                      {towers.map((tower) => (
                        <SelectItem key={tower.value} value={tower.value}>
                          {tower.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Input
                      type="text"
                      label="Floor *"
                      placeholder="e.g., 1"
                      labelPlacement="outside"
                      value={formData.floor}
                      onChange={(e) =>
                        setFormData({ ...formData, floor: e.target.value })
                      }
                      isRequired
                      classNames={{
                        base: "w-full",
                        label: "text-sm font-medium text-gray-700 mb-1",
                      }}
                    />
                  </div>
                  <div>
                    <Select
                      label="View Type *"
                      placeholder="Select View"
                      labelPlacement="outside"
                      selectedKeys={formData.view ? [formData.view] : []}
                      onSelectionChange={(keys) => {
                        const selectedValue = Array.from(keys)[0] as string;
                        setFormData({ ...formData, view: selectedValue });
                      }}
                      isRequired
                      classNames={{
                        base: "w-full",
                        label: "text-sm font-medium text-gray-700 mb-1",
                      }}
                    >
                      {views.map((view) => (
                        <SelectItem key={view.value} value={view.value}>
                          {view.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                </div>
              </div>

              {/* Pricing Management Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  Pricing Management
                </h3>

                <p className="text-sm font-semibold text-gray-700">Weekday Rates</p>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Input
                      type="number"
                      label="6-Hour Rate"
                      placeholder="1299.00"
                      labelPlacement="outside"
                      startContent={<span className="text-gray-500">₱</span>}
                      value={formData.sixHourRate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          sixHourRate: e.target.value,
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
                      type="number"
                      label="10-Hour Rate"
                      placeholder="1599.00"
                      labelPlacement="outside"
                      startContent={<span className="text-gray-500">₱</span>}
                      value={formData.tenHourRate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          tenHourRate: e.target.value,
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
                      type="number"
                      label="21-Hour Rate"
                      placeholder="1799.00"
                      labelPlacement="outside"
                      startContent={<span className="text-gray-500">₱</span>}
                      value={formData.weekdayRate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          weekdayRate: e.target.value,
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

                <p className="text-sm font-semibold text-gray-700 mt-4">Weekend Rates</p>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Input
                      type="number"
                      label="21-Hour Weekend Rate"
                      placeholder="1999.00"
                      labelPlacement="outside"
                      startContent={<span className="text-gray-500">₱</span>}
                      value={formData.weekendRate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          weekendRate: e.target.value,
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

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <p className="text-sm text-blue-800 font-medium mb-2">Pricing Notes</p>
                  <ul className="text-xs text-blue-700 space-y-1 list-disc list-inside">
                    <li>6h & 10h rates: Weekdays only</li>
                    <li>21h rate: Available weekdays</li>
                    <li>Weekend rate: Fri-Sun 21h bookings</li>
                  </ul>
                </div>
              </div>

              {/* Check-in Time Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  Check-in Time Settings
                </h3>
                <p className="text-sm text-gray-600">Set default check-in times for each booking duration</p>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Input
                      type="time"
                      label="6-Hour Check-in Time"
                      labelPlacement="outside"
                      value={formData.sixHourCheckIn}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          sixHourCheckIn: e.target.value,
                        })
                      }
                      classNames={{
                        base: "w-full",
                        label: "text-sm font-medium text-gray-700 mb-1",
                      }}
                    />
                  </div>
                  <div>
                    <Input
                      type="time"
                      label="10-Hour Check-in Time"
                      labelPlacement="outside"
                      value={formData.tenHourCheckIn}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          tenHourCheckIn: e.target.value,
                        })
                      }
                      classNames={{
                        base: "w-full",
                        label: "text-sm font-medium text-gray-700 mb-1",
                      }}
                    />
                  </div>
                  <div>
                    <Input
                      type="time"
                      label="21-Hour Check-in Time"
                      labelPlacement="outside"
                      value={formData.twentyOneHourCheckIn}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          twentyOneHourCheckIn: e.target.value,
                        })
                      }
                      classNames={{
                        base: "w-full",
                        label: "text-sm font-medium text-gray-700 mb-1",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Availability Management - Block Dates */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  Availability Management
                </h3>
                <p className="text-sm font-semibold text-gray-700">Block Dates</p>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Input
                      type="date"
                      label="From Date"
                      labelPlacement="outside"
                      value={blockDateForm.fromDate}
                      onChange={(e) =>
                        setBlockDateForm({
                          ...blockDateForm,
                          fromDate: e.target.value,
                        })
                      }
                      classNames={{
                        base: "w-full",
                        label: "text-sm font-medium text-gray-700 mb-1",
                      }}
                    />
                  </div>
                  <div>
                    <Input
                      type="date"
                      label="To Date"
                      labelPlacement="outside"
                      value={blockDateForm.toDate}
                      onChange={(e) =>
                        setBlockDateForm({
                          ...blockDateForm,
                          toDate: e.target.value,
                        })
                      }
                      classNames={{
                        base: "w-full",
                        label: "text-sm font-medium text-gray-700 mb-1",
                      }}
                    />
                  </div>
                  <div>
                    <Input
                      type="text"
                      label="Reason (Optional)"
                      placeholder="e.g., Maintenance, Renovation, etc."
                      labelPlacement="outside"
                      value={blockDateForm.reason}
                      onChange={(e) =>
                        setBlockDateForm({
                          ...blockDateForm,
                          reason: e.target.value,
                        })
                      }
                      classNames={{
                        base: "w-full",
                        label: "text-sm font-medium text-gray-700 mb-1",
                      }}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAddBlockedDate}
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
                >
                  Block Dates
                </button>

                <p className="text-xs text-gray-500">Blocked dates will not be available for booking</p>

                {/* Blocked Date Ranges List */}
                <div className="mt-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Blocked Date Ranges</p>
                  {blockedDates.length === 0 ? (
                    <p className="text-sm text-gray-500 italic">No blocked dates yet</p>
                  ) : (
                    <div className="space-y-2">
                      {blockedDates.map((date) => (
                        <div
                          key={date.id}
                          className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg"
                        >
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-500" />
                            <div>
                              <p className="text-sm font-medium text-gray-800">
                                {date.fromDate} to {date.toDate}
                              </p>
                              {date.reason && (
                                <p className="text-xs text-gray-500">{date.reason}</p>
                              )}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveBlockedDate(date.id)}
                            className="p-1 text-red-500 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Haven Images */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  Haven Images
                </h3>

                <div>
                  <label className="block">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="haven-images"
                    />
                    <label
                      htmlFor="haven-images"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium cursor-pointer transition-colors"
                    >
                      <Upload className="w-4 h-4" />
                      Add Image
                    </label>
                  </label>
                </div>

                {havenImages.length > 0 && (
                  <div className="grid grid-cols-4 gap-4">
                    {havenImages.map((file, index) => (
                      <div
                        key={index}
                        className="relative group border border-gray-200 rounded-lg overflow-hidden"
                      >
                        <div className="aspect-video bg-gray-100 flex items-center justify-center">
                          <p className="text-xs text-gray-500 p-2 text-center truncate">
                            {file.name}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-2 right-2 p-1 bg-red-500 hover:bg-red-600 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Photo Tour Management */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  Photo Tour Management
                </h3>
                <p className="text-sm text-gray-600">
                  Upload photos for each category to create a comprehensive photo tour. Images will be displayed in the photo gallery page.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {photoTourCategories.map((category) => (
                    <div
                      key={category.key}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <p className="text-sm font-semibold text-gray-800 mb-2">
                        {category.label}
                      </p>
                      <label className="block">
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          className="hidden"
                          id={`photo-tour-${category.key}`}
                        />
                        <label
                          htmlFor={`photo-tour-${category.key}`}
                          className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium cursor-pointer transition-colors"
                        >
                          <Upload className="w-4 h-4" />
                          Upload
                        </label>
                      </label>
                      <p className="text-xs text-gray-500 mt-2 italic">No photos yet</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* YouTube Video */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  YouTube Video
                </h3>
                <div>
                  <Input
                    type="url"
                    label="YouTube Video URL (optional)"
                    placeholder="https://www.youtube.com/watch?v=..."
                    labelPlacement="outside"
                    description="Paste a YouTube video link to showcase this haven"
                    value={formData.youtubeUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, youtubeUrl: e.target.value })
                    }
                    classNames={{
                      base: "w-full",
                      label: "text-sm font-medium text-gray-700 mb-1",
                    }}
                  />
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
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 font-medium transition-colors shadow-md hover:shadow-lg"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNewHavenModal;
