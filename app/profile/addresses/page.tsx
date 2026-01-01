'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { addressesService } from '@/lib/services/addresses.service';
import type { Address, AddressType } from '@/lib/types/address.types';
import toast from 'react-hot-toast';
import AddressModal from './address-modal';

export default function AddressesPage() {
  const router = useRouter();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const data = await addressesService.getAll();
      setAddresses(data);
    } catch (err) {
      toast.error('Failed to load addresses');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNew = () => {
    setEditingAddress(null);
    setIsModalOpen(true);
  };

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setIsModalOpen(true);
  };

  const handleSetDefault = async (id: string) => {
    try {
      await addressesService.setAsDefault(id);
      toast.success('Default address updated');
      await fetchAddresses();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to set default address');
    }
  };

  const handleDelete = async (id: string) => {
    if (deletingId) return; // Prevent multiple clicks

    const confirmed = window.confirm(
      'Are you sure you want to delete this address?'
    );

    if (!confirmed) return;

    setDeletingId(id);
    try {
      await addressesService.delete(id);
      toast.success('Address deleted successfully');
      await fetchAddresses();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to delete address');
    } finally {
      setDeletingId(null);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingAddress(null);
  };

  const handleModalSuccess = async () => {
    setIsModalOpen(false);
    setEditingAddress(null);
    await fetchAddresses();
  };

  const getAddressTypeLabel = (type: AddressType): string => {
    switch (type) {
      case 'HOME':
        return 'Home';
      case 'WORK':
        return 'Work';
      default:
        return 'Other';
    }
  };

  const getAddressTypeBadgeColor = (type: AddressType): string => {
    switch (type) {
      case 'HOME':
        return 'bg-[#D4A574] text-white';
      case 'WORK':
        return 'bg-[#8B7355] text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center ">
        <div className="text-base md:text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  px-4 py-6 md:px-6 md:py-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <button
            onClick={() => router.push('/profile')}
            className="flex items-center text-gray-700 hover:text-gray-900 transition-colors mb-4 md:mb-6"
            type="button"
          >
            <svg
              className="mr-2 h-5 w-5 md:h-6 md:w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="text-sm md:text-base font-medium">Your Addresses</span>
          </button>
        </div>

        {/* Add New Address Button */}
        <button
          onClick={handleAddNew}
          className="w-full mb-6 md:mb-8 rounded-xl md:rounded-2xl bg-[#D4A574] hover:bg-[#C4956A] transition-all px-6 py-4 md:py-5 flex items-center justify-center text-sm md:text-base font-semibold text-white shadow-sm hover:shadow-md"
        >
          <svg
            className="w-5 h-5 md:w-6 md:h-6 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add New Address
        </button>

        {/* Address Cards */}
        <div className="space-y-4 md:space-y-6">
          {addresses.length === 0 ? (
            <div className="rounded-2xl md:rounded-3xl bg-white shadow-sm p-8 md:p-12 text-center">
              <svg
                className="mx-auto h-16 w-16 md:h-20 md:w-20 text-gray-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                No addresses yet
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                Add your first delivery address to get started
              </p>
            </div>
          ) : (
            addresses.map((address) => (
              <div
                key={address.id}
                className="rounded-2xl md:rounded-3xl bg-white shadow-sm p-5 md:p-7 relative"
              >
                {/* Badge */}
                <div className="mb-4">
                  <span
                    className={`inline-block px-3 md:px-4 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-medium ${getAddressTypeBadgeColor(
                      address.addressType
                    )}`}
                  >
                    {getAddressTypeLabel(address.addressType)}
                  </span>
                </div>

                {/* Address Content */}
                <div className="mb-4 md:mb-5">
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1 md:mb-2">
                    {address.fullName}
                  </h3>
                  <p className="text-sm md:text-base text-gray-700 mb-1">
                    {address.phoneNumber}
                  </p>
                  <p className="text-sm md:text-base text-gray-700 mb-1">
                    {address.addressLine1}
                  </p>
                  {address.addressLine2 && (
                    <p className="text-sm md:text-base text-gray-700 mb-1">
                      {address.addressLine2}
                    </p>
                  )}
                  <p className="text-sm md:text-base text-gray-700">
                    {address.city}, {address.state} - {address.postalCode}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                  {!address.isDefault && (
                    <button
                      onClick={() => handleSetDefault(address.id)}
                      className="flex-1 rounded-lg md:rounded-xl border-2 border-gray-300 bg-white hover:bg-gray-50 transition-all px-4 py-2.5 md:py-3 text-xs md:text-sm font-semibold text-gray-700"
                    >
                      Set as Default
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(address.id)}
                    disabled={deletingId === address.id}
                    className="flex-1 rounded-lg md:rounded-xl border-2 border-red-300 bg-white hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all px-4 py-2.5 md:py-3 text-xs md:text-sm font-semibold text-red-600"
                  >
                    {deletingId === address.id ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Address Modal */}
      {isModalOpen && (
        <AddressModal
          address={editingAddress}
          onClose={handleModalClose}
          onSuccess={handleModalSuccess}
        />
      )}
    </div>
  );
}
