'use client';

import { useState, useEffect } from 'react';
import { addressesService } from '@/lib/services/addresses.service';
import type { Address, AddressType, CreateAddressRequest } from '@/lib/types/address.types';
import toast from 'react-hot-toast';

interface AddressModalProps {
  address?: Address | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddressModal({ address, onClose, onSuccess }: AddressModalProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState<CreateAddressRequest>({
    addressType: 'HOME' as AddressType,
    fullName: '',
    phoneNumber: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
  });

  useEffect(() => {
    if (address) {
      setFormData({
        addressType: address.addressType,
        fullName: address.fullName,
        phoneNumber: address.phoneNumber,
        addressLine1: address.addressLine1,
        addressLine2: address.addressLine2 || '',
        city: address.city,
        state: address.state,
        postalCode: address.postalCode,
        country: address.country,
      });
    }
  }, [address]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.fullName?.trim()) {
      toast.error('Full name is required');
      return;
    }
    if (!formData.phoneNumber?.trim()) {
      toast.error('Phone number is required');
      return;
    }
    if (!formData.addressLine1?.trim()) {
      toast.error('Address line 1 is required');
      return;
    }
    if (!formData.city?.trim()) {
      toast.error('City is required');
      return;
    }
    if (!formData.state?.trim()) {
      toast.error('State is required');
      return;
    }
    if (!formData.postalCode?.trim()) {
      toast.error('Postal code is required');
      return;
    }

    setIsSaving(true);

    try {
      const payload: CreateAddressRequest = {
        ...formData,
        fullName: formData.fullName.trim(),
        phoneNumber: formData.phoneNumber.trim(),
        addressLine1: formData.addressLine1.trim(),
        addressLine2: formData.addressLine2?.trim() || undefined,
        city: formData.city.trim(),
        state: formData.state.trim(),
        postalCode: formData.postalCode.trim(),
      };

      if (address) {
        // Update existing address
        await addressesService.update(address.id, payload);
        toast.success('Address updated successfully');
      } else {
        // Create new address
        await addressesService.create(payload);
        toast.success('Address added successfully');
      }

      onSuccess();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : 'Failed to save address'
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (!isSaving) {
      onClose();
    }
  };

  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 md:px-8 py-4 md:py-5 flex items-center justify-between rounded-t-2xl md:rounded-t-3xl">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900">
            {address ? 'Edit Address' : 'New Address'}
          </h2>
          <button
            onClick={handleCancel}
            disabled={isSaving}
            className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
            type="button"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 md:px-8 py-6 md:py-8">
          <div className="space-y-5 md:space-y-6">
            {/* Address Type */}
            <div>
              <label
                htmlFor="addressType"
                className="block text-xs md:text-sm font-medium text-gray-700 mb-2"
              >
                Address Type
              </label>
              <div className="flex gap-3">
                {(['HOME', 'WORK', 'OTHER'] as AddressType[]).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, addressType: type }))}
                    className={`flex-1 rounded-lg md:rounded-xl border-2 px-4 py-2.5 md:py-3 text-xs md:text-sm font-semibold transition-all ${
                      formData.addressType === type
                        ? 'border-[#D4A574] bg-[#D4A574] text-white'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-[#D4A574]'
                    }`}
                  >
                    {type === 'HOME' ? 'Home' : type === 'WORK' ? 'Work' : 'Other'}
                  </button>
                ))}
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-xs md:text-sm font-medium text-gray-700 mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full rounded-xl md:rounded-2xl border border-gray-300 bg-white px-4 md:px-5 py-3 md:py-3.5 text-sm md:text-base text-gray-900 placeholder-gray-400 focus:border-[#6B8E23] focus:outline-none focus:ring-2 focus:ring-[#6B8E23]/20 transition-all"
                placeholder="Enter full name"
                required
              />
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-xs md:text-sm font-medium text-gray-700 mb-2"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full rounded-xl md:rounded-2xl border border-gray-300 bg-white px-4 md:px-5 py-3 md:py-3.5 text-sm md:text-base text-gray-900 placeholder-gray-400 focus:border-[#6B8E23] focus:outline-none focus:ring-2 focus:ring-[#6B8E23]/20 transition-all"
                placeholder="+91 98765 43210"
                required
              />
            </div>

            {/* Address Line 1 */}
            <div>
              <label
                htmlFor="addressLine1"
                className="block text-xs md:text-sm font-medium text-gray-700 mb-2"
              >
                Address Line 1
              </label>
              <input
                type="text"
                id="addressLine1"
                name="addressLine1"
                value={formData.addressLine1}
                onChange={handleChange}
                className="w-full rounded-xl md:rounded-2xl border border-gray-300 bg-white px-4 md:px-5 py-3 md:py-3.5 text-sm md:text-base text-gray-900 placeholder-gray-400 focus:border-[#6B8E23] focus:outline-none focus:ring-2 focus:ring-[#6B8E23]/20 transition-all"
                placeholder="House No., Building Name"
                required
              />
            </div>

            {/* Address Line 2 (Optional) */}
            <div>
              <label
                htmlFor="addressLine2"
                className="block text-xs md:text-sm font-medium text-gray-700 mb-2"
              >
                Address Line 2 (Optional)
              </label>
              <input
                type="text"
                id="addressLine2"
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleChange}
                className="w-full rounded-xl md:rounded-2xl border border-gray-300 bg-white px-4 md:px-5 py-3 md:py-3.5 text-sm md:text-base text-gray-900 placeholder-gray-400 focus:border-[#6B8E23] focus:outline-none focus:ring-2 focus:ring-[#6B8E23]/20 transition-all"
                placeholder="Road name, Area, Colony"
              />
            </div>

            {/* City and State */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="city"
                  className="block text-xs md:text-sm font-medium text-gray-700 mb-2"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full rounded-xl md:rounded-2xl border border-gray-300 bg-white px-4 md:px-5 py-3 md:py-3.5 text-sm md:text-base text-gray-900 placeholder-gray-400 focus:border-[#6B8E23] focus:outline-none focus:ring-2 focus:ring-[#6B8E23]/20 transition-all"
                  placeholder="City"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="state"
                  className="block text-xs md:text-sm font-medium text-gray-700 mb-2"
                >
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full rounded-xl md:rounded-2xl border border-gray-300 bg-white px-4 md:px-5 py-3 md:py-3.5 text-sm md:text-base text-gray-900 placeholder-gray-400 focus:border-[#6B8E23] focus:outline-none focus:ring-2 focus:ring-[#6B8E23]/20 transition-all"
                  placeholder="State"
                  required
                />
              </div>
            </div>

            {/* Postal Code */}
            <div>
              <label
                htmlFor="postalCode"
                className="block text-xs md:text-sm font-medium text-gray-700 mb-2"
              >
                Pincode
              </label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                className="w-full rounded-xl md:rounded-2xl border border-gray-300 bg-white px-4 md:px-5 py-3 md:py-3.5 text-sm md:text-base text-gray-900 placeholder-gray-400 focus:border-[#6B8E23] focus:outline-none focus:ring-2 focus:ring-[#6B8E23]/20 transition-all"
                placeholder="123456"
                required
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 md:mt-8 space-y-3 md:space-y-4">
            <button
              type="submit"
              disabled={isSaving}
              className="w-full rounded-xl md:rounded-2xl bg-[#6B8E23] hover:bg-[#556B1A] disabled:bg-[#6B8E23]/60 disabled:cursor-not-allowed px-6 py-3.5 md:py-4 text-sm md:text-base font-semibold text-white transition-all shadow-sm hover:shadow-md"
            >
              {isSaving ? 'Saving address...' : 'Save address'}
            </button>

            <button
              type="button"
              onClick={handleCancel}
              disabled={isSaving}
              className="w-full rounded-xl md:rounded-2xl border-2 border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3.5 md:py-4 text-sm md:text-base font-semibold text-gray-700 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
